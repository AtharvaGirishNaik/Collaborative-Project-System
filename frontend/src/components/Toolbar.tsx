import React from 'react';

interface ToolbarProps {
  color: string;
  size: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  size,
  onColorChange,
  onSizeChange,
  onClear,
}) => (
  <div className="toolbar">
    <div className="tool-group">
      <label>Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
    <div className="tool-group">
      <label>Size: {size}px</label>
      <input
        type="range"
        min="1"
        max="20"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      />
    </div>
    <button onClick={onClear} className="clear-btn">
      🗑️ Clear Canvas
    </button>
  </div>
);

export default Toolbar;
