import React, {ChangeEvent, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ViewBoard from "./Components/ViewBoard";
import {calcResults, generateField, isGameFinished} from "./utils";
import {AppState, ChangeColor, Player} from "./types";
import Modal from "./Components/Dialog/Modal";
import ViewNewGameForm from "./Components/ViewNewGameForm";
import Content from "./Components/Dialog/Content";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function App() {

    const initialState = {
        fieldSize: 3,
        fieldSizeError: '',
        currentPlayer: Player.One,
        result: {
            tie: false,
            win: '',
            score: [0, 0],
        },
        dialogOpen: true,
        isNewGame: true,
    };

    const [state, setState ] = useState<AppState>(initialState);

    const changeColor: ChangeColor = (square, player) => () => {
        if (typeof square.owner === 'undefined') {
            square.owner = player;
            setState({
                ...state,
                currentPlayer: player === Player.One ? Player.Two : Player.One,
            });

            if (state.field) {
                if (isGameFinished(state.field)) {
                    const result = calcResults(state.field);

                    setState({
                        ...state,
                        dialogOpen: true,
                        isNewGame: false,
                        result,
                    })
                }
            }
        }
    };

    const startGame = () => {
        setState({
            ...state,
            dialogOpen: false,
            currentPlayer: Player.One,
            field: generateField(state.fieldSize),
        })
    };

    const changeFieldSize = (event: ChangeEvent<HTMLInputElement>) => {
        const fieldSize = Number(event.target.value);
        if (fieldSize < 2 || fieldSize > 8) {
            setState({
                ...state,
                fieldSizeError: 'Field size has to be between 2 and 8'
            });
        } else {
            setState({
                ...state,
                fieldSize
           });
        }
    };

    const classes = useStyles();

    const { result, dialogOpen, fieldSizeError, fieldSize, isNewGame, field, currentPlayer } = state;

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                {
                    field &&
                    <>
                        <Typography component="h1" variant="h5">
                            Squares
                        </Typography>
                        <ViewBoard
                            field={field}
                            currentPlayer={currentPlayer}
                            changeColor={changeColor}
                        />
                    </>
                }
                <Modal
                    title={ !isNewGame ? 'That\'s all folks!' : 'New game' }
                    dialogOpen={dialogOpen}
                    startGame={startGame}
                    content={
                        <Content
                            isNewGame={isNewGame}
                            result={result}
                        />
                    }
                    newGameForm={
                        <ViewNewGameForm
                            startGame={startGame}
                            changeFieldSize={changeFieldSize}
                            fieldSizeError={fieldSizeError}
                            fieldSize={fieldSize}
                        />
                    }
                >
                </Modal>
            </div>
        </Container>
    )
}
