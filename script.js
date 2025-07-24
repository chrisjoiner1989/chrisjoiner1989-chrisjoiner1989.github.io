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
  saveSermon(e) {
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

  async searchVerse(e) {
    e.preventDefault();
    const reference = document.getElementById("reference").value;
    if (!reference.trim()) {
      alert("Please enter a verse reference (e.g., John 3:16)");
      return;
    } // Show loading message
    const verseDisplay = document.getElementById("verse-display");
    verseDisplay.innerHTML = "<p>Loading verse...</p>";

    try {
      // Bible API call - free, no key required
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(reference)}`
      );

      if (!response.ok) {
        throw new Error("Verse not found");
      }

      const data = await response.json();
      verseDisplay.innerHTML = `
              <div class="verse-result">
                  <h4>${data.reference}</h4>
                  <p class="verse-text">"${data.text}"</p>
                  <small>Translation: ${data.translation_name}</small>
              </div>
          `;
    } catch (error) {
      verseDisplay.innerHTML = `
              <p class="error">Could not find verse "${reference}". 
              Please check spelling and try format like "John 3:16"</p>
          `;
    }

    console.log("Search clicked");
  }

  getFormData() {
    // collects all form values into a object
    return {
      speaker: document.getElementById("speaker").value,
      title: document.getElementById("title").value,
      reference: document.getElementById("reference").value,
      series: document.getElementById("series").value,
      date: document.getElementById("date").value,
      notes: document.getElementById("notes").value,
      id: Date.now().toString(), // unique id
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
    const stored = localStorage.getItem("sermonBuilder_sermons");
    return stored ? JSON.parse(stored) : [];
  }

  saveToStorage() {
    // Saves to localStorage
    localStorage.setItem("sermonBuilder_sermons", JSON.stringify(this.sermons));
  }
}
