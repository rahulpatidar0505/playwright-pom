# Jenkins CI/CD Setup Guide

This guide explains how to configure Jenkins to run Playwright tests with encrypted credentials.

## 🔐 How It Works in Jenkins

The Jenkinsfile automatically:
1. ✅ Pulls credentials from Jenkins Credentials Store (secure)
2. ✅ Creates the `.env` file during build
3. ✅ Runs tests with proper credentials
4. ✅ Cleans up after build completes

**Your credentials are NEVER stored in code or Git!**

---

## 📋 Prerequisites

1. Jenkins installed with these plugins:
   - **Credentials Plugin** (usually pre-installed)
   - **Credentials Binding Plugin** (usually pre-installed)
   - **NodeJS Plugin**
   - **HTML Publisher Plugin** (for reports)

2. Git access to your repository

---

## 🚀 Step-by-Step Setup

### Step 1: Add Credentials to Jenkins

1. **Go to Jenkins Dashboard** → `Manage Jenkins` → `Manage Credentials`

2. **Select Domain** → `(global)` → `Add Credentials`

3. **Add each credential as "Secret text":**

   > **Note:** Only QA credentials are needed for this demo application

   | Credential ID | Description | Example Value |
   |--------------|-------------|---------------|
   | `qa-username` | QA Username | `admin` |
   | `qa-password` | QA Password | `admin123` |
   | `qa-api-username` | QA API Username | `admin` |
   | `qa-api-password` | QA API Password | `password123` |

   **For each credential:**
   - **Kind:** `Secret text`
   - **Scope:** `Global`
   - **Secret:** `<your-actual-credential>`
   - **ID:** `<credential-id-from-table>`
   - **Description:** `<description-from-table>`

   Click **OK** after adding each one.

---

### Step 2: Configure NodeJS in Jenkins

1. Go to **Manage Jenkins** → **Global Tool Configuration**

2. Scroll to **NodeJS** section

3. Click **Add NodeJS**
   - **Name:** `NodeJS` (must match the Jenkinsfile)
   - **Version:** Select latest LTS (e.g., 20.x or 18.x)
   - Check **Install automatically**

4. Click **Save**

---

### Step 3: Create Jenkins Pipeline Job

1. **New Item** → Enter job name → Select **Pipeline** → Click **OK**

2. **Pipeline Configuration:**
   - **Definition:** `Pipeline script from SCM`
   - **SCM:** `Git`
   - **Repository URL:** `https://github.com/rahulpatidar0505/playwright-pom.git`
   - **Branch:** `*/main`
   - **Script Path:** `Jenkinsfile`

3. Click **Save**

---

### Step 4: Run Your Pipeline

1. Click **Build Now**

2. Watch the stages execute:
   - ✅ Checkout Code
   - ✅ Setup Environment Variables (creates `.env` from Jenkins credentials)
   - ✅ Install Dependencies
   - ✅ Run Playwright Tests
   - ✅ Publish HTML Report

3. View **Playwright HTML Report** in build artifacts

---

## 🎯 Advanced Configuration

### Running Different Environments

**Edit Jenkinsfile environment section:**

```groovy
environment {
    TEST_ENV = 'qa'  // Change to 'prod' for production tests
}
```

### Running Specific Test Suites

**Modify the test command:**

```groovy
stage('Run Playwright Tests') {
    steps {
        bat 'npx playwright test tests/UI'  // Only UI tests
        // OR
        bat 'npx playwright test --grep @smoke'  // Only smoke tests
    }
}
```

### Parameterized Builds

**Add parameters to your pipeline:**

```groovy
pipeline {
    agent any
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa', 'prod'], description: 'Select environment')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Select browser')
    }
    
    stages {
        stage('Run Tests') {
            steps {
                bat "set ENV=${params.ENVIRONMENT}&& npx playwright test --project=${params.BROWSER}"
            }
        }
    }
}
```

---

## 🔒 Security Best Practices

✅ **DO:**
- Store ALL sensitive data in Jenkins Credentials
- Use descriptive credential IDs
- Restrict access to Jenkins credentials (Role-based access)
- Regularly rotate credentials
- Use separate credentials for QA and Production

❌ **DON'T:**
- Hardcode credentials in Jenkinsfile
- Print credentials in console logs
- Share Jenkins admin access
- Commit `.env` file to repository

---

## 🐛 Troubleshooting

### Issue: "Credentials not found"

**Solution:** Verify credential IDs match exactly:
```groovy
credentialsId: 'qa-username'  // Must match Jenkins credential ID
```

### Issue: ".env file not created"

**Solution:** Check build logs for the "Setup Environment Variables" stage. Ensure credentials are bound correctly.

### Issue: "Tests fail with undefined credentials"

**Solution:** 
1. Verify all 4 QA credentials are added in Jenkins
2. Check credential IDs match the Jenkinsfile
3. Ensure `.env` file is created in `src/config/.env`

### Issue: "npm install fails"

**Solution:**
1. Verify NodeJS tool is configured correctly
2. Check Node version compatibility
3. Ensure internet access for npm registry

---

## 📊 Viewing Test Reports

After build completes:
1. Go to build page
2. Click **Playwright HTML Report** in left sidebar
3. View detailed test results, screenshots, and traces

---

## 🔄 Alternative Approach: Environment Variables Directly

If you prefer not to create `.env` file, you can inject environment variables directly:

```groovy
stage('Run Playwright Tests') {
    steps {
        withCredentials([
            string(credentialsId: 'qa-username', variable: 'QA_USERNAME'),
            string(credentialsId: 'qa-password', variable: 'QA_PASSWORD'),
            // ... other credentials
        ]) {
            bat 'npx playwright test'
        }
    }
}
```

**Note:** This approach requires your config files to check for `process.env` variables directly without using dotenv.

---

## 📞 Support

For issues or questions:
1. Check Jenkins console output for detailed error messages
2. Verify all prerequisites are met
3. Review credential IDs match exactly
4. Ensure proper permissions in Jenkins

---

## ✅ Checklist Before First Run

- [ ] All 4 QA credentials added to Jenkins
- [ ] Credential IDs match exactly (case-sensitive)
- [ ] NodeJS tool configured and named `NodeJS`
- [ ] Repository URL correct in pipeline configuration
- [ ] Jenkinsfile present in repository root
- [ ] HTML Publisher plugin installed
- [ ] Git credentials configured (if private repo)

**Once all checked, click "Build Now" and watch your tests run! 🚀**
