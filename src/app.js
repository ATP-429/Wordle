import React from "react";

const Tile = () => {

}

const Row = (props) => {
    const [row, setRow] = React.useState(props.row);

}

const App = (props) => {
    const [grid, setGrid] = React.useState();

    React.useEffect(() => {
        let arr = []
        for(let i = 0; i < props.length; i++) {
            let row = []
            for(let j = 0; j < props.guesses; j++)
                row.push(null);
            arr.push(row);
        }
        setGrid(arr);
    }, []);

    return grid.map(row => <Row row={row}></Row>);
}

export default App