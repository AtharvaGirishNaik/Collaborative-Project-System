import React, { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import './App.css';

interface User {
  id: string;
  username: string;
}

interface Drawing {
  x: number;
  y: number;
  color: string;
  size: number;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentSize, setCurrentSize] = useState(5);

  // Login
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password: 'password123'
      });
      setToken(response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Connect WebSocket
  useEffect(() => {
    if (token && isAuthenticated) {
      const newSocket = io('http://localhost:8080', {
        auth: { token }
      });
      
      newSocket.on('connect', () => {
        console.log('Connected to collaboration service');
        setSocket(newSocket);
      });

      newSocket.on('drawing', (drawing: Drawing) => {
        setDrawings(prev => [...prev, drawing]);
      });

      return () => newSocket.close();
    }
  }, [token, isAuthenticated]);

  // Drawing handlers
  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    const drawing: Drawing = { x: pos.x, y: pos.y, color: currentColor, size: currentSize };
    
    setDrawings(prev => [...prev, drawing]);
    socket?.emit('drawing', drawing);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    const drawing: Drawing = { x: pos.x, y: pos.y, color: currentColor, size: currentSize };
    
    setDrawings(prev => [...prev, drawing]);
    socket?.emit('drawing', drawing);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setDrawings([]);
    socket?.emit('clear');
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div className="login">
          <h2>Collaborative Whiteboard</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div className="collaboration">
          <div className="toolbar">
            <label>Color: <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} /></label>
            <label>Size: <input type="range" min="1" max="20" value={currentSize} onChange={(e) => setCurrentSize(Number(e.target.value))} /></label>
            <button onClick={clearCanvas}>Clear</button>
            <button onClick={() => {setIsAuthenticated(false); setToken('');}}>Logout</button>
          </div>
          <canvas
            width={1200}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ border: '1px solid #ccc', cursor: isDrawing ? 'crosshair' : 'default' }}
          />
          <svg width={1200} height={600} className="drawing-layer">
            {drawings.map((drawing, index) => (
              <circle
                key={index}
                cx={drawing.x}
                cy={drawing.y}
                r={drawing.size / 2}
                fill={drawing.color}
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default App;
