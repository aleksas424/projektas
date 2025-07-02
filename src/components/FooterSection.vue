<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© 2024 Įmonės pavadinimas. Visos teisės saugomos.</span>
      <div class="social-links" role="list">
        <a href="#" aria-label="Facebook" role="listitem" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.04 3.66 9.22 8.44 9.93v-7.03H7.9v-2.9h2.54v-2.22c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.57v1.88h2.8l-.45 2.9h-2.35v7.03C18.34 21.28 22 17.1 22 12.07z"/>
          </svg>
        </a>
        <a href="#" aria-label="Instagram" role="listitem" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0z"/>
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn" role="listitem" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-9 14v-6H7v6h3zm-1.5-7.14a1.74 1.74 0 110-3.48 1.74 1.74 0 010 3.48zm9.5 7.14v-3.41c0-1.83-1.97-1.69-1.97 0v3.41h-3v-6h3v.82a3.51 3.51 0 012.87-1.58c2.88 0 3.43 1.9 3.43 4.37v2.39h-3z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
.footer {
  background: #222;
  color: #fff;
  padding: 24px 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.social-links {
  display: flex;
  gap: 24px;
  margin-top: 8px;
}

.social-links a {
  color: #fff;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.social-links a:hover,
.social-links a:focus {
  color: #42b983;
  transform: scale(1.2);
  outline: none;
}

.social-links svg {
  display: block;
  width: 24px;
  height: 24px;
}

@media (max-width: 600px) {
  .footer-content {
    gap: 8px;
  }

  .social-links {
    gap: 16px;
  }
}
</style>
