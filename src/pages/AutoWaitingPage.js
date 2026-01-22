class AutoWaitingPage {
  constructor(page) {
    this.page = page;

    this.slowLoadingButton = '[data-testid="slow-loading-button"]';
    this.animationButton = '[data-testid="animation-button"]';
    this.processCompletedText = page.getByText('✅ Process completed!');
    this.animationCompletedText = page.getByText(
      '✅ Animation completed! Element is now stable and ready for interaction.',
      { exact: true }
    );
  }

  async clickSlowLoadingButton() {
    await this.page.click(this.slowLoadingButton);
  }

  async clickAnimationButton() {
    await this.page.click(this.animationButton);
  }
}

export { AutoWaitingPage };
