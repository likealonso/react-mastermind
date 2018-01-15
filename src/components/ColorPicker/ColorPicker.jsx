import React from 'react';
import './ColorPicker.css';

const ColorPicker = (props) => {
  console.log(props.colors)
  console.log(props.selColorIdx)
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          className="ColorPicker-color"
          style={{backgroundColor: color}}
          key={color}
          onClick={() => props.handleColorSelection(idx)}
        />
      )}
    </div>
  );
}

export default ColorPicker