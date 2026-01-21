class ShadowElementPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.shadowButton = '[data-testid="shadow-button"]';
    this.successMessage = page.getByText('Button clicked successfully!');
  }

  async clickShadowButton() {
    await this.page.click(this.shadowButton);
  }
}

module.exports = { ShadowElementPage };
