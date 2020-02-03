import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SquareComponent} from "./types";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ViewSquare: SquareComponent = (props) => {

    const classes = useStyles();

    const { square, currentPlayer, changeColor } = props;

    let color = 'grey';

    switch (square.owner) {
        case 0:
            color = 'green';
            break;
        case 1:
            color = 'red';
            break;
        default:
            break;
    }

    return (
        <Grid item>
            <Paper className={classes.paper} onClick={changeColor(square, currentPlayer)} style={{backgroundColor: color}}/>
        </Grid>
    )
};

export default ViewSquare;
