# Playwright Test Automation Framework

A scalable test automation framework using Playwright with the Page Object Model design pattern.

## Structure

```
PlaywrightPOM/
├── src/
│   ├── config/         # Environment configurations
│   ├── fixtures/       # Custom fixtures
│   ├── pages/          # Page Object Models
│   ├── testData/       # Test data files
│   └── utils/          # Utilities
├── tests/
│   ├── API/            # API tests
│   └── UI/             # UI tests
└── reports/            # Test reports
```

## Setup

```bash
npm install
```

## Running Tests

```bash
# Headed mode
npm test

# Headless mode
npm run test:headless

# Environment specific
npm run test:qa
npm run test:prod

# Repeat tests
npm run test:repeat
```

## Reports

```bash
# Playwright report
npm run html:report

# Allure report
npm run allure:report

# Clean Allure results
npm run allure:clean
```

## Tools

```bash
# Code formatting
npm run format
npm run format:check

# Test recorder
npm run record
```

## Technologies

- Playwright
- Allure Reports
- Faker.js
- Luxon
- Prettier

## Repository

https://github.com/rahulpatidar0505/playwright-pom.git
