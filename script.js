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
    const searchBtn = document.querySelector(".search-btn");
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
    const sermon = this.getFormData();
    if (!this.validateSermon(sermon)) return;

    this.sermons.push(sermon);
    this.saveToStorage();

    alert(`Sermon "${sermon.title}" saved successfully!`);
    this.clearForm(e);
  }

  clearForm(e) {
    e.preventDefault();
    document.getElementById("sermon-form").reset();
    console.log("Clear clicked");
  }

  searchVerse(e) {
    e.preventDefault();
    console.log("Search clicked");
  }

  getFormData() {
    // collects all form values into a object
    return {
      speaker: document.getElementById("speaker").value,
      title: document.getElementById("title").value,
      reference: document.getElementById("reference").value,
      date: document.getElementById("series").value,
      notes: document.getElementById("notes").value,
      id: date.now().toString(), // unique id
      createdAt: new Date().toISOString(), // Time stamp
    };
  }
  validateSermon(sermon) {
    // req field validation
    if (!sermon.title || sermon.title.trim() === "") {
      alert("Sermon title is required");
      return false;
    }
    if (!sermon.speaker || sermon.speaker.trim() === "") {
      alert("Speaker name is required");
      return false;
    }
    return true;
  }
  loadSermons() {
    // Loads From localStorage
    localStorage.setItem("sermonBuilder_sermons", JSON.stringify(this.sermons));
  }
}
