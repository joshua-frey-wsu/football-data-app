import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage } from './home-page';
import { Profile } from './profile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
