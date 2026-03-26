<template>
  <section id="about">
    <div class="container">
      <h2 class="section-title">About</h2>
      <div class="about-grid">
        <div class="about-text">
          <p>
            はじめまして！Web フロントエンドの開発が好きなエンジニアです。
            ユーザー体験を大切にした UI 設計と、読みやすくメンテナブルなコードを心がけています。
          </p>
          <p>
            趣味はカメラと読書、週末は散歩しながら写真を撮っています。
            新しい技術を試すことも好きで、このページも Vue.js + Vite で作りました。
          </p>
        </div>
        <div class="about-cards">
          <div class="info-card" v-for="item in items" :key="item.label">
            <span class="card-icon">{{ item.icon }}</span>
            <div>
              <p class="card-label">{{ item.label }}</p>
              <p class="card-value">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { icon: '📍', label: '居住地', value: '東京都' },
  { icon: '🎓', label: '学歴', value: '〇〇大学 情報学部' },
  { icon: '💼', label: '職種', value: 'フロントエンドエンジニア' },
  { icon: '📅', label: '経験年数', value: '3年' },
]
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.about-text p {
  color: var(--color-muted);
  margin-bottom: 16px;
  font-size: 1rem;
}

.about-cards {
  display: grid;
  gap: 12px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 20px;
}

.card-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 2px;
}

.card-value {
  font-size: 0.9375rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
