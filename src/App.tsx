import React, {ChangeEvent, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ViewBoard from "./Components/ViewBoard";
import {calcResults, generateField, isGameFinished} from "./utils";
import {AppState, ChangeColor, Field, Player} from "./types";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
        field: {} as Field,
        fieldSize: 3,
        fieldSizeError: '',
        currentPlayer: Player.One,
        result: {
            tie: false,
            win: '',
            score: [0, 0],
        },
        dialogOpen: false,
    };

    initialState.field = generateField(initialState.fieldSize);

    const [state, setState ] = useState<AppState>(initialState);

    const changeColor: ChangeColor = (square, player) => () => {
        if (typeof square.owner === 'undefined') {
            square.owner = player;
            setState({
                ...state,
                currentPlayer: player === Player.One ? Player.Two : Player.One,
            });

            if (isGameFinished(state.field)) {
                const result = calcResults(state.field);

                setState({
                    ...state,
                    dialogOpen: true,
                    result
                })
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

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Squares
                </Typography>
                <ViewBoard field={state.field} currentPlayer={state.currentPlayer} changeColor={changeColor}/>
                <Dialog
                    onClose={startGame}
                    open={state.dialogOpen}
                >
                    <DialogTitle>That's all folks!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div style={{color: 'green'}}>Player 1 got {state.result.score[0]} squares </div>
                            <div style={{color: 'red'}}>Player 2 got {state.result.score[1]} squares </div>
                            <br/>
                            <div>
                                {state.result.tie && <div>It's a tie! Try again to find out who's better</div>}
                                {!state.result.tie && <div><b>Congratulations! {state.result.win} wins!</b></div>}
                            </div>
                            <br/>
                            <TextField
                                margin="dense"
                                label="Field size"
                                type="number"
                                error={!!state.fieldSizeError.length}
                                value={state.fieldSize}
                                onChange={changeFieldSize}
                                helperText={state.fieldSizeError}
                                fullWidth
                                inputProps={{min: "2", max: "8", step: "1"}}
                            />
                            <Button onClick={startGame} color="primary">
                                Start over!
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </Container>
    )
}
