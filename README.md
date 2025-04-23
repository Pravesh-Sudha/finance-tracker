# Minimalist Finance Tracker

A simple, Dockerized web application for tracking personal finances, built with a React frontend, Node.js backend, and MongoDB database. The app allows users to manage transactions (income and expenses), set financial goals, and visualize spending and income through pie charts.

## Features

- **Transaction Management**: Add, view, and categorize transactions (income or expense) with details like amount, category, description, and notes.
- **Financial Goals**: Set savings goals with target amounts and dates, track progress, and add funds to goals.
- **Visualizations**:
  - Pie chart for expenses by category (e.g., Food, Bills).
  - Pie chart for income by category (e.g., Salary, Freelance).
  - Total income and total expense displayed below charts.
- **Dockerized Setup**: Run the entire application (frontend, backend, MongoDB) with a single `docker-compose` command.
- **Responsive UI**: Clean, minimalist interface built with React and Chart.js.

## Tech Stack

- **Frontend**: React, Chart.js, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **Other**: http-proxy-middleware (for API proxying in production)

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Pravesh-Sudha/finance-tracker.git
   cd finance-tracker
   ```

2. **Start the Application**:
   Run the following command to build and start the frontend, backend, and MongoDB containers:
   ```bash
   docker-compose up --build
   ```
   - The frontend will be available at `http://localhost:3000`.
   - The backend API runs at `http://localhost:5000`.
   - MongoDB runs at `localhost:27017`.

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

4. **Stop the Application**:
   To stop the containers:
   ```bash
   docker-compose down
   ```
   To remove containers and volumes (reset database):
   ```bash
   docker-compose down -v
   ```

## Usage

1. **Dashboard**:
   - View pie charts for expenses and income by category.
   - See total income and total expense.
   - Track progress on financial goals with progress bars.
   - Add funds to goals directly from the dashboard.

2. **Add Transactions**:
   - Navigate to "Add Transaction" to log income or expenses.
   - Specify type (income/expense), category, amount, description, and optional notes.

3. **Set Goals**:
   - Go to "Add Goal" to create a savings goal.
   - Provide a name, target amount, target date, and optional description.

4. **Example Data**:
   - Add an expense: Type: Expense, Category: Food, Amount: $10, Description: Lunch.
   - Add an income: Type: Income, Category: Salary, Amount: $1000, Description: Monthly salary.
   - Add a goal: Name: Laptop, Target Amount: $1000, Target Date: 2025-12-31.

## Project Structure

```
finance-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js    # Main dashboard with pie charts and goals
│   │   │   ├── TransactionForm.js
│   │   │   ├── GoalForm.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── server.js           # Custom server for proxying API requests
│   ├── Dockerfile
│   ├── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   │   ├── finance.js      # API routes for transactions and goals
│   ├── models/
│   │   ├── Transaction.js
│   │   ├── Goal.js
│   ├── server.js           # Express server
│   ├── Dockerfile
│   ├── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md
```

## API Endpoints

- **GET /api/transactions**: Fetch all transactions.
- **POST /api/transactions**: Create a new transaction.
- **GET /api/goals**: Fetch all goals.
- **POST /api/goals**: Create a new goal.
- **PUT /api/goals/:id**: Update a goal's current amount.
- **GET /health**: Health check endpoint.

## Troubleshooting

- **Frontend not loading data**:
  - Check console logs in browser developer tools.
  - Ensure backend is running (`curl http://localhost:5000/api/health` should return `{"status":"OK"}`).
  - Verify proxy setup in `client/server.js` and `client/package.json`.
- **Docker issues**:
  - Run `docker-compose logs backend` and `docker-compose logs frontend` for errors.
  - Clear Docker state: `docker-compose down -v && docker system prune -f`.
- **Charts not rendering**:
  - Ensure transactions have valid `amount` fields (check `curl http://localhost:5000/api/transactions`).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please include tests and update documentation as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, contact [Pravesh Sudha](https://github.com/Pravesh-Sudha) or open an issue on the repository.