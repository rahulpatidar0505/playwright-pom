class FileOperationsPage {
  constructor(page) {
    this.page = page;

    // Upload locators
    this.singleFileInput = page.locator('input[type="file"]').first();
    this.multipleFileInput = page.locator('input[type="file"]').nth(1);
    this.removeSingleFileButton = page.getByTestId('removeSingleFile');
    this.removeMultipleFile0Button = page.getByTestId('removeMultipleFile-0');
    this.removeMultipleFile1Button = page.getByTestId('removeMultipleFile-1');

    // Download locators
    this.downloadPdfButton = '[data-testid="downloadSamplePdf"]';
    this.downloadCsvButton = '[data-testid="downloadSampleCsv"]';
    this.downloadTxtButton = '[data-testid="downloadSampleTxt"]';
    this.downloadJsonButton = '[data-testid="downloadSampleJson"]';
  }

  async uploadSingleFile(filePath) {
    await this.singleFileInput.setInputFiles(filePath);
  }

  async uploadMultipleFiles(filePaths) {
    await this.multipleFileInput.setInputFiles(filePaths);
  }

  async downloadPdf() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.click(this.downloadPdfButton);
    return downloadPromise;
  }

  async downloadCsv() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.click(this.downloadCsvButton);
    return downloadPromise;
  }

  async downloadTxt() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.click(this.downloadTxtButton);
    return downloadPromise;
  }

  async downloadJson() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.click(this.downloadJsonButton);
    return downloadPromise;
  }
}

export { FileOperationsPage };
