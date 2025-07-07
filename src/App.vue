<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-if="$route.path.startsWith('/adminpanel') || $route.path.startsWith('/adminregister')" />
    <div v-else>
      <NavigationBar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <SponsorsSection />
      <AboutSection />
      <ContactsSection />
      <FooterSection />
    </div>
  </router-view>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import GallerySection from './components/GallerySection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import SponsorsSection from './components/SponsorsSection.vue'
import ContactsSection from './components/ContactsSection.vue'
import FooterSection from './components/FooterSection.vue'
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    ServicesSection,
    GallerySection,
    TestimonialsSection,
    AboutSection,
    SponsorsSection,
    ContactsSection,
    FooterSection,
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
