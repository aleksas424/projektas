<template>
  <section class="about" id="about">
    <div class="container">
      <h2>Apie mus</h2>
      <p class="intro">
        Esame atsidavusi profesionalų komanda, siūlanti aukščiausio lygio paslaugas jūsų projektams. Turime ilgametę patirtį ir nuolat siekiame geriausių rezultatų kiekvienam klientui.
      </p>
      <div class="highlights">
        <div class="highlight-card">
          <i class="fas fa-cogs"></i>
          <h3>Profesionalumas</h3>
          <p>Dirbame atsakingai ir efektyviai – mūsų komanda garantuoja kokybę.</p>
        </div>
        <div class="highlight-card">
          <i class="fas fa-users"></i>
          <h3>Komanda</h3>
          <p>Mūsų specialistai yra patyrę savo srities profesionalai.</p>
        </div>
        <div class="highlight-card">
          <i class="fas fa-lightbulb"></i>
          <h3>Sprendimai</h3>
          <p>Randame geriausius techninius sprendimus kiekvienam atvejui.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutSection",
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css");

.about {
  background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
  padding: 80px 20px;
  color: #2c3e50;
  box-shadow: 0 2px 12px rgba(160, 6, 6, 0.6);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.85);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  text-align: center;
}

h2 {
  font-size: 3rem;
  margin-bottom: 36px;
  color: #1e293b;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.intro {
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 50px;
  color: #444;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.highlight-card {
  background: #ffffff;
  padding: 36px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.15);
  transition: all 0.3s ease;
  border: 1px solid #e2fbe9;
}

.highlight-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 28px rgba(66, 185, 131, 0.25);
}

.highlight-card i {
  font-size: 3rem;
  color: #42b983;
  margin-bottom: 18px;
  transition: color 0.3s ease;
}

.highlight-card:hover i {
  color: #2fa06f;
}

.highlight-card h3 {
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: #1e293b;
  font-weight: 600;
}

.highlight-card p {
  font-size: 1.05rem;
  color: #4b5563;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  h2 {
    font-size: 2.2rem;
  }

  .intro {
    font-size: 1.1rem;
    padding: 0 10px;
  }

  .highlight-card h3 {
    font-size: 1.3rem;
  }

  .highlight-card p {
    font-size: 0.95rem;
  }

  .highlight-card i {
    font-size: 2.2rem;
  }
}

</style>
