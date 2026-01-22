pipeline {
    agent any

    tools {
        nodejs 'NodeJS'      // Must match Global Tool name
        // allure 'Allure'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rahulpatidar0505/playwright-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {

            // ✅ Playwright HTML (will show index + zip – expected)
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                useWrapperFileDirectly: true
            ])

            // // 🔥 Allure Report (Best for Jenkins)
            // allure(
            //     includeProperties: false,
            //     jdk: '',
            //     results: [[path: 'allure-results']]
            // )
        }
    }
}
