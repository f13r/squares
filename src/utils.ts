import {CheckSquare, Field, FindSiblingSquareToCheck, GenerateField, IsVisited, Square} from "./types";

export const generateField: GenerateField = (size): Field => {
    const field: Field = [];

    let id = 0;
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            const square: Square = { id };
            row.push(square);
            id++;

        }
        field.push(row);
    }

    return field;
};

export const isGameFinished = (field: Field) => {
    let gameIsFinished = true;

    field.forEach(row => {
        row.forEach(square => {
            if (typeof square.owner === 'undefined') {
                gameIsFinished = false;
                return false;
            }
        });
    });

    return gameIsFinished;
};

const findSiblingSquareToCheck: FindSiblingSquareToCheck = (field, row, column, owner ) => {
    const squares = [];

    if (field[row] && field[row][column]) {
        if (field[row][column].owner === owner) {
            squares.push(
                {
                    row,
                    column: column,
                }
            )
        }
    }

    if (field[row] && field[row][column - 1]) {
        if (field[row][column - 1].owner === owner) {
            squares.push(
                {
                    row,
                    column: column - 1,
                }
            )
        }
    }

    if (field[row] && field[row][column + 1]) {
        if (field[row][column + 1].owner === owner) {
            squares.push(
                {
                    row,
                    column: column + 1,
                }
            )
        }
    }
    if (field[row - 1] && field[row - 1][column]) {
        if (field[row - 1][column].owner === owner) {
            squares.push(
                {
                    row: row - 1,
                    column,
                }
            )
        }
    }
    if (field[row + 1] && field[row + 1][column]) {
        if (field[row + 1][column].owner === owner) {
            squares.push(
                {
                    row: row + 1,
                    column,
                }
            )
        }
    }

    return squares;
};


const checkSquare: CheckSquare = (field, row, column, owner, visited= []) => {

    const isVisited: IsVisited = (row, column) => {
        if (visited.length) {
            return !!visited.filter(visitedSquare => {
                return visitedSquare.row === row && visitedSquare.column === column;
            }).length;
        }
        return false;
    };

    const existedSiblings = findSiblingSquareToCheck(field, row, column, owner);

    existedSiblings.forEach(existedSibling => {
        const { row, column } = existedSibling;
        if (!isVisited(row, column)) {
            visited.push(existedSibling);
            checkSquare(field, row, column, owner, visited);
        }
    });

    return visited.length;
};

export const calcResults = (field: Field) => {

    const score = [0, 0];

    field.forEach((row, rowKey) => {
        row.forEach((column, columnKey) => {
            if (typeof column.owner !== 'undefined') {
                const distance = checkSquare(field, rowKey, columnKey, column.owner);
                if (distance > score[column.owner]) {
                    score[column.owner] = distance;
                }
            }
        });
    });

    const [player1score, player2score] = score;

    let win = '';
    let tie = false;

    if (player2score === player1score) {
        tie = true;
    }

    if (!tie) {
        win = player1score > player2score ? 'Player 1' : 'Player 2';
    }

    return {
        win,
        tie,
        score
    }
};
