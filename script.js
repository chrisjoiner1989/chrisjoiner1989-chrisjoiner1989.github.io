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
  bindEvents() {}
}
