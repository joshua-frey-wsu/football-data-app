import './App.css';
import React, {useEffect, useState} from 'react';
import { NavBar } from './components/nav-bar';

export const HomePage = () => {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/matches`, {
      headers: {'x-api-key': process.env.REACT_APP_PERSONAL_API_KEY }
    })
    .then(res => res.json())
    .then(data => {
      console.log("Data received:", data);
      setMatches(data.matches);
    })
    .catch(console.error);
    }, []);

  return (
    <div>
      <NavBar />
      <table border="1">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Date</th>
            <th>Score</th>
            <th>Match Status</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{match.homeTeam.name}</td>
              <td>{match.awayTeam.name}</td>
              <td>{match.utcDate}</td>
              <td>{match.score.fullTime.home} - {match.score.fullTime.away}</td>
              <td>{match.status}</td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}
