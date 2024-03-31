pipeline {
    agent any // Use any available agent to run the pipeline
    tools {
        go 1.21.3
    }
    environment {
        GO121MODULE = 'on'
        CGO_ENABLED = 0 
        GOPATH = "${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_ID}"
    }
    triggers {
        pollSCM '*/2 * * * *'
      }
    stages {
        stage('Build') {
            steps {
                echo 'building...'
                // Change Directory to server/
                dir('server/'){
                    sh 'make build'
                }
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

