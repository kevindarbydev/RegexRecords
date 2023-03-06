pipeline {
     agent any
    
         tools {
        nodejs "node"       
    }
    
    stages {
        stage('Checkout') {
            steps {
               checkout([$class: 'GitSCM', branches: [[name: 'jenkins']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/LaravelLivewire.git']]])
                sh "git fetch origin main:main"
                sh "git checkout main"
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
                sh "git config --global user.email 'kevindarbydev@gmail.com'"
                sh "git config --global user.name 'Kevin Darby' " 
                sh "git push -u origin HEAD:deploy"
               }
            }
        }
    }
}
