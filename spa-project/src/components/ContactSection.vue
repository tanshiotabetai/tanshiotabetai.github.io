<template>
  <section id="contact" class="contact-section">
    <div class="container contact-inner">
      <h2 class="section-title">Contact</h2>
      <p class="contact-lead">お仕事やコラボのご相談など、お気軽にどうぞ。</p>
      <div class="contact-links">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="contact-card"
        >
          <span class="contact-icon">{{ link.icon }}</span>
          <div>
            <p class="contact-label">{{ link.label }}</p>
            <p class="contact-value">{{ link.value }}</p>
          </div>
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const links = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'yourname@example.com',
    href: 'mailto:yourname@example.com',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/yourname',
    href: 'https://github.com/yourname',
  },
  {
    icon: '🐦',
    label: 'X (Twitter)',
    value: '@yourname',
    href: 'https://x.com/yourname',
  },
]
</script>

<style scoped>
.contact-section {
  background-color: var(--color-surface);
}

.contact-inner {
  max-width: 600px;
}

.contact-lead {
  color: var(--color-muted);
  margin-bottom: 32px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 20px;
  transition: border-color 0.2s, transform 0.15s;
  color: var(--color-text);
}

.contact-card:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
  text-decoration: none;
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 2px;
}

.contact-value {
  font-size: 0.9375rem;
  font-weight: 600;
}

.arrow {
  margin-left: auto;
  color: var(--color-muted);
}

.contact-card:hover .arrow {
  color: var(--color-primary);
}
</style>
