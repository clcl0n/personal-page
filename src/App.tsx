import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameOfLifePage from './components/game-of-life-page';
import Home from './components/home';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/game_of_life">
          <GameOfLifePage />
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
