class NavigationPage {
  constructor(page) {
    this.page = page;

    this.acceptAllButton = page.getByRole('button', { name: 'Accept All' });

    // Navigation menu items
    this.authenticationLink = page.getByText('Authentication', { exact: true });
    this.smartTableLink = page.getByText('📋Smart Table');
    this.modalsLink = page.getByText('🪟Modals');
    this.fileOperationsLink = page.getByText('📁');
    this.framesLink = page.getByText('Frames');
    this.uiElementsLink = page.getByText('🎨UI Elements');
    this.autoWaitingLink = page.getByText('⏱️');
    this.shadowElementLink = page.getByText('👤');
  }

  async acceptCookies() {
    await this.acceptAllButton.click();
  }

  async goToAuthentication() {
    await this.authenticationLink.click();
  }

  async goToSmartTable() {
    await this.smartTableLink.click();
  }

  async goToModals() {
    await this.modalsLink.click();
  }

  async goToFileOperations() {
    await this.page.locator('div').nth(2).click();
    await this.fileOperationsLink.click();
  }

  async goToFrames() {
    await this.framesLink.click();
  }

  async goToUIElements() {
    await this.uiElementsLink.click();
  }

  async goToAutoWaiting() {
    await this.autoWaitingLink.click();
  }

  async goToShadowElement() {
    await this.shadowElementLink.click();
  }
}

export { NavigationPage };
