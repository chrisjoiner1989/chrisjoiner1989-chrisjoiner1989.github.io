class sermonBuilder {
  constructor() {
    // Holds sermon memory
    this.sermons = this.loadSermons();
    this.init();
  }

  init() {
    // Sets up eventListeners when page loads
    this.bindEvents();
    const referenceInput = document.getElementById("reference");
    if (referenceInput) {
      referenceInput.addEventListener("input", (e) =>
        this.checkReferenceFormat(e)
      );
    }
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
    const validation = this.validateReferenceInput(reference);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Show loading message
    const verseDisplay = document.getElementById("verse-display");
    verseDisplay.innerHTML = "<p>Loading verse...</p>";

    try {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(reference)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        verseDisplay.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        return;
      }
      
      // Display the verse
      verseDisplay.innerHTML = `
        <div class="verse-result">
          <h3>${data.reference}</h3>
          <p class="verse-text">${data.text}</p>
          <p class="verse-info">Translation: ${data.translation_name || 'King James Version'}</p>
        </div>
      `;
    } catch (error) {
      console.error('Error fetching verse:', error);
      verseDisplay.innerHTML = `<p class="error">Failed to load verse. Please check your connection and try again.</p>`;
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

  validateVerseReference(reference) {
    // Bible verse regex patterns
    const patterns = [
      // Full format: "John 3:16", "1 Corinthians 13:4-7", "Psalm 23:1-6"
      /^(1|2|3)?\s*[A-Za-z]+\s+\d+:\d+(-\d+)?$/,
      // Book chapter only: "John 3", "1 Corinthians 13"
      /^(1|2|3)?\s*[A-Za-z]+\s+\d+$/,
      // With abbreviations: "Jn 3:16", "1Co 13:4"
      /^(1|2|3)?[A-Za-z]{2,4}\s+\d+:\d+(-\d+)?$/,
    ];

    // Check if reference matches any valid pattern
    return patterns.some((pattern) => pattern.test(reference.trim()));
  }

  validateReferenceInput(reference) {
    if (!reference || reference.trim() === "") {
      return { isValid: false, message: "Please enter a verse reference" };
    }

    if (!this.validateVerseReference(reference)) {
      return {
        isValid: false,
        message:
          'Invalid format. Please use format like "John 3:16" or "1 Corinthians 13:4-7"',
      };
    }

    return { isValid: true, message: "" };
  }

  checkReferenceFormat(e) {
    const reference = e.target.value;
    const helpText = document.getElementById("reference-help");

    if (!reference) {
      helpText.textContent = "";
      return;
    }

    const validation = this.validateReferenceInput(reference);
    if (validation.isValid) {
      helpText.textContent = "✓ Valid format";
      helpText.className = "help-text valid";
    } else {
      helpText.textContent = validation.message;
      helpText.className = "help-text invalid";
    }
  }
}

// Initialize the sermon builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new sermonBuilder();
});
