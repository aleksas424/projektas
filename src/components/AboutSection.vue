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
  background: linear-gradient(to bottom, #f9fafb, #eef3f7);
  padding: 80px 20px;
  color: #2c3e50;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
  text-align: center;
}

h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: #1e293b;
  font-weight: 700;
}

.intro {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 50px;
  color: #555;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.highlight-card {
  background: #f0fdf4;
  padding: 30px 20px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(66, 185, 131, 0.2);
}

.highlight-card i {
  font-size: 2.5rem;
  color: #42b983;
  margin-bottom: 16px;
}

.highlight-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 600;
}

.highlight-card p {
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 600px) {
  h2 {
    font-size: 2.2rem;
  }

  .intro {
    font-size: 1.05rem;
  }

  .highlight-card h3 {
    font-size: 1.2rem;
  }

  .highlight-card p {
    font-size: 0.95rem;
  }
}
</style>
