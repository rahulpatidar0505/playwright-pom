# 🎭 Playwright Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.57.0-45ba4b?logo=playwright)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

> A scalable, production-ready test automation framework built with Playwright and the Page Object Model design pattern.

---

## ✨ Features

- 🏗️ **Page Object Model (POM)** architecture for maintainable tests
- 🌍 **Multi-environment** support (QA, Prod, etc.)
- 📊 **Rich reporting** with Allure and Playwright HTML reports
- 🔄 **API & UI testing** in one framework
- 🎨 **Code quality** tools (ESLint, Prettier)
- 📝 **Faker.js** integration for test data generation
- ⏰ **Luxon** for date/time handling

---

## 📁 Project Structure

```
PlaywrightPOM/
├── 📂 src/
│   ├── 📂 config/         # Environment configurations
│   ├── 📂 fixtures/       # Custom Playwright fixtures
│   ├── 📂 pages/          # Page Object Models
│   ├── 📂 testData/       # Test data files
│   └── 📂 utils/          # Helper utilities
├── 📂 tests/
│   ├── 📂 API/            # API test suites
│   └── 📂 UI/             # UI test suites
├── 📂 reports/            # Generated test reports
├── 📄 package.json        # Project dependencies and scripts
└── 🎭 playwright.config.js # Playwright configuration
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rahulpatidar0505/playwright-pom.git

# Navigate to project directory
cd PlaywrightPOM

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## 🧪 Running Tests

<details>
<summary><b>Basic Test Execution</b></summary>

```bash
# Run tests in headed mode (browser visible)
npm test

# Run tests in headless mode (faster, no UI)
npm run test:headless

# Run tests multiple times (stress testing)
npm run test:repeat
```
</details>

<details>
<summary><b>Environment-Specific Tests</b></summary>

```bash
# Run tests against QA environment
npm run test:qa

# Run tests against Production environment
npm run test:prod
```
</details>

<details>
<summary><b>Test Recording</b></summary>

```bash
# Launch Playwright codegen to record tests
npm run record
```
</details>

---

## 📊 Reports & Analysis

### View Reports

```bash
# Open Playwright HTML report
npm run html:report

# Generate and open Allure report
npm run allure:report

# Clean previous Allure results
npm run allure:clean
```

### Report Types

| Report Type | Command | Description |
|-------------|---------|-------------|
| 🎭 Playwright | `npm run html:report` | Interactive HTML report with screenshots & videos |
| 📈 Allure | `npm run allure:report` | Beautiful test analytics and trends |

---

## 🛠️ Development Tools

### Code Quality

```bash
# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Lint code with ESLint
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Dependency Management

```bash
# Update all dependencies to latest versions
npm run update:deps
```

---

## 🏗️ Built With

| Technology | Purpose |
|------------|---------|
| ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white) | Test automation |
| ![Allure](https://img.shields.io/badge/Allure-FF6347?logo=qameta&logoColor=white) | Test reporting |
| ![Faker.js](https://img.shields.io/badge/Faker.js-FFC107?logo=javascript&logoColor=black) | Test data generation |
| ![Luxon](https://img.shields.io/badge/Luxon-4B0082?logo=javascript&logoColor=white) | Date/time handling |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black) | Code formatting |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white) | Code linting |

---

## 📖 Documentation

<details>
<summary><b>Writing Tests</b></summary>

Create a new test in the `tests/UI/` or `tests/API/` directory:

```javascript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```
</details>

<details>
<summary><b>Creating Page Objects</b></summary>

Add new page objects in `src/pages/`:

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```
</details>

## 📫 Contact

**Repository:** [playwright-pom](https://github.com/rahulpatidar0505/playwright-pom)

---

<div align="center">
Made with ❤️ using Playwright
</div>
