document.addEventListener("DOMContentLoaded", function () {
  //Gets Form Elements
  const form = document.getElementById("sermon-form");
  const speakerInput = document.getElementById("speaker");
  const titleInput = document.getElementById("title");
  const referenceInput = document.getElementById("reference");
  const dateInput = document.getElementById("date");
  const seriesInput = document.getElementById("series");
  const notesInput = document.getElementById("notes");
  const verseDisplay = document.getElementById("verse-display");
  const referenceHelp = document.getElementById("reference-help");

  // gets buttons
  const saveBtn = document.querySelector(".save-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const searchBtn = document.querySelector(".search-btn");

  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const sermonData = {
      speaker: speakerInput.value,
      title: titleInput.value,
      reference: referenceInput.value,
      date: dateInput.value,
      series: seriesInput.value,
      notes: notesInput.value,
    };

    if (!sermonData.title) {
      alert("Title is required");
      return;
    }
    console.log("sermon saved:", sermonData);

    let savedSermons = JSON.parse(localStorage.getItem("sermons")) || [];
    savedSermons.push(sermonData);
    localStorage.setItem("sermons", JSON.stringify(savedSermons));
    alert("Sermon saved successfully");
  });

  clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    speakerInput.value = "";
    titleInput.value = "";
    referenceInput.value = "";
    dateInput.value = "";
    seriesInput.value = "";
    notesInput.value = "";
    verseDisplay.innerHTML = "";
  });

  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const reference = referenceInput.value.trim();

    if (!reference) {
      alert("Please enter a verse reference");
      return;
    }

    // API call
    verseDisplay.innerHTML = "Searching...";
    
    fetch(`https://bible-api.com/${reference}`)
      .then(response => response.json())
      .then(data => {
        verseDisplay.innerHTML = data.text;
      })
      .catch(error => {
        verseDisplay.innerHTML = 'Error finding verse. Please check the reference.';
      });
  });
});
