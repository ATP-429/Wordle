import React, {useState} from "react";
import './app.css';

class TileObject {
    value = '';
    status = 'none';

    constructor(value, status) {
        this.value = value;
        this.status = status;
    }
}

const Tile = (props) => {
    return <div className="tile" value={props.value} status={props.status}>{props.value}</div>
}

const Row = (props) => {
    const [row, setRow] = useState(props.row);
    
    return (
        <div className="row">
            {row.map((tile, i) => <Tile key={i} value={tile.value} status={tile.status}/>)}
        </div>
    );
}

const App = (props) => {
    const [grid, setGrid] = useState([...Array(props.guesses)].map(row => Array(props.length).fill(new TileObject('', 'none'))));
    const [index, setIndex] = useState(0);
    const [j, setJ] = useState(-1);
    const [over, setOver] = useState(false);

    React.useEffect(() => {
        if(index === props.guesses) {
            setOver(true);
        }
    }, [index, props.guesses])

    const inDictionary = (word) => {
        return true;
    }

    const checkWord = (word) => {
        if(word.length !== props.length)
            return false;
        return inDictionary(word);
    }

    const setValueAt = (i, j, value) => {
        let newGrid = grid;
        newGrid[index][j+1] = new TileObject(value, 'none');
        setGrid(newGrid);
    }

    const solve = (i) => {
        let newGrid = grid;
        let solved = true;
        for(let j = 0; j < props.length; j++) {
            if(grid[i][j].value === props.word[j]) {
                newGrid[i][j].status = 'correct';
            }
            else if(props.word.indexOf(grid[i][j].value) !== -1) {
                solved = false;
                newGrid[i][j].status = 'misplaced';
            }
            else {
                solved = false;
                newGrid[i][j].status = 'incorrect';
            }
        }
        if(solved) {
            setOver(true);
        }
        setGrid(newGrid);
    }

    const handleKeyDown = async (event) => {
        if(!over) {
            if(event.key >= 'a' && event.key <= 'z') {
                if(j < props.length-1) {
                    setValueAt(index, j, event.key.toUpperCase());

                    setJ(j+1);
                }
            }
            else if(event.key === 'Backspace') {
                if(j >= 0) {
                    setValueAt(index, j-1, '');

                    setJ(j-1);
                }
            }
            else if(event.key === 'Enter') {
                if(checkWord(grid[index].map(tile => tile.value).join(''))) {
                    solve(index);

                    setIndex(index+1);
                    setJ(-1);
                }
            }
        }
    }

    //We have to do tabIndex="0" to take keyboard inputs
    return (
        <div id="app" onKeyDown={handleKeyDown} tabIndex="0" autoFocus> 
            {[...Array(props.guesses)].map((row, i) => <Row key={i} row={grid[i]}></Row>)}
        </div>
    );
}

export default App