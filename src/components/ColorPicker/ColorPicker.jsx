import React from 'react';
import './ColorPicker.css';

const ColorPicker = (props) => {

  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          className="ColorPicker-color"
          style={{backgroundColor: color}}
          key={color}
          onClick={() => alert('clicked')}
        />
      )}
    </div>
  );
}

export default ColorPicker