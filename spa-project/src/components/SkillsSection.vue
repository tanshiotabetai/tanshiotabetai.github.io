<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div class="skills-groups">
        <div class="skill-group" v-for="group in groups" :key="group.title">
          <h3 class="group-title">{{ group.title }}</h3>
          <div class="skill-tags">
            <span
              class="skill-tag"
              v-for="skill in group.skills"
              :key="skill.name"
              :style="{ '--level': skill.level + '%' }"
            >
              {{ skill.name }}
              <span class="level-bar"><span class="level-fill"></span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const groups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue.js', level: 85 },
      { name: 'React', level: 70 },
      { name: 'TypeScript', level: 75 },
      { name: 'CSS / Tailwind', level: 80 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 65 },
      { name: 'Python', level: 60 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'Figma', level: 65 },
      { name: 'Docker', level: 50 },
    ],
  },
]
</script>

<style scoped>
.skills-section {
  background-color: var(--color-surface);
}

.skills-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
}

.group-title {
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.skill-tags {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-tag {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
}

.level-bar {
  flex: 1;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.level-fill {
  display: block;
  height: 100%;
  width: var(--level);
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 3px;
  animation: fill 1s ease-out forwards;
  transform-origin: left;
}

@keyframes fill {
  from { width: 0 }
  to   { width: var(--level) }
}
</style>
