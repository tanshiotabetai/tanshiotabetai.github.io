<template>
  <section class="hero" id="hero">
    <div class="container hero-inner">
      <div class="avatar">
        <span>YN</span>
      </div>
      <p class="greeting">こんにちは、</p>
      <h1 class="name">Your <span class="highlight">Name</span> です。</h1>
      <p class="tagline">フロントエンドエンジニア / UI デザイン好き</p>
      <div class="cta-buttons">
        <a href="#works" class="btn btn-primary" @click.prevent="scrollTo('works')">Works を見る</a>
        <a href="#contact" class="btn btn-outline" @click.prevent="scrollTo('contact')">Contact</a>
      </div>
    </div>
  </section>
</template>

<script setup>
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(129,140,248,0.08) 0%, transparent 50%);
}

.hero-inner {
  text-align: center;
  padding-top: 80px;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0 auto 24px;
}

.greeting {
  color: var(--color-muted);
  font-size: 1.125rem;
  margin-bottom: 8px;
}

.name {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
}

.highlight {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 1.125rem;
  color: var(--color-muted);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: transform 0.15s, opacity 0.15s;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
  text-decoration: none;
  opacity: 0.9;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #fff;
}

.btn-outline {
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
}
</style>
