
# Birthday Reminder App

This project is a Node.js application built with Sequelize, aimed at sending birthday reminders via email to colleagues based on data stored in a MySQL database.

## Features

- Automatically checks for birthdays daily.
- Sends email reminders to colleagues about birthdays.
- Uses Express.js for handling HTTP requests.
- Integrates Sequelize for MySQL database management.
- Uses Nodemailer for sending email notifications.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MySQL Database

## Installation

1. **Clone the repository**

   ```
   git clone https://github.com/your-username/birthday-reminder-app.git
   cd birthday-reminder-app
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following:

   ```
   PORT=3000
   DATABASE_URL=mysql://username:password@localhost:3306/database_name
   ```

   Replace `username`, `password`, and `database_name` with your MySQL database credentials and database name.

4. **Run migrations**

   To create the necessary database tables, run:

```
   npx sequelize-cli db:migrate
```

5. **Start the server**

   Start the server:
```
   nodemon index.js
```
```
node index.js
```

   The server will run on `http://localhost:3000` by default.

## Usage

- Access the application in your browser or through HTTP requests to the defined routes.
- The application automatically checks for birthdays daily and sends email reminders to colleagues about upcoming birthdays.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Express.js
- Sequelize
- Nodemailer

## Contact

For any inquiries or suggestions, please contact [Anuj Mourya](mailto:mouryaanuj62@gmail.com.com).
```


