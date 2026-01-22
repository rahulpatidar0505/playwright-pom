class UIElementsPage {
  constructor(page) {
    this.page = page;

    this.draggable1 = '[data-testid="draggable-1"]';
    this.draggable2 = '[data-testid="draggable-2"]';
    this.dropZone = '[data-testid="dropZone"]';
    this.resetDragDropButton = '[data-testid="resetDragDrop"]';
    this.dropZoneText = page.getByText('Drop items here', { exact: true });
  }

  async dragItemToZone(itemTestId) {
    await this.page
      .locator(itemTestId)
      .dragTo(this.page.locator(this.dropZone));
  }

  async resetDragDrop() {
    await this.page.click(this.resetDragDropButton);
  }
}

export { UIElementsPage };
