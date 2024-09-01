require('dotenv').config();
const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function checkDatabase() {
  try {
    // Connect to the database
    await client.connect();

    // Run a simple query to check the connection
    const res = await client.query('SELECT NOW()');
    console.log('Database connected successfully. Current timestamp:', res.rows[0].now);

    // Optionally, you can run additional queries here to check the data
    // const result = await client.query('SELECT * FROM your_table_name LIMIT 1');
    // console.log('Sample data:', result.rows);

  } catch (err) {
    console.error('Database connection failed:', err.stack);
  } finally {
    // Close the connection
    await client.end();
  }
}

checkDatabase();
