class ModalsPage {
  constructor(page) {
    this.page = page;

    // Dialog locators
    this.openDialogButton = '[data-testid="openDialog"]';
    this.dialogConfirmButton = '[data-testid="dialogConfirm"]';

    // Window locators
    this.openWindowButton = '[data-testid="openWindow"]';
    this.windowInput = '[data-testid="windowInput"]';
    this.windowSelect = '[data-testid="windowSelect"]';
    this.windowCheckbox = '[data-testid="windowCheckbox"]';
    this.windowSaveButton = '[data-testid="windowSave"]';

    // Popover locators
    this.togglePopoverButton = '[data-testid="togglePopover"]';
    this.popoverContent = page.getByText('This is a popover content');
    this.closePopoverButton = page.getByRole('button', { name: 'Close' });

    // Toastr locators
    this.successToastrButton = '[data-testid="successToastr"]';
    this.warningToastrButton = '[data-testid="warningToastr"]';
    this.toastrCloseButton = '[data-testid="toastrClose"]';
    this.successToastrMessage = page.getByText('Success! Operation completed');
    this.warningToastrMessage = page.getByText(
      'Warning! Please check your input'
    );

    // Tooltip locators
    this.tooltipTrigger = '[data-testid="tooltipTrigger"]';
    this.tooltipContent = '[data-testid="tooltipContent"]';
    this.tooltipText = page.getByText(
      'This is a tooltip that appears on hover or click. Perfect for automation testing!'
    );

    // Alert button locators
    this.simpleAlertButton = page.getByRole('button', { name: 'Simple Alert' });
    this.confirmDialogButton = page.getByRole('button', {
      name: 'Confirm Dialog',
    });
    this.promptDialogButton = page.getByRole('button', {
      name: 'Prompt Dialog',
    });

    // Tab/Window locators
    this.openNewTabButton = '[data-testid="openNewTab"]';
    this.openNewWindowButton = '[data-testid="openNewWindow"]';
    this.openExternalLinkButton = '[data-testid="openExternalLink"]';
  }

  async openDialog() {
    await this.page.click(this.openDialogButton);
  }

  async confirmDialog() {
    await this.page.click(this.dialogConfirmButton);
  }

  async fillWindowForm(data) {
    await this.page.click(this.openWindowButton);
    await this.page.click(this.windowInput);
    await this.page.fill(this.windowInput, data.inputText);
    await this.page.selectOption(this.windowSelect, data.selectValue);
    await this.page.check(this.windowCheckbox);
    await this.page.click(this.windowSaveButton);
  }

  async togglePopover() {
    await this.page.click(this.togglePopoverButton);
  }

  async closePopover() {
    await this.closePopoverButton.click();
  }

  async showSuccessToastr() {
    await this.page.click(this.successToastrButton);
  }

  async showWarningToastr() {
    await this.page.click(this.warningToastrButton);
  }

  async closeToastr() {
    await this.page.click(this.toastrCloseButton);
  }

  async hoverTooltip() {
    await this.page.hover(this.tooltipTrigger);
    await this.page.waitForSelector(this.tooltipContent, { state: 'visible' });
  }

  async clickSimpleAlert() {
    await this.simpleAlertButton.click();
  }

  async clickConfirmDialog() {
    await this.confirmDialogButton.click();
  }

  async clickPromptDialog() {
    await this.promptDialogButton.click();
  }

  async openNewTab() {
    await this.page.click(this.openNewTabButton);
  }

  async openNewWindow() {
    await this.page.click(this.openNewWindowButton);
  }

  async openExternalLink() {
    await this.page.click(this.openExternalLinkButton);
  }
}

export { ModalsPage };
