#  Churn Prediction System

An AI-powered enterprise churn prediction and customer retention platform built using **React**, **TypeScript**, **Express.js**, and backend workflow automation.

---

#  Project Overview

The **Churn Prediction System** helps organizations proactively identify customers at risk of churn and automate retention workflows using AI-generated recommendations and intervention management.

The platform simulates an enterprise-grade retention intelligence system with:

- AI-powered churn prediction
- Dynamic risk scoring
- Workflow automation
- REST API architecture
- Backend persistence layer
- AI recommendation engine
- Role-based access control
- Intervention workflow management
- Frontend-backend integration

---

#  System Architecture

```text
React Frontend
      ↓
Express Backend APIs
      ↓
Risk Scoring Engine
      ↓
AI Recommendation Engine
      ↓
Workflow Automation
      ↓
JSON Persistence Layer
```

---

#  Frontend Features

- Modern React + TypeScript UI
- Role-based dashboards
- AI Insights Engine
- Intervention workflow management
- Analytics dashboards
- Customer churn monitoring
- Responsive enterprise interface
- Workflow automation integration
- Dynamic backend API integration

---

#  Backend Features

- Express.js backend server
- REST API architecture
- Authentication APIs
- Customer management APIs
- Intervention workflow APIs
- AI recommendation APIs
- JSON-based persistence layer
- Dynamic workflow creation
- Business logic engine
- AI workflow automation

---

#  REST APIs

##  Authentication APIs

```http
POST /login
```

---

##  Customer APIs

```http
GET /customers
```

---

##  AI Recommendation APIs

```http
POST /ai-recommendation
```

---

##  Intervention Workflow APIs

```http
GET /interventions
POST /interventions
```

---

##  Health Monitoring APIs

```http
GET /health
```

---

#  Risk Scoring Engine

The backend includes a dynamic churn risk scoring engine that evaluates:

- Login inactivity
- Ticket volume
- NPS score
- ARR value

### Risk Categories Generated Dynamically

- Low
- Medium
- High
- Critical

---

#  AI Recommendation Engine

The AI recommendation engine generates retention actions based on customer risk profile.

### Example Recommendations

- Executive retention calls
- Premium support upgrades
- Dedicated support assignment
- Customer satisfaction recovery workflows

---

#  Workflow Automation

The system supports automated intervention workflow creation.

## Workflow Flow

```text
Customer Risk Detection
        ↓
AI Recommendation Generation
        ↓
Automatic Intervention Creation
        ↓
Persistent Workflow Tracking
```

---

#  Persistence Layer

The backend uses JSON-based persistent storage for:

- Customers
- Intervention workflows

## Storage Files

```text
backend/data/customers.json
backend/data/interventions.json
```

---

#  Authentication System

The platform includes backend-based authentication with role validation.

## Supported Roles

- Admin
- Manager
- Analyst

---

#  Technologies Used

## Frontend

- React
- TypeScript
- TanStack Router
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- REST APIs

---

## Persistence

- JSON database layer

---

## Architecture

- AI workflow automation
- Backend orchestration
- Risk scoring engine
- Dynamic API integration

---

#  How To Run

## Frontend

```bash
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
node server.js
```

---

#  Enterprise Workflow

```text
Customer Monitoring
        ↓
Risk Detection
        ↓
AI Recommendation
        ↓
Intervention Workflow
        ↓
Retention Action
```


# Implemented Features

The current implementation includes:

- Full-stack frontend-backend architecture
- Dynamic REST API integration
- AI recommendation engine
- Risk scoring engine
- Persistent intervention workflow management
- Backend authentication APIs
- Role-based access control
- AI-driven workflow automation
- Dynamic customer selection
- JSON persistence layer
- Intervention CRUD operations
- ServiceNow source-controlled metadata
- IntegrationHub artifact support
- Scheduled import definitions
- ACL role configurations
---

# Future Enhancements

- Real-time customer activity monitoring with live streaming ingestion
- Advanced GPT-powered recommendation generation using production OpenAI APIs
- Predictive ML model enhancement with historical churn training datasets
- JWT-based enterprise authentication and session management
- Production-grade database integration (PostgreSQL / MongoDB)
- Advanced notification escalation workflows for SLA breaches
- Customer Lifetime Value (CLV) prediction and retention ROI analytics
- Multi-language Virtual Agent support
- Enterprise dashboard analytics and forecasting modules
- Real-time Slack / Microsoft Teams workflow orchestration


# Current Limitations

The current implementation simulates enterprise integrations and AI orchestration workflows for academic and prototype purposes.

The repository currently uses:

- Simulated OpenAI recommendation generation
- JSON-based persistence instead of production databases
- Mock integration connectors for CRM/support systems
- Prototype-level authentication flows
- Simplified workflow automation logic

These components are designed to demonstrate architecture, orchestration, and workflow implementation patterns in a scalable enterprise-style system.

# ServiceNow Native Components

The repository includes source-controlled ServiceNow application artifacts exported directly from the connected ServiceNow instance, including:

- Custom dictionary tables
- IntegrationHub configurations
- Scheduled import definitions
- ACL role configurations
- ServiceNow application modules
- Workflow/update artifacts
- UI section definitions
- sys_choice configurations
- Risk score history tables
- Customer profile metadata

These artifacts are available under:

```text
sn_instances/dev317514
```

# Repository Structure

```text
ProjectSpace-PS60
│
├── backend/
│   ├── data/
│   ├── aiEngine.js
│   ├── riskEngine.js
│   ├── notificationService.js
│   ├── openaiService.js
│   ├── server.js
│
├── src/
│   ├── routes/
│   ├── components/
│   ├── lib/
│
├── sn_instances/
│   └── dev317514/
│
├── README.md
```


#  Business Value

This platform helps enterprises:

- Predict customer churn proactively
- Automate retention workflows
- Improve customer satisfaction
- Reduce revenue loss
- Enhance support operations
- Streamline intervention management

---

#  Enterprise Use Cases

- SaaS customer retention
- Telecom churn prevention
- Banking customer engagement
- Subscription management
- AI-driven customer success operations
- Retention workflow automation

---

#  Conclusion

The Churn Prediction System demonstrates a modern enterprise-grade full-stack architecture with:

- Frontend-backend integration
- AI-powered recommendations
- Workflow automation
- Persistent backend architecture
- Dynamic business logic
- Enterprise retention workflows

The project simulates a scalable customer retention intelligence platform designed for proactive churn prevention and operational automation.