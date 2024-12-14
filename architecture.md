
# DoItMorro Architecture and Tech Stack

## Overview
The **DoItMorro** project is built to deliver a seamless and scalable solution for managing to-do tasks across **mobile and web platforms**. It employs a well-defined architecture and modern tech stack that meets current needs while allowing flexibility for future growth.

---

## Project Structure
```
DoItMorro/
├── README.md           # High-level project overview and setup
├── Architecture.md     # Detailed architectural documentation
├── apps/
│   ├── api/            # Backend implementation (Koa.js)
│   └── frontend/       # Mobile and web frontend (Expo)
└── docker-compose.yml  # Configuration for Docker services
```

### Key Benefits:
- **Independent Applications**: No monorepo manager (e.g., Yarn Workspaces or npm Workspaces) is used, ensuring each app operates independently.
- **Docker Integration**: Backend and web services are containerized for consistent environments and simplified deployments.
- **Scalability**: Clear separation of app-specific concerns supports future enhancements.

---

## Architecture
### Approach:
- **Modular Monolithic**:
  - **Scalability**: Modules can grow independently if required.
  - **Maintainability**: Organized separation of concerns.
  - **Performance**: Low latency due to minimal inter-service communication.

### Communication:
- **REST**: API for interaction between the frontend and backend.

---

## Tech Stack

### API
- **Framework**: Koa.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**:
  - **Firebase Admin SDK** for user/token management.
  - **dotenv** for environment configurations.
- **Time Management**:
  - **Moment.js** and **Moment-Timezone** for consistent date handling.
- **Middleware**:
  - Includes **koa-router**, **koa-bodyparser**, **koa-logger**, **koa-cors**, **koa-static**.
- **Containerization**: Docker ensures consistent environments for API and database.

---

### Mobile & Web Frontend
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Firebase JavaScript SDK**:
  - Ensures compatibility with **Expo Go** and supports mobile and web platforms.
  - Provides features like Authentication, Firestore, and Storage.
- **State Management**:
  - **Redux Toolkit** for global state and API calls.
  - **redux-persist** for state persistence.
- **Navigation**: Expo Router.
- **Styling**:
  - **Reusable Components** from previous projects (Morro Taxi, Jam Room).
  - **Custom Components** for new UI needs.
  - **Tailwind CSS** for web components.
- **Higher-Order Components**:
  - Centralized logic for **loading, error, and offline states**.

---

## Component Structure
```
component-name/
├── index.ts       # Component implementation
├── styles.ts      # Component-specific styles
└── props.ts       # TypeScript definitions for props
```

### Benefits:
- **Maintainability**: Separation of logic, styles, and props.
- **Scalability**: Modular structure for adding new features.
- **Clarity**: Encapsulation improves readability and testing.

---

## Features & Decisions

### Firebase JavaScript SDK
- **Why**: Compatibility with Expo Go and seamless web/mobile integration.
- **Features**: Authentication, Firestore, Analytics, Storage.

---

### Tailwind CSS (Web)
- **Why**: Utility-first framework for fast and consistent web styling.
- **Usage**: Specific web components requiring custom styles.

---

### Named Exports
- **Why**: Avoid issues with tooling, dead code elimination, and misnamed imports.
- **Outcome**: Cleaner and more explicit API surface.

---

### Avoidance of Native Components
- **Why**: Ensures compatibility with Expo Go.
- **Outcome**: Simplifies development and cross-platform deployment.

---

### Multiple `.env` Files
- **Purpose**: Environment-specific settings.
- **Structure**:
  - `.env.development`
  - `.env.staging`
  - `.env.production`

---

## Docker Integration
- The project uses Docker Compose to run:
  - **Backend** (API).
  - **Web App** (React frontend for web).
  - **PostgreSQL Database**.
- Simplifies local development and production deployments.

---

## Workflow for Local Development
1. **Start Backend and Web with Docker**:
   ```bash
   docker-compose up
   ```
   - Backend is accessible at [http://localhost:5000](http://localhost:5000).
   - Web app is accessible at [http://localhost:3000](http://localhost:3000).

2. **Start Mobile with Expo**:
   Navigate to the `apps/frontend` directory and run:
   ```bash
   yarn start
   ```
   - Use **Expo Go** to scan the QR code for testing on a mobile device.

---

## Suggested Enhancements

### Linting and Formatting Tools
- **Tools**: ESLint, Prettier.
- **Scripts**:
  ```bash
  yarn lint
  yarn format
  ```

---

### Automated Testing
- **Backend**: Jest + Supertest.
- **Frontend**: Jest + React Testing Library.

---

### Performance Optimization
- **Lazy Loading**: Use Expo Router's lazy loading.
- **Firebase Imports**: Import only required Firebase modules.

---

## Conclusion
The **Docker-integrated structure** and **modular architecture** of DoItMorro support efficient collaboration, scalability, and performance. By combining **modern tech stacks** like **Firebase JS SDK**, **Tailwind CSS**, **TypeScript**, and a well-organized component structure, DoItMorro is prepared for both current needs and future enhancements.

---
