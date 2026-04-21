# Experiment 3.2: CI/CD Pipelines & Automated Testing
# AVAILABLE AT: https://coderjangra.github.io/FS-Exp-8/
## 🎯 Aim
To implement continuous integration and continuous deployment (CI/CD) pipelines, and build automated testing workflows utilizing modern DevOps tools such as GitHub Actions, JUnit, and Mockito. This experiment demonstrates the complete software development lifecycle (SDLC) automation for a full-stack application.

## 📋 Objectives
This project was developed to fulfill the following core requirements:
1. **Create CI/CD Pipelines**: Configure and simulate automated workflows using GitHub Actions that trigger on `push` and `pull_request` events to compile code and run tests.
2. **Write Unit Tests**: Demonstrate isolation testing of Spring Boot components using JUnit 5 and Mockito, ensuring high code coverage without requiring an actual database connection.
3. **Automate Deployments**: Configure an automated Continuous Deployment (CD) pipeline (simulating Jenkins or GitHub Actions CD) to push artifacts to a container registry and deploy them to a Kubernetes cluster or production server.

## 🏗️ Architecture & Implementation Details

### 1. Real Spring Boot Backend & JUnit Tests
Unlike a purely frontend simulation, this repository contains a **real Spring Boot Maven project** inside the `/backend` directory. 
- It includes a `User` entity, a `UserRepository` interface, and a `UserService`.
- Inside `/backend/src/test/java/.../UserServiceTest.java`, there is a fully functional **JUnit 5 and Mockito** test suite. It isolates the `UserService` and mocks the repository layer to assert business logic independently.

### 2. Live CI/CD Pipelines (GitHub Actions)
The repository is equipped with actual GitHub Actions YAML files located in `.github/workflows/`:
- **Continuous Integration (`ci.yml`)**: Automatically triggers whenever code is pushed to the `main` branch. It provisions an Ubuntu runner, sets up JDK 17, and executes `mvn clean package` and `mvn test` against the physical Spring Boot code in this repository.
- **Continuous Deployment (`cd.yml`)**: A manually dispatchable workflow (`workflow_dispatch`) that simulates authenticating with a Docker Registry, building/pushing an image, and applying manifests to a Kubernetes cluster. It even accepts environment inputs (staging vs. production).

### 3. AutoOps Interactive Dashboard (React SPA)
The frontend is a React Single Page Application built with Vite and Material UI (`@mui/material`), designed with a sleek, dark GitHub-inspired theme (`#0d1117` background, `#238636` success greens). 
Instead of faking data with timeouts, the dashboard **integrates directly with the live GitHub REST API**:
- **Pipelines Tab**: Fetches the top 5 most recent GitHub Actions workflow runs from this exact repository. It displays live status indicators (queued, in-progress, success, failure), commit hashes, and execution times.
- **Unit Tests Tab**: Uses `axios` to fetch the raw Java source code of `UserServiceTest.java` directly from the `main` branch, displaying it alongside the latest CI job's test execution conclusion.
- **Automated Deploy Tab**: Polls the GitHub API every 10 seconds specifically for the `cd.yml` workflow. If a user manually triggers the CD pipeline from the GitHub Actions tab, this React UI will instantly detect the running job and display live deployment progress and logs.

## 🚀 Setup & Installation

### Local Development
To run the React AutoOps dashboard locally:
1. Navigate to the project directory: `cd fs8`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

### Triggering a Live Deployment (Interactive CD)
To see the live connection between the React Dashboard and GitHub Actions:
1. Open the deployed React Dashboard.
2. In a separate tab, navigate to the **Actions** tab of this GitHub repository.
3. Select **CD Pipeline (Manual Deploy)** from the left sidebar.
4. Click **Run workflow** (you can select 'staging' or 'production').
5. Switch back to the React Dashboard and navigate to the **Automated Deploy** tab. You will see the UI automatically detect the running job and update its status in real-time!

## 🎓 Learning Outcomes
- Gained practical experience in configuring YAML-based CI/CD pipelines using GitHub Actions.
- Mastered the implementation of Mockito to stub repository calls in Spring Boot Unit Tests.
- Understood the mechanics of Continuous Deployment, including building artifacts, pushing to registries, and updating orchestrated environments.
- Developed a real-time monitoring dashboard by consuming live webhook data and REST APIs from a version control provider.
