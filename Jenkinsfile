pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // Set environment (qa or prod)
        TEST_ENV = 'qa'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rahulpatidar0505/playwright-pom.git'
            }
        }

        stage('Setup Environment Variables') {
            steps {
                script {
                    // Use Jenkins Credentials to create .env file (QA only for demo)
                    withCredentials([
                        string(credentialsId: 'qa-username', variable: 'QA_USERNAME'),
                        string(credentialsId: 'qa-password', variable: 'QA_PASSWORD'),
                        string(credentialsId: 'qa-api-username', variable: 'QA_API_USERNAME'),
                        string(credentialsId: 'qa-api-password', variable: 'QA_API_PASSWORD')
                    ]) {
                        // Create .env file in config folder
                        bat """
                            @echo off
                            (
                                echo # QA Environment Credentials
                                echo QA_USERNAME=%QA_USERNAME%
                                echo QA_PASSWORD=%QA_PASSWORD%
                                echo QA_API_USERNAME=%QA_API_USERNAME%
                                echo QA_API_PASSWORD=%QA_API_PASSWORD%
                            ) > src\\config\\.env
                        """
                    }
                }
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
                reportDir: 'reports/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                useWrapperFileDirectly: true
            ])
        }
    }
}
