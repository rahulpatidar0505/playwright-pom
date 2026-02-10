# Configuration Setup

This folder contains environment-specific configuration files for the Playwright automation framework.

## Environment Variables Setup

### Files Overview

- **`.env`** - Contains actual credentials (DO NOT COMMIT TO GIT)
- **`.env.example`** - Template file showing required environment variables (safe to commit)
- **`env.qa.js`** - QA environment configuration
- **`env.prod.js`** - Production environment configuration
- **`index.js`** - Environment selector based on ENV variable

### Getting Started

1. **Copy the example file to create your `.env` file:**
   ```bash
   cp src/config/.env.example src/config/.env
   ```

2. **Update `.env` with your actual credentials:**
   ```env
   QA_USERNAME=your_actual_username
   QA_PASSWORD=your_actual_password
   QA_API_USERNAME=your_actual_api_username
   QA_API_PASSWORD=your_actual_api_password
   ```

   > **Note:** This demo application only uses QA environment

3. **The `.env` file is already in `.gitignore`** and will not be committed to version control.

### How It Works

- Each environment config file (env.qa.js, env.prod.js) loads credentials from `.env`
- Credentials are never hardcoded in the source files
- The `index.js` file automatically selects the correct environment based on the `ENV` variable

### Usage

Run tests with different environments:

```bash
# QA Environment
npm run test:qa

# Production Environment  
npm run test:prod
```

### Security Best Practices

✅ **DO:**
- Keep `.env` file locally only
- Use `.env.example` to document required variables
- Update `.env` with real credentials for your local testing

❌ **DON'T:**
- Commit `.env` file to git
- Share credentials in code or documentation
- Hardcode passwords in config files

### Team Onboarding

When a new team member joins:
1. They clone the repository
2. Copy `.env.example` to `.env`
3. Get credentials from the team lead/password manager
4. Update their local `.env` file
5. Start testing!
