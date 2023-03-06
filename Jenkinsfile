pipeline {
    agent any
    
     tools {
        nodejs "nodejs"       
    }

    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'jenkins']], userRemoteConfigs: [[url: 'https://github.com/kevindarbydev/LaravelLivewire.git']]])
            }
        }
     stage('Install') {
          steps {
              sh 'npm install'
   
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
