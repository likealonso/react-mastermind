
import React from 'react';
import GuessPeg from '../GuessPeg/GuessPeg';
import './GuessPegs.css';

const GuessPegs = (props) => {
  
  return (
    <div className="GuessPegs">
      <GuessPeg 
        handlePegClick={() =>props.handlePegClick(0)} 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[0]]} 
      />
      <GuessPeg 
        handlePegClick={() =>props.handlePegClick(1)} 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[1]]}
      />
      <GuessPeg 
        handlePegClick={() =>props.handlePegClick(2)} 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[2]]} 
      />
      <GuessPeg 
        handlePegClick={() =>props.handlePegClick(3)} 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[3]]} 
      />
    </div>
  );
}

export default GuessPegs;