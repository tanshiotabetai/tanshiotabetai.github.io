<template>
  <section id="works">
    <div class="container">
      <h2 class="section-title">Works</h2>
      <div class="works-grid">
        <article class="work-card" v-for="work in works" :key="work.title">
          <div class="work-thumb" :style="{ background: work.color }">
            <span class="work-icon">{{ work.icon }}</span>
          </div>
          <div class="work-body">
            <h3 class="work-title">{{ work.title }}</h3>
            <p class="work-desc">{{ work.desc }}</p>
            <div class="work-tags">
              <span class="tag" v-for="t in work.tags" :key="t">{{ t }}</span>
            </div>
            <div class="work-links">
              <a v-if="work.demo" :href="work.demo" target="_blank" rel="noopener">Demo →</a>
              <a v-if="work.github" :href="work.github" target="_blank" rel="noopener">GitHub →</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const works = [
  {
    icon: '🛒',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    title: 'ECサイトUI',
    desc: 'Vue 3 + Pinia で作った架空のショッピングサイト。カート機能・フィルター検索を実装。',
    tags: ['Vue 3', 'Pinia', 'TypeScript'],
    demo: '#',
    github: '#',
  },
  {
    icon: '📝',
    color: 'linear-gradient(135deg, #10b981, #3b82f6)',
    title: 'Markdown メモアプリ',
    desc: 'リアルタイムプレビュー付きのメモアプリ。LocalStorage でデータを永続化。',
    tags: ['React', 'Marked.js'],
    demo: '#',
    github: '#',
  },
  {
    icon: '🌤',
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    title: '天気ダッシュボード',
    desc: 'OpenWeatherMap API を使った天気アプリ。グラフ表示・複数都市対応。',
    tags: ['Vue 3', 'Chart.js', 'API'],
    demo: '#',
    github: '#',
  },
]
</script>

<style scoped>
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.work-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
}

.work-thumb {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-icon {
  font-size: 3rem;
}

.work-body {
  padding: 20px;
}

.work-title {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.work-desc {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 12px;
  line-height: 1.6;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 99px;
  background: rgba(56,189,248,0.12);
  color: var(--color-primary);
  border: 1px solid rgba(56,189,248,0.25);
}

.work-links {
  display: flex;
  gap: 16px;
  font-size: 0.875rem;
}
</style>
