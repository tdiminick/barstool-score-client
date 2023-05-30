import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from './pages/Layout';
import Scoreboard from './pages/Scoreboard';
import Game from './pages/Game';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Scoreboard />} />
          <Route path="game/:game_id" element={<Game />} />
          <Route path="*" element={<Scoreboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
