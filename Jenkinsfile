pipeline {
     agent any
    
         tools {
        nodejs "node"       
    }
    
    stages {
        stage('Checkout') {
            steps {
               checkout([$class: 'GitSCM', branches: [[name: 'jenkins']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/RegexRecords.git']]])
                sh "git fetch origin main:main --force"
                sh "git checkout main"
            }
        }
     stage('Install') {
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
        stage('PHPUnit Tests') {
            steps {
                sh 'php vendor/bin/phpunit'
            }
        }
        stage('Deploy') {
            steps {
               withCredentials([gitUsernamePassword(credentialsId: 'github-credentials')]) {       
                sh "git config --global user.email 'kevindarbydev@gmail.com'"
                sh "git config --global user.name 'Kevin Darby' " 
                sh "git pull origin deploy"
                sh "git push -u origin HEAD:deploy"
               }
            }
        }
    }
}
