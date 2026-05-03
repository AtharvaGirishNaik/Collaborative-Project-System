import React, { useState, useCallback, useEffect } from 'react';
import Login from './components/Login';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import CollabSocket from './services/socket';
import { Drawing } from './types';
import './App.css';

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentSize, setCurrentSize] = useState(5);
  const [socket, setSocket] = useState<CollabSocket | null>(null);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    const drawing: Drawing = {
      x: pos.x,
      y: pos.y,
      color: currentColor,
      size: currentSize,
    };
    setDrawings((prev) => [...prev, drawing]);
    socket?.emitDrawing(drawing);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    const drawing: Drawing = {
      x: pos.x,
      y: pos.y,
      color: currentColor,
      size: currentSize,
    };
    setDrawings((prev) => [...prev, drawing]);
    socket?.emitDrawing(drawing);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setDrawings([]);
    socket?.emitClear();
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    const newSocket = new CollabSocket();
    newSocket.connect({ token: newToken });
    
    newSocket.onDrawing((drawing: Drawing) => {
      setDrawings((prev) => [...prev, drawing]);
    });
    
    setSocket(newSocket);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    socket?.disconnect();
    setSocket(null);
    setDrawings([]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎨 Collaborative Whiteboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <Toolbar
        color={currentColor}
        size={currentSize}
        onColorChange={setCurrentColor}
        onSizeChange={setCurrentSize}
        onClear={handleClear}
      />
      
      <Canvas
        drawings={drawings}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        isDrawing={isDrawing}
      />
      
      <footer>🟢 {drawings.length} drawings | 🔴 {socket ? 'Connected' : 'Disconnected'}</footer>
    </div>
  );
};

export default App;
