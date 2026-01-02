# url-shortener-distributed-architecture

## Description:
This project implements a distributed URL shortener system designed to handle high traffic volumes efficiently. It utilizes a Base-62 encoding scheme for generating short URLs and incorporates Apache ZooKeeper for managing distributed counter synchronization across multiple application servers. The system is containerized using Docker to ensure easy deployment, scalability, and replication of a distributed environment on a local computer. Also to ensure high availability, and optimal performance in our distributed URL Shortener system, it implements node balancing using Nginx.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [System Design](#system-design)
- [Project Setup](#usage)

## Tech Stack
- MERN Stack (MongoDB, Express.js, React.js)
- Base-62 Encoding Algorithm
- Apache ZooKeeper for Distributed Synchronization
- Nginx for load balancing
- Docker for Containerization

## Features
- Generates short URLs using a scalable Base-62 encoding algorithm.
- Manages distributed counter synchronization through Apache ZooKeeper.
- Containerized deployment using Docker for scalability, ease of management, and replication of distributed system environments on local computers.

# System Design

## Design Considerations
### 1. URL Shortening Logic
  - Base-62 Encoding: Utilizes 62 characters ('0-9', 'a-z', 'A-Z') to generate short URLs.
  - MD5 Hashing: Initially considered for shortening, but potential collisions led to adoption of unique counters.
### 2. Database Choice
  - RDMS vs No-SQL: Evaluated based on Index Maintenance, Flexibility and Schema Evolution, Read-Write Throughput, ACID properties vs eventual consistency and, scalabilty trade-offs.
  - Scaling Strategy: Horizantal Scaling - Adding more app servers when required.
### 3. Concurrency and Synchronization
  - Apache ZooKeeper: Centralized service for managing distributed synchronization, ensuring unique counter generation across multiple application servers.
  - Load Balancing: To ensure high availability, and optimal performance in our distributed URL Shortener system, node balancing is done using Nginx.
  - Least Connections Algoritm: Nginx directs requests to the server with the fewest active connections, optimizing resource usage and response times.
### 4. Data Capacity and Storage
  - Data Model: Long URLs up to 2048 characters; short URLs fixed at 7 characters.
  - Storage Requirements: Approximately 72GB/month, necessitating scalable database solutions.
### 5. Deployment and Containerization
  - Dockerization: Entire system containerized using Docker for easy deployment, management, and scalability, facilitating local simulation of distributed environments.
  - 
# Project Setup

## Prerequisites
Before starting, ensure you have the following installed on your system:
- Docker: Download and install Docker from Docker's official website.

## Steps to Install and Run

### 1.Clone the Repository
```bash
git clone https://github.com/Ayush0520/url-shortener-distributed-architecture.git
cd url-shortener-distributed-architecture
```

### 2. Build the Docker Images
Run the following command from the root directory of your project to build the Docker images specified in docker-compose.yml:
```bash
docker-compose build
```
### 3.Start the Containers
After building the images, start the containers using:
```bash
docker-compose up
```

### 4. Accessing the Frontend
Once Docker Compose has started the containers, you can access the frontend application at:
http://localhost:3000
