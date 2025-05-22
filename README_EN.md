# README — TASK MANAGER (ASTRO + SVELTE)

## PROJECT DESCRIPTION

This is a test project **Task Manager**, using **Astro** with **Svelte** integration for dynamic components in the web application.  
The project includes **MySQL** for data storage and **Redis** for caching.

## MAIN FUNCTIONALITY

Upon launching the app, the main page displays a table with tasks. Each row of the table contains the following fields:

- Title  
- Description  
- Priority  
- Due Date  
- Status  

And buttons for management: **Select**, **Complete**, and **Delete**.

## ADDING A TASK

To add a new task:

- Click the **Add Task** button under the table.  
- Fill in the fields in the form.  
- Click the confirmation button to save the task.

## EDITING A TASK

To edit an existing task:

- Click the **Select** button next to the desired task — it will be highlighted.  
- Then click the **Edit Task** button under the table.  
- Edit the fields in the form and confirm saving.

## MARKING A TASK AS COMPLETED

To mark a task as completed:

- Click the **Complete** button next to the corresponding task.  
- The status will change to `"Completed"`.

You can also mark a task as completed when editing (see **Editing a Task**).

## DELETING A TASK

To delete a task:

- Click the **Delete** button next to the task you want to delete.  
- Confirm the deletion in the pop-up window.

## TASK FILTERING

At the top of the table, there is a filter. In the current version, filtering is available by:

- Priority  
- Status  

To apply the filter:

- Select the desired values from the dropdowns.  
- Click the **Apply Filters** button.

## REQUIREMENTS

To run the project locally, you need:

- **Node.js** version 18 or higher  
- **npm** for installing dependencies  
- **MySQL** for the database  
- **Redis** for caching  

## INSTALLATION

### 1. CLONE THE REPOSITORY

    ```bash
    git clone https://github.com/kirill2884/task-manager.git
    cd <destination_folder>

### 2. INSTALL DEPENDENCIES

To install all dependencies, run the following command:

    ```bash
    npm install

## IMPORTANT

For the project to work, **MySQL** and **Redis** are required.  
Make sure **MySQL** and **Redis** are running locally or use **Docker** (see below).

## ENVIRONMENT VARIABLES SETUP

To run the project locally, you need a `.env` file in the project root with the necessary variables:

- `DATABASE_URL` — the URL for accessing the MySQL database  
  Example: `mysql://root:rootpassword@localhost:3306/task-manager`
  
- `REDIS_URL` — the URL for accessing Redis  
  Example: `redis://localhost:6379`

- `PORT` — the port on which the app will run (default is 3000)  
  Example: `PORT=3001` (optional)

## LOCAL LAUNCH

1. Make sure **MySQL** and **Redis** are running on your local machine.
2. Run the database migration using the command:
   ```bash
   npx prisma migrate deploy

## IMPORTANT

If you've made changes to the database schema, use the command:

    ```bash
    npx prisma migrate dev

3. Start the app:
    ```bash
    npm run dev

    After that, the server will be available at http://localhost:3000, unless you specified another port in the environment variables.

## RUNNING IN DOCKER

1. To run the project in Docker:
2. Make sure your environment variables are configured in the `task_manager/docker-compose.yml` file.

3. Run the command:
    ```bash
    docker-compose up -d 

Docker containers for MySQL, Redis, and Task Manager will be created and started.  
Database migrations will be applied automatically when the container starts.  
After the containers are running, the application will be available on the port specified in the `task-manager-container` Docker container.

## RUNNING TESTS

To run tests, use the following command: 
    ```bash
    npm run test


