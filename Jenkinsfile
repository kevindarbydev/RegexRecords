pipeline {
    agent any

    tools {
        nodejs "node"
        composer "composer"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/LaravelLivewire.git']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'composer install'
            }
        }

        stage('Build Assets') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps here, such as pushing to a remote server
            }
        }
    }
}
