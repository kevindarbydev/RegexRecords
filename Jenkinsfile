pipeline {
    agent any
    
     tools {
        nodejs "npm"
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
        nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm ci'
        }
        composer 'composer'
            }
        }


        stage('Build Assets') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                 // Push changes to deploy branch
                 sh "git push origin testing:deploy"
            }
        }
    }
}
