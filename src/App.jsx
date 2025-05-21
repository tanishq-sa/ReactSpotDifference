import React, { useState } from 'react';
import ConfigScreen from './components/ConfigScreen';
import { Game } from './components/Game';

export default function App() {
  const [gameConfig, setGameConfig] = useState(null);

  return gameConfig ? (
    <Game config={gameConfig} onConfigure={() => setGameConfig(null)} />
  ) : (
    <ConfigScreen onStart={setGameConfig} />
  );
}