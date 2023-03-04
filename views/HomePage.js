export default {
	template: `
  <section class="home-page">
    <div class="content">
      <div class="image-grid">
        <router-link class="image-item" to="/email/list">
          <img src="../assets/img/sus-mail.jpg" alt="Email">
          <h2>Mail ✉️</h2>
        </router-link>
        <router-link class="image-item" to="/notes">
          <img src="../assets/img/sus-note.jpg" alt="Notes">
          <h2>Notes 📝</h2>
        </router-link>
      </div>
    </div>
  </section>
    `,
}
