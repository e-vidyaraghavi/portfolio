<script setup>
import SiteHeader from './components/SiteHeader.vue'
import BubbleField from './components/BubbleField.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProductSection from './components/ProductSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useReveal } from './composables/useReveal.js'
import { useSpotlight } from './composables/useSpotlight.js'

useReveal()
useSpotlight()
</script>

<template>
  <BubbleField />
  <SiteHeader />

  <main>
    <HeroSection class="reveal" />
    <AboutSection class="reveal" />
    <ProductSection class="reveal" />
    <ProjectsSection class="reveal" />
    <ExperienceSection class="reveal" />
    <SkillsSection class="reveal" />
    <EducationSection class="reveal" />
    <ContactSection class="reveal" />
  </main>

  <SiteFooter />
</template>

<style scoped>
main {
  position: relative;
  z-index: 1;
}
</style>
