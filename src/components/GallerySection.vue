<template>
  <section class="gallery" id="gallery">
    <h2>Galerija / Projektai</h2>

    <div class="gallery-main">
      <button class="nav-btn left" @click="prev">&#8249;</button>

      <img 
        :src="images[currentIndex]" 
        :alt="`Projektas ${currentIndex + 1}`" 
        class="main-image"
      />

      <button class="nav-btn right" @click="next">&#8250;</button>
    </div>

    <div class="gallery-thumbnails">
      <img 
        v-for="(img, index) in images" 
        :key="index" 
        :src="img" 
        :alt="`Projektas ${index + 1}`"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'GallerySection',
  data() {
    return {
      images: [
        'https://picsum.photos/seed/1/800/500',
        'https://picsum.photos/seed/2/800/500',
        'https://picsum.photos/seed/3/800/500',
        'https://picsum.photos/seed/4/800/500',
        'https://picsum.photos/seed/5/800/500',
        'https://picsum.photos/seed/6/800/500',
      ],
      currentIndex: 0,
    }
  },
  methods: {
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  }
}
</script>

<style scoped>
.gallery {
  padding: 60px 20px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* gražus fonas */
  box-shadow: 0 4px 12px rgba(160, 6, 6, 0.6);
  text-align: center;
}

.gallery h2 {
  color: #42b983;
  font-size: 2.4rem;
  margin-bottom: 40px;
  font-weight: 700;
}

.gallery-main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.main-image {
  width: 900px;
  max-width: 92vw;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

.nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #42b983;
  color: #42b983;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.nav-btn:hover {
  background: #42b983;
  color: white;
}

.nav-btn.left {
  left: -20px;
}

.nav-btn.right {
  right: -20px;
}

.gallery-thumbnails {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 0;
}

.gallery-thumbnails img {
  width: 110px;
  height: 75px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  opacity: 0.6;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  flex-shrink: 0;
}

.gallery-thumbnails img.active,
.gallery-thumbnails img:hover {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  border-color: #42b983;
}

</style>
