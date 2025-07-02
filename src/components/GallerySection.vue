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
  padding: 50px 20px;
  background: #f5f5f5;
  text-align: center;
}

.gallery-main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.main-image {
  width: 900px;
  max-width: 90vw;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.nav-btn {
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  font-size: 2.5rem;
  padding: 0 16px;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.nav-btn:hover {
  background: rgba(0,0,0,0.8);
}

.nav-btn.left {
  left: 8px; /* labai arti kairio krašto */
}

.nav-btn.right {
  right: 8px; /* labai arti dešinio krašto */
}

.gallery-thumbnails {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 10px;
}

.gallery-thumbnails img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  opacity: 0.7;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  flex-shrink: 0;
}

.gallery-thumbnails img.active,
.gallery-thumbnails img:hover {
  opacity: 1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border-color: #42b983;
}
</style>
