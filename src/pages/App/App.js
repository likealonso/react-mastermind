import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
// Must import components used in the JSX
import GamePage from '../GamePage/GamePage';
// import SettingsPage from '../SettingsPage/SettingsPage'


let headFootStyle = {
  height: 50,
  padding: 10,
  margin: '15px 0',
  color: 'grey',
  fontSize: 18,
  textAlign: 'center'
};

let colors = ['blue', 'green', 'red', 'orange'];

class App extends Component {
  constructor(props) {
    super(props);
      this.state = this.getInitialState()
  }

  componentWillMount() {
    console.log('App: componentWillMount')
  }

  componentDidMount() {
    console.log('App: componentDidMount')
  }

  getInitialState = () => {
    return {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      elapsedTime: 0,
      finalTime: 0
      // this.handleColorSelection= this.handleColorSelection.bind(this)
    }
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],

      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(size).fill().map(dummy => Math.floor(Math.random() * size));
  }

  /*---------- Callback Methods ----------*/

  handleColorSelection = (colorIdx) =>  {
    let lastGuess = this.state.guesses.length - 1;
    console.log('lastGuess ' + lastGuess)
    console.log(this.state.guesses)
    console.log('this.state.guesses[lastGuess] ' + this.state.guesses[lastGuess])
    console.log(this.state.guesses[lastGuess].code)
    console.log(this.state.code)
    console.log('this.state.code.join() ' + this.state.code.join())
    console.log('this.state.colors ' + this.state.colors)
    console.log('this.state.selColorIdx ' + this.state.selColorIdx)
    this.setState({selColorIdx: colorIdx})
  }

  handleNewGameClick = () => {
    this.setState(this.getInitialState())
  }

  handlePegClick = (pegIdx) => {
    let currentGuessIdx = this.state.guesses.length - 1;

  // Replacing objects/arrays with NEW versions
    let guessesCopy = [...this.state.guesses];
    let codeArrCopy = [...guessesCopy[currentGuessIdx].code];

  // Update new array
    codeArrCopy[pegIdx] = this.state.selColorIdx;

  // Update new guesses array
    guessesCopy[currentGuessIdx].code = codeArrCopy;

  // Update state with new guesses array
    this.setState({
      guesses: guessesCopy
    });
  }

  handleScoreClick = () => {
    let currentGuessIdx = this.state.guesses.length - 1;
  
  // Computing the score will modify the guessed code and the
  // secret code, therefore create copies of the originals
    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code]
    let secretCodeCopy = [...this.state.code]

    let perfect = 0, almost = 0;

  // First pass computes number of "perfect"
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        //ensure it doesn't match again
        guessCodeCopy[idx] = secretCodeCopy[idx] = null
      }
    });

    // Second pass computer number of "almost"
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

    // State must only be update with new objects/arrays
    let guessesCopy = [...this.state.guesses];

    // Set scores
    guessesCopy[currentGuessIdx].score.perfect = perfect;
    guessesCopy[currentGuessIdx].score.almost = almost;

    // Add new guess if not a winner
    if (perfect !== 4) guessesCopy.push(this.getNewGuess())

    // Finally, update state with new guesses array
    this.setState((prevState) => ({
      guesses: guessesCopy,
      finalTime: (perfect === 4) ? prevState.elapsedTime : 0 
    }));
    console.log('You win')
  }

  handleTick = () => {
    this.setState((prevState) => ({
      elapsedTime: ++prevState.elapsedTime
    }))
  }

  render() {
    console.log('render')
    
    return (
      <div className="App">
        <header style={headFootStyle}>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
        <div className="App-game">
          <BrowserRouter>
            <Switch>
              <Route exact path= '/' render={() =>
                <GamePage
                  colors={this.state.colors}
                  selColorIdx={this.state.selColorIdx}
                  guesses={this.state.guesses}
                  handleColorSelection={this.handleColorSelection}
                  handleNewGameClick={this.handleNewGameClick}
                  handlePegClick={this.handlePegClick}
                  handleScoreClick={this.handleScoreClick}
                  elapsedTime={this.state.elapsedTime}
                  isTiming={!this.state.finalTime}
                  handleTick={this.handleTick}
                  interval={1000}
                />}
              />
              {/* <Route exact path= '/settings' render={() =>
                <SettingsPage
                  colorTable={colorTable}
                  difficultyLevel={this.state.difficultyLevel}
                  handleDifficultyChange={this.setDifficulty}
                  handleNewGame={this.handleNewGameClick}
                />}
              /> */}
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;