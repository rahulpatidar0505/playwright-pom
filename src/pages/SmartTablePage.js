class SmartTablePage {
  constructor(page) {
    this.page = page;

    this.table = '[data-testid="smartTable"]';
    this.addRowButton = '[data-testid="addRowBtn"]';
    this.addRowFormLocator = page.locator('[data-testid="addRowForm"]');
    this.firstNameInput = page
      .getByLabel('First Name *')
      .or(page.getByPlaceholder('First Name *'));
    this.lastNameInput = page
      .getByLabel('Last Name *')
      .or(page.getByPlaceholder('Last Name *'));
    this.usernameInput = '[data-testid="newUsername"]';
    this.emailInput = page
      .getByLabel('E-mail *')
      .or(page.getByPlaceholder('E-mail *'));
    this.ageInput = '[data-testid="newAge"]';
    this.saveButton = '[data-testid="saveNewRow"]';
    this.editFirstNameInput = '//td[3]//input[@type="text"]';
    this.editLastNameInput = '//td[4]//input[@type="text"]';
    this.confirmEditButton = page.getByRole('button', { name: '✅' });
  }

  async clickAddRow() {
    await this.page.click(this.addRowButton);
  }

  async fillNewRowForm(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.page.fill(this.usernameInput, data.username);
    await this.emailInput.fill(data.email);
    await this.page.fill(this.ageInput, data.age);
  }

  async saveNewRow() {
    await this.page.click(this.saveButton);
  }

  getRowByText(text) {
    return this.page
      .locator(this.table)
      .locator('tr', { hasText: text })
      .first();
  }

  async editRow(row) {
    await row.locator('button:has-text("✏️")').click();
  }

  async updateRowData(firstName, lastName) {
    await this.page.fill(this.editFirstNameInput, firstName);
    await this.page.fill(this.editLastNameInput, lastName);
    await this.confirmEditButton.click();
  }

  async deleteRow(row) {
    await row.locator('button:has-text("🗑️")').click();
  }

  getTableLocator() {
    return this.page.locator(this.table);
  }

  getRowCount(text) {
    return this.page.locator(this.table).locator('tr', { hasText: text });
  }
}

export { SmartTablePage };
