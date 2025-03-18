import { useState, useEffect } from 'react';
import L from 'leaflet';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import Weather from './components/Weather';

const App = () => {

  return (
    <div className="container py-4">
      <Map />
      <Weather /> 
    </div>
  );
};

export default App;
