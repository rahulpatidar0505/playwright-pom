class FramesPage {
  constructor(page) {
    this.page = page;

    // Main page locators
    this.loadFrameButton = '[data-testid="load-practice-frame"]';
    this.iframe = '[data-testid="practice-iframe"]';
  }

  getFrame() {
    return this.page.frameLocator(this.iframe);
  }

  async loadFrame() {
    await this.page.click(this.loadFrameButton);
  }

  async fillFrameForm(frame, data) {
    await frame.getByTestId('frame-name-input').fill(data.name);
    await frame.getByTestId('frame-email-input').fill(data.email);
    await frame.getByTestId('frame-phone-input').fill(data.phone);
    await frame.getByTestId('frame-country-select').selectOption(data.country);
    await frame.locator('div').filter({ hasText: data.level }).nth(3).click();
    await frame.getByTestId('frame-message-textarea').fill(data.message);
    await frame.getByTestId('frame-terms-checkbox').check();
  }

  async submitFrameForm(frame) {
    await frame.getByTestId('frame-submit-btn').click();
  }

  getSuccessMessage(frame) {
    return frame.getByTestId('success-message');
  }
}

module.exports = { FramesPage };
