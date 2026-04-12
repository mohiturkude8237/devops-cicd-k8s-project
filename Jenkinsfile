pipeline {
    agent any

    environment {
        DOCKER_USER = "mohiturkude8237"
        FRONTEND_IMAGE = "frontend-app"
        BACKEND_IMAGE = "backend-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/mohiturkude8237/devops-cicd-k8s-project.git', branch: 'main'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$BACKEND_IMAGE:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$FRONTEND_IMAGE:latest ./frontend'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKER_USER/$BACKEND_IMAGE:latest
                    docker push $DOCKER_USER/$FRONTEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment Successful!"
        }
        failure {
            echo "❌ Pipeline Failed!"
        }
    }
}
