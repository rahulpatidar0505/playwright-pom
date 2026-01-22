post {
    always {

        // ✅ Publish Playwright HTML report
        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports/playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report',
            useWrapperFileDirectly: true
        ])

        // ✅ Send Teams notification
        script {
            def status = currentBuild.currentResult
            def reportUrl = "${env.BUILD_URL}Playwright_20HTML_20Report/"

            def payload = """
            {
              "text": "🧪 *Playwright Test Execution*\\n
                       🔁 Status: *${status}*\\n
                       📦 Job: ${env.JOB_NAME}\\n
                       🔢 Build: #${env.BUILD_NUMBER}\\n
                       📊 Report: ${reportUrl}"
            }
            """

            bat """
            curl -X POST ^
                 -H "Content-Type: application/json" ^
                 -d "${payload}" ^
                 "https://defaultb87eec8cf4bd4a55b25e9251c87712.28.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d3fb49b546434f00b04d70cc75195f6d/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m6UC8JRtJpDDZ3PcIp60N_tJOdEsrlYAPZBkbnTTLu8"
            """
        }
    }
}
