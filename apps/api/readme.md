
# DoItMorro API

## Running the DoItMorro API Project

### Development Setup

Follow these steps to set up and run the project in development mode:

#### Prerequisites
1. Ensure you have **Node.js** installed (use the version specified in `.nvmrc` if available).
2. Use `nvm` to install the required Node.js version:
   ```bash
   nvm install
   ```
3. Install dependencies using the following command:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `src/config` directory with the necessary environment variables:
   ```env
   NODE_ENV=development
   PORT=4000

   # Development
   DEV_DB_USERNAME=your_dev_db_username
   DEV_DB_PASSWORD=your_dev_db_password
   DEV_DATABASE=doit_morro_dev
   DEV_HOST=127.0.0.1
   DEV_DIALECT=postgres

   # Test
   TEST_DB_USERNAME=your_test_db_username
   TEST_DB_PASSWORD=your_test_db_password
   TEST_DATABASE=doit_morro_test
   TEST_HOST=127.0.0.1
   TEST_DIALECT=postgres

   # Production
   PROD_DB_USERNAME=your_prod_db_username
   PROD_DB_PASSWORD=your_prod_db_password
   PROD_DATABASE=doit_morro_prod
   PROD_HOST=127.0.0.1
   PROD_DIALECT=postgres
   ```

#### Starting the Development Server
Run the development server with hot-reload using:
```bash
npm run dev
```
The server will be available at `http://localhost:4000`.

---

### Production Setup

Follow these steps to build and run the project in production mode:

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

### Project Structure
The project follows a consistent structure for scalability:

```
src/
├── config/
│   ├── firebase.ts      # Firebase configuration
│   └── index.ts         # Re-exports configurations
├── services/            # Business logic and services
├── types/               # TypeScript type definitions
├── index.ts             # Main entry point
└── ...
```

---

### Scripts

- `npm run dev`: Starts the development server with hot reload.
- `npm run build`: Builds the project for production.
- `npm start`: Runs the built project in production mode.
- `npm run lint`: Lints the codebase.
- `npm run lint:fix`: Fixes linting issues automatically.
- `npm run migrate`: Runs database migrations.
- `npm run seed`: Seeds the database with initial data.

---

### Contributing

Refer to the `CONTRIBUTING.md` file for guidelines on how to contribute to this project.

---

## License
This project is licensed under the ISC License.
