<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <a href="#hero" class="logo" @click.prevent="scrollTo('hero')">YourName</a>
      <nav class="nav-links">
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          :class="{ active: active === s.id }"
          @click.prevent="scrollTo(s.id)"
        >{{ s.label }}</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({ sections: Array })
const isScrolled = ref(false)
const active = ref('hero')

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  isScrolled.value = window.scrollY > 40

  const offsets = props.sections.map(s => {
    const el = document.getElementById(s.id)
    return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity }
  })
  const current = offsets.filter(o => o.top <= 80).at(-1)
  if (current) active.value = current.id
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s, box-shadow 0.3s;
  padding: 16px 0;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.02em;
}

.logo:hover {
  text-decoration: none;
  color: var(--color-primary);
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  font-size: 0.875rem;
  color: var(--color-muted);
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-primary);
  text-decoration: none;
}
</style>
