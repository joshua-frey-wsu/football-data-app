const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to initialize the database
const initializeDatabase = async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS premier_league_teams (
        team_name VARCHAR(255) PRIMARY KEY
      );
    `;
  
    const insertQuery = `
      INSERT INTO premier_league_teams (team_name) 
      VALUES ($1) 
      ON CONFLICT (team_name) DO NOTHING;
    `;
  
    try {
      // Create the table
      await pool.query(createTableQuery);
  
      // Insert the Premier League teams into the table
      const teams = [
        'Arsenal',
        'Aston Villa',
        'Bournemouth',
        'Brentford',
        'Brighton & Hove Albion',
        'Burnley',
        'Chelsea',
        'Crystal Palace',
        'Everton',
        'Fulham',
        'Liverpool',
        'Luton Town',
        'Manchester City',
        'Manchester United',
        'Newcastle United',
        'Nottingham Forest',
        'Sheffield United',
        'Tottenham Hotspur',
        'West Ham United',
        'Wolverhampton Wanderers'
      ];
  
      // Insert each team individually
      for (const team of teams) {
        await pool.query(insertQuery, [team]);
      }
  
      console.log('Database initialized with Premier League teams.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };
  
  // Initialize the database
  initializeDatabase();

  app.get('/api/matches', async (req, res) => {
    try {
      const response = await axios.get('https://api.football-data.org/v4/competitions/PL/matches', {
        headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  });
  
  // REST API to fetch all Premier League teams
  app.get('/api/teams', async (req, res) => {
    try {
      // Query to fetch all teams from the 'premier_league_teams' table
      const query = 'SELECT * FROM premier_league_teams';
      const result = await pool.query(query);
  
      // Respond with the fetched teams
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).send('Error fetching teams from the database.');
    }
  });

app.listen(3010, () => {
    console.log('Server started on port 3010');
});