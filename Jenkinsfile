node {

    try {

        stage('Checkout Code') {
            git branch: 'main',
                url: 'https://github.com/rahulpatidar0505/playwright-pom.git'
        }

        stage('Install Dependencies') {
            bat 'npm install'
            bat 'npx playwright install'
        }

        stage('Run Playwright Tests') {
            bat 'npx playwright test'
        }

    } catch (e) {
        currentBuild.result = 'FAILURE'
        throw e

    } finally {

        stage('Publish Report') {
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

        stage('Notify Teams') {
    def status = currentBuild.result ?: 'SUCCESS'
    def reportUrl = "${env.BUILD_URL}Playwright_20HTML_20Report/"

    bat """
    curl -X POST ^
      -H "Content-Type: application/json" ^
      -d "{\\"text\\":\\"Playwright Tests: ${status} | Job: ${env.JOB_NAME} | Build: #${env.BUILD_NUMBER} | Report: ${reportUrl}\\"}" ^
      "https://defaultb87eec8cf4bd4a55b25e9251c87712.28.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/d3fb49b546434f00b04d70cc75195f6d/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m6UC8JRtJpDDZ3PcIp60N_tJOdEsrlYAPZBkbnTTLu8"
    """
}

    }
}
