pipeline {
    agent any // Use any available agent to run the pipeline
    tools { go '1.21.3' }
    stages {
        stage('Build') {
            steps {
                // Build your code (e.g., using a build tool like Maven or Gradle)
                echo 'building...'
            }
        }

        stage('Test') {
            steps {
                // Run tests (modify the command according to your testing framework)
                echo 'testing...'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application (e.g., to a web server or container)
                echo 'Deploying'
            }
        }
    }

    post {
        success {
            // Actions to take when the pipeline succeeds
            echo 'Pipeline succeeded! Deploying to production...'
        }
        failure {
            // Actions to take when the pipeline fails
            echo 'Pipeline failed! Notify the team...'
        }
    }
}

