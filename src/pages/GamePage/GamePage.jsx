import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import GameTimer from '../../components/GameTimer/GameTimer';
import './GamePage.css'

const GamePage = (props) => {
    let lastGuess = props.guesses.length - 1;
    let winTries = props.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
    let headFootStyle = {
        height: 50,
        padding: 10,
        margin: '15px 0',
        color: 'grey',
        fontSize: 18,
        textAlign: 'center'
      };

    return (
        <div className="GamePage">
            <div className="GamePage-game">
                <GameBoard
                    guesses={props.guesses}
                    colors={props.colors}
                    handlePegClick={props.handlePegClick}
                    handleScoreClick={props.handleScoreClick}
                />
            
                <div className="GamePage-controls">
                    <ColorPicker
                        handleColorSelection={props.handleColorSelection}
                        colors={props.colors}
                        selColorIdx={props.selColorIdx}
                    />
                    <GameTimer
                        elapsedTime={props.elapsedTime} 
                        isTiming={props.isTiming} 
                        handleTick={props.handleTick} 
                        interval={1000}
                    />
                    <Link className='btn btn-default' style={{margin: '0 10px'}} to='/settings'>Difficulty</Link>
                    <NewGameButton handleNewGameClick={props.handleNewGameClick} />
                </div>
            </div>
            <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
        </div>
    )
}

export default GamePage;