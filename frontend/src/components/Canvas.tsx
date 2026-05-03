import React, { useRef, useCallback, useEffect } from 'react';
import { Drawing } from '../types';
import { throttle } from '../utils/canvas';

interface CanvasProps {
  drawings: Drawing[];
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  isDrawing: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  drawings,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  isDrawing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawings.forEach((drawing) => {
          ctx.beginPath();
          ctx.arc(drawing.x, drawing.y, drawing.size / 2, 0, 2 * Math.PI);
          ctx.fillStyle = drawing.color;
          ctx.fill();
        });
      }
    }
  }, [drawings]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        onMouseDown={onMouseDown}
        onMouseMove={throttle(onMouseMove, 16)}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={isDrawing ? 'drawing' : ''}
      />
    </div>
  );
};

export default Canvas;
