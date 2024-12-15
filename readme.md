
# DoItMorro

## Overview
DoItMorro is a cross-platform to-do management application designed for seamless task handling on mobile and web platforms. This project aims to provide a robust and user-friendly experience, leveraging modern technologies like React Native, Koa.js, and Firebase.

---

## Documentation Links
Below are the key documents outlining various aspects of the project:

1. [Time Tracking Categories](./time-tracking.md)  
   Defines the categories for tracking time spent on tasks to ensure productivity and accountability.

2. [Project Management Plan](./project-management-plan.md)  
   Details the tools, workflows, and methodologies for managing the project efficiently.

3. [Planning](./planning.md)  
   Outlines the milestones, deliverables, and high-level goals for the project.

4. [Architecture](./architecture.md)  
   Explains the technical architecture, including tools, frameworks, and the structure of the project.

---

## Getting Started

To set up the **DoItMorro** project locally, follow these steps:

### **Prerequisites**
Ensure the following tools are installed on your machine:
1. [Node.js (via nvm)](https://github.com/nvm-sh/nvm): Recommended version as specified in `.nvmrc`.
2. [Docker](https://www.docker.com/): For running backend services, the web app, and the PostgreSQL database.
3. [npm](https://www.npmjs.com/): Package manager for installing dependencies.
4. [Expo Go](https://expo.dev/client): Mobile app for testing the project on Android or iOS devices.

---

### **Setup Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chriscoderdr/doItMorro.git
   cd doItMorro
   ```

2. **Install Node.js Version**:
   Use `nvm` to install the Node.js version specified in the `.nvmrc` file:
   ```bash
   nvm install
   ```

3. **Install Dependencies**:
   Navigate to each application directory (`apps/api` and `apps/frontend`) and install dependencies individually:
   - For the backend:
     ```bash
     cd apps/api
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Set Up Environment Variables**:
   - Copy the `.env.example` files from the `apps/api` and `apps/frontend` directories.
   - Rename them to `.env` and configure them with your environment-specific settings:
     - `.env.development` for local development.
     - `.env.staging` for testing environments.
     - `.env.production` for production.

---

## Running the Application

### **Development**

- **Backend**:
  Start the backend API in development mode:
  ```bash
  npm run dev
  ```

- **Frontend (Expo)**:
  Navigate to the `apps/frontend` directory and start the Expo development server:
  ```bash
  cd apps/frontend
  npx expo start
  ```

---

## Production Setup for API

#### Prerequisites
1. Install **Node.js** and **npm** on your server.
2. Set up the necessary environment variables in a `.env` file:
   ```env
   NODE_ENV=production
   PORT=5000

   # Production
   PROD_DB_USERNAME=your_prod_db_username
   PROD_DB_PASSWORD=your_prod_db_password
   PROD_DATABASE=doit_morro_prod
   PROD_HOST=127.0.0.1
   PROD_DIALECT=postgres
   ```

#### Build the Project
Run the following command to build the project:
```bash
npm run build
```

#### Start the Production Server
Start the server using the built files:
```bash
npm start
```
The server will run on the port specified in the `.env` file.

---

### Running Database Migrations and Seeding

Before running the application, ensure your database is set up with the correct schema and initial data. You can use the following commands to handle migrations and seeding.

#### Migrate Database
Run the migration command to set up the database schema:
```bash
npm run migrate
```

#### Seed Database
Run the seed command to populate the database with initial data:
```bash
npm run seed
```

---

### **Folder Structure**
The project is organized as follows:
```
DoItMorro/
├── README.md           # Project overview
├── Architecture.md     # Technical documentation
├── apps/
│   ├── api/            # Backend services (Koa.js)
│   └── frontend/       # Web and mobile app (React Native with Expo)
└── docker-compose.yml  # Configuration for Docker services
```

---

## How to Contribute
For contributing to the project or reporting issues, follow these steps:
1. Clone the repository:  
   ```bash
   git clone https://github.com/chriscoderdr/doItMorro.git
   ```
2. Check out the [Project Management Plan](./project-management-plan.md) for workflows and issue labels.
3. Submit pull requests with detailed descriptions of changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
