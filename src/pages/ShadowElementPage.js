class ShadowElementPage {
  constructor(page) {
    this.page = page;

    this.shadowButton = '[data-testid="shadow-button"]';
    this.successMessage = page.getByText('Button clicked successfully!');
  }

  async clickShadowButton() {
    await this.page.click(this.shadowButton);
  }
}

export { ShadowElementPage };
