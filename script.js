class sermonBuilder {
  constructor() {
    // Holds sermon memory
    this.sermons = this.loadSermons();
    this.init();
  }

  init() {
    // Sets up eventListeners when page loads
    this.bindEvents();
  }
  bindEvents() {
    // gets HTML btn References
    const saveBtn = document.querySelector(".save-btn");
    const clearBtn = document.querySelector(".clear-btn");
    const searchBtn = document.querySelector("search-btn");
    const form = document.getElementById("sermon-form");

    // adds click handlers
    if (saveBtn) saveBtn.addEventListener("click", (e) => this.saveSermon(e));
    if (clearBtn) clearBtn.addEventListener("click", (e) => this.clearForm(e));
    if (searchBtn)
      searchBtn.addEventListener("click", (e) => this.searchVerse(e));
  }
  saveSermons(e) {
    e.preventDefault();
    console.log("Save clicked");
  }

  clearForm(e) {
    e.preventDefault();
    console.log("Clear clicked");
  }

  searchVerse(e) {
    e.preventDefault();
    console.log("Search clicked");
  }
}
