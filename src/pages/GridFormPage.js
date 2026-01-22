class GridFormPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.countrySelect = '[data-testid="country"]';
    this.citySelect = '[data-testid="city"]';
    this.jobRoleInput = '[data-testid="jobRole"]';
    this.experienceSelect = '[data-testid="experience"]';
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.getByText('Grid form submitted successfully!');
  }

  async fillForm(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.page.selectOption(this.countrySelect, data.country);
    await this.page.selectOption(this.citySelect, data.city);
    await this.page.fill(this.jobRoleInput, data.jobRole);
    await this.page.selectOption(this.experienceSelect, data.experience);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}

export { GridFormPage };
