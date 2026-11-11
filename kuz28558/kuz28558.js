/*
 * KUZ-28558 F2 再現テスト用 共通スクリプト
 * - ?env=prod | stg で環境を切り替え（省略時 prod）
 * - KUZEN タグ v2 を &debug=1 付きで読み込む
 * - 画面下部に「cookie / localStorage / 送信リクエスト / console」を表示する
 */

// ===== ここだけ書き換える =====================================
var KUZ28558_CONFIG = {
  prod: {
    tagHost: 'https://tag-v2.kuzen.io',
    formTag: 'KT_AKWECRxQCFc5Kg==248',     // 「登録F遷移」相当のタグ（visit_or_leave_page / friend_only）
    doneTag: 'KT_C+mlnIPa721U+A==248',     // 「登録F完了ページ」相当のタグ（同設定）
    dashboard: 'https://dashboard.kuzen.io/services/109244'
  },
  stg: {
    tagHost: 'https://stg-tag-v2.kuzen.io',
    formTag: 'KT_REPLACE_ME_FORM',
    doneTag: 'KT_REPLACE_ME_DONE',
    dashboard: 'https://stg-dashboard.kuzen.io/services/REPLACE_ME'
  }
};
// ==============================================================

// ---- github.io 対策 ----
// タグは cookie を domain=<末尾2ラベル> で保存する（このサイトでは domain=github.io）。
// github.io は Public Suffix のためブラウザが cookie を拒否し、ページ間で LINE ID が引き継がれない。
// 実際のお客様ドメイン（例: xxx.co.jp）と同じ挙動にするため、domain 属性を外して host-only cookie として保存させる。
(function () {
  var desc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
  if (!desc || !/\.github\.io$/.test(location.hostname)) return;
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get: function () { return desc.get.call(document); },
    set: function (v) { desc.set.call(document, String(v).replace(/;\s*domain=[^;]*/i, '')); }
  });
})();

(function () {
  var params = new URLSearchParams(location.search);
  var env = params.get('env') === 'stg' ? 'stg' : 'prod';
  var cfg = KUZ28558_CONFIG[env];
  window.KUZ28558 = { env: env, cfg: cfg };

  // ---- console をパネルにも出す（LINE アプリ内ブラウザ等 DevTools が無い環境用）----
  var logs = [];
  ['log', 'info', 'debug', 'warn', 'error'].forEach(function (lv) {
    var orig = console[lv];
    console[lv] = function () {
      try {
        var text = Array.prototype.map.call(arguments, function (a) {
          if (typeof a === 'string') return a;
          try { return JSON.stringify(a); } catch (e) { return String(a); }
        }).join(' ');
        logs.push('[' + lv + '] ' + text);
        if (logs.length > 200) logs.shift();
      } catch (e) {}
      return orig.apply(console, arguments);
    };
  });

  // ---- 送信リクエストを記録（PerformanceObserver）----
  var reqs = [];
  try {
    new PerformanceObserver(function (list) {
      list.getEntries().forEach(function (e) {
        if (/kuzen/.test(e.name)) {
          reqs.push(new Date(performance.timeOrigin + e.startTime).toLocaleTimeString() +
            '  [' + e.initiatorType + ']  ' + e.name.split('?')[0]);
        }
      });
    }).observe({ type: 'resource', buffered: true });
  } catch (e) {}

  // ---- タグ読み込み ----
  window.KUZ28558.loadTag = function (trackingCode) {
    window.kuzenTagAsyncInit = function () {
      window.kuzen_tag.add_query_parameter_url([]);
    };
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = cfg.tagHost + '?tracking_code=' + encodeURIComponent(trackingCode) + '&line=1&debug=1';
    document.head.appendChild(s);
    window.KUZ28558.trackingCode = trackingCode;
  };

  // ---- 他ページへのリンク（env を引き継ぐ）----
  window.KUZ28558.link = function (page, extra) {
    var q = new URLSearchParams({ env: env });
    if (extra) Object.keys(extra).forEach(function (k) { q.set(k, extra[k]); });
    return page + '?' + q.toString();
  };

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[-.]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function kuzenStorage() {
    var out = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (/^kuzen/.test(k)) out[k] = localStorage.getItem(k);
    }
    return out;
  }

  // 完了ページ用タグの localStorage から lineId を取り出す
  function storedLineId(code) {
    var raw = localStorage.getItem('kuzen-tag-user-' + code);
    if (raw === null) return { found: false };
    try {
      var obj = JSON.parse(raw);
      var v = findKey(obj, 'lineId');
      return { found: true, value: v };
    } catch (e) { return { found: true, value: undefined }; }
  }
  function findKey(obj, key) {
    if (!obj || typeof obj !== 'object') return undefined;
    if (Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
    for (var k in obj) { var r = findKey(obj[k], key); if (r !== undefined) return r; }
    return undefined;
  }

  // ---- リセット（このオリジンの kuzen 系 cookie / localStorage を全削除）----
  window.KUZ28558.reset = function () {
    Object.keys(kuzenStorage()).forEach(function (k) { localStorage.removeItem(k); });
    document.cookie.split('; ').forEach(function (c) {
      var name = c.split('=')[0];
      if (/^kuzen/.test(name)) {
        ['/', location.pathname.replace(/[^/]*$/, '')].forEach(function (p) {
          document.cookie = name + '=; max-age=0; path=' + p;
          document.cookie = name + '=; max-age=0; path=' + p + '; domain=' + location.hostname;
        });
      }
    });
    alert('kuzen 系の cookie / localStorage を削除しました。');
    location.reload();
  };

  // ---- パネル描画 ----
  function render() {
    var el = document.getElementById('kuz-panel');
    if (!el) return;
    var code = window.KUZ28558.trackingCode;
    var cookieLine = getCookie('kuzen-tag-line-id');
    var st = code ? storedLineId(code) : { found: false };
    var actionsSent = reqs.some(function (r) { return /\/api\/v1\/actions/.test(r); });

    var stText = !st.found ? '(キー無し)' :
      st.value === '' ? '"" ← 空文字（F2 の条件）' :
      st.value === undefined ? '(lineId 項目なし)' : JSON.stringify(st.value);

    var verdict = '';
    if (document.body.dataset.page === 'complete') {
      verdict = actionsSent
        ? '<b class="ok">✅ /api/v1/actions 送信あり（正常）</b>'
        : '<b class="ng">⏳ /api/v1/actions 未送信（数秒待っても出なければ ❌ F2 再現）</b>';
    }

    el.innerHTML =
      '<h3>Debug panel <small>(env: ' + env + ' / 1秒ごと更新)</small></h3>' +
      (verdict ? '<p>' + verdict + '</p>' : '') +
      '<table>' +
      '<tr><th>このページのタグ</th><td><code>' + (code || '-') + '</code></td></tr>' +
      '<tr><th>cookie kuzen-tag-line-id</th><td><code>' + (cookieLine === null ? '(なし)' : cookieLine === '' ? '"" (空)' : cookieLine) + '</code></td></tr>' +
      '<tr><th>localStorage kuzen-tag-user-&lt;このタグ&gt; の lineId</th><td><code>' + escapeHtml(stText) + '</code></td></tr>' +
      '</table>' +
      '<details><summary>kuzen 系 localStorage 全件</summary><pre>' + escapeHtml(JSON.stringify(kuzenStorage(), null, 2)) + '</pre></details>' +
      '<details open><summary>kuzen への通信（' + reqs.length + '件）</summary><pre>' + escapeHtml(reqs.join('\n') || '(なし)') + '</pre></details>' +
      '<details><summary>console（' + logs.length + '件）</summary><pre>' + escapeHtml(logs.join('\n') || '(なし)') + '</pre></details>';
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  setInterval(render, 1000);
  document.addEventListener('DOMContentLoaded', render);
})();
