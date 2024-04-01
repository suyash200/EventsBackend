pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                // Checkout backend repository
                git branch: 'main', url: 'https://github.com/suyash200/EventsBackend.git'

                // Build backend Docker image
                script {
                    echo "Building Backend"
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                // Deploy backend Docker containers using docker-compose-backend.yml
                sh 'npm i'
            }
        }

        stage('running backend') {
            steps {
                // Deploy backend Docker containers using docker-compose-backend.yml
                sh 'npm run start'
            }
        }
        // stage('SonarQube Analysis') {
        //     steps {
        //         // Execute SonarQube Scanner
        //         script {
        //             // Get the path to SonarQube Scanner installation directory
        //             def scannerHome = tool 'SonarQubeScanner';
        //             echo "SonarQube Scanner installation directory: ${scannerHome}"
                    
        //             // Run SonarQube Scanner
        //             withSonarQubeEnv('SonarQubeServer') {
        //                 sh "${scannerHome}/bin/sonar-scanner"
        //             }
        //         }
        //     }
        // }
    }

    post {
        always {
            // Clean up Docker resources
            sh 'docker-compose -f docker-compose-backend.yml down'
        }
    }
}