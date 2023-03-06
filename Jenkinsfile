pipeline {
     agent any
    
         tools {
        nodejs "node"       
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'jenkins']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/LaravelLivewire.git']]])
            }
        }
     stage('Install') {
          steps {             
              sh 'npm ci'   
            }
        }  

        stage('Build Assets') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
               withCredentials([gitUsernamePassword(credentialsId: 'github-credentials')]) {         
                sh "git push"
               }
            }
        }
    }
}
