# 🚀 DevOps CI/CD Pipeline Project

## 📌 Project Overview
I built a complete end-to-end DevOps CI/CD pipeline for a 3-tier application that includes:
- Frontend (React - Vite)
- Backend (Node.js - Express)
- Database (MongoDB)

  I containerized the entire application using Docker and deployed it on Kubernetes (Minikube) running on an AWS EC2 instance.

  I also implemented a CI/CD pipeline using Jenkins to automate the build and deployment process.
---

## 🏗️ Architecture

![Project-Deployment-Flow](/images/project-deployment-flow.png)

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube)
- **CI/CD:** Jenkins
- **Cloud:** AWS EC2

---

## 🔄 CI/CD Pipeline Flow

1. Developer pushes code to GitHub  
2. Jenkins pipeline is triggered  
3. Docker images are built for frontend & backend  
4. Images are pushed to DockerHub  
5. Kubernetes manifests are applied  
6. Application is deployed and updated automatically  

---

## 📦 Docker Setup

- Multi-stage Docker build used for frontend  
- Backend container runs Node.js server  
- Images pushed to DockerHub  

---

## ☸️ Kubernetes Setup

- Deployments for frontend, backend, and MongoDB  
- Services used for internal communication  
- Port-forward used for external access  

---

## 🛠️ Challenges Faced & Solutions

- ❌ Kubernetes authentication issue in Jenkins  
  ✅ Solved by configuring kubeconfig for Jenkins user  

- ❌ Minikube NodePort not accessible externally  
  ✅ Used port-forward for external access  

- ❌ Service communication issues  
  ✅ Fixed using proper service names and ports  

---

## 📸 Proof of Work

- Jenkins Pipeline (Successful Execution)
- Kubernetes Pods Running
- Application UI Working
- API Response Verified

---

## ▶️ How to Run

```bash
# Start Minikube
minikube start

# Apply Kubernetes configs
kubectl apply -f k8s/

# Port forward
kubectl port-forward service/frontend 3000:80 --address 0.0.0.0
kubectl port-forward service/backend 5000:5000 --address 0.0.0.0
