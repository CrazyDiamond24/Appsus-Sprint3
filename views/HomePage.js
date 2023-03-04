export default {
	template: `
<section class="home-page">
  <div class="content">
    <div class="image-grid">
      <RouterLink class="image-item" to="/email/list">
        <img src="./assets/img/sus-mail.jpg" alt="Email">
        <h2>Mail ✉️</h2>
      </RouterLink>
      <RouterLink class="image-item" to="/notes">
        <img src="./assets/img/sus-note.jpg" alt="Notes">
        <h2>Notes 📝</h2>
      </RouterLink>
      <RouterLink class="image-item" to="/book">
        <img src="./assets/img/sus-book.jpg" alt="Books">
        <h2>Books 📚</h2>
      </RouterLink>
    </div>
  </div>
</section>

    `,
}
