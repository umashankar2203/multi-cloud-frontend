#  Production-Grade Multi-Cloud Deployment (AWS + GCP)

##  Overview

This project demonstrates a production-style multi-cloud deployment of a containerized FastAPI backend and a React frontend.

The backend is deployed across:

-  AWS ECS Fargate (Primary Cloud)
-  GCP Cloud Run (Secondary Cloud)

The frontend is deployed on:

-  Vercel (HTTPS)

The architecture follows infrastructure best practices including autoscaling, environment isolation, managed container services, and Infrastructure as Code.

---

##  Live URLs

### Frontend (Vercel)
https://multi-cloud-frontend-ten.vercel.app

### AWS Backend (Production – HTTP)
http://pgagi-backend-alb-Prod-1227545064.ap-south-1.elb.amazonaws.com

### GCP Backend (Production – HTTPS)
https://pgagi-backend-gcp-670335862351.asia-south1.run.app

---

##  Architecture Overview

###  AWS (Primary Cloud)

- ECS Fargate (Managed Containers)
- Application Load Balancer
- Target Group
- Auto Scaling (CPU-based)
- CloudWatch Logs
- Security Groups (ALB → ECS restricted)
- Terraform remote backend (S3 + DynamoDB locking)
- Dev / Staging / Prod environment separation

### Production Configuration (AWS)

- CPU: 2048
- Memory: 4096
- Min Tasks: 3
- Max Tasks: 10
- Rolling Deployment Strategy (100/200)
- Log Retention: 30 days

---

###  GCP (Secondary Cloud)

- Cloud Run (Fully Managed)
- Region: asia-south1
- 2 vCPU
- 4 GiB Memory
- Min Instances: 1
- Max Instances: 10
- HTTPS enabled by default
- Autoscaling managed by Cloud Run

---

##  Frontend Design

Built using:

- React + Vite
- Environment-based API configuration
- Multi-cloud backend toggle (AWS / GCP)
- Deployed on Vercel (HTTPS)

Environment Variables used:

```
VITE_API_AWS
VITE_API_GCP
```

GCP is configured as the default backend for public deployment due to HTTPS compatibility.

---

##  SSL Termination on AWS ALB

The AWS Application Load Balancer currently operates over HTTP.

AWS ACM does not allow issuing certificates for default `*.elb.amazonaws.com` domains.

In a production environment, HTTPS would be enabled by:

- Provisioning a custom domain (e.g., api.example.com)
- Validating via Route53
- Attaching an ACM certificate to the ALB
- Enabling HTTPS listener (443)

For this assignment, HTTPS on AWS ALB was intentionally not configured due to domain constraints.

This limitation is architectural, not functional.

---

##  Scalability Strategy

### AWS
- ECS service auto-scales based on CPU utilization
- Horizontal scaling from 3 to 10 tasks
- Load balancer distributes traffic evenly

### GCP
- Cloud Run scales automatically based on request load
- Scales from 1 to 10 instances

Both deployments support horizontal scalability.

---

##  Key Architectural Decisions

### Why Not Kubernetes?

Kubernetes (EKS/GKE) was intentionally avoided because:

- The workload is a single service
- Managed container platforms provide sufficient scalability
- Reduced operational overhead
- Faster deployment lifecycle
- Cost efficiency

Using ECS Fargate and Cloud Run simplifies operations while maintaining production reliability.

---

##  Deployment Strategy

- Rolling deployments configured on ECS
- Zero-downtime deployment
- Health check endpoint: `/api/health`
- Integration endpoint: `/api/message`
- Infrastructure managed via Terraform (AWS)

---

## 🛠 Failure Handling Considerations

- ECS task crash → replaced automatically
- High CPU → auto-scale out
- Container failure → task restarted
- Cloud Run instance crash → managed restart
- Load balancer health checks ensure only healthy instances receive traffic

---

##  Future Improvements

- Enable HTTPS on AWS using custom domain + ACM
- Add AWS WAF
- Implement Blue/Green deployment
- Add centralized monitoring & alerting
- Introduce CDN layer (CloudFront)
- Implement multi-region failover

---

##  Repository Structure

```
frontend/   → React (Vite) application  
backend/    → FastAPI service  
terraform/  → AWS infrastructure (IaC)  
```

---

##  Project Outcome

This project demonstrates:

- Multi-cloud deployment strategy
- Production-grade container orchestration
- Infrastructure as Code
- Autoscaling architecture
- Environment isolation
- Security reasoning and trade-off decisions
- Managed cloud-native services

---

##  Author

G M Umashankar  
DevOps Engineer  
Experience: 2 Years  




