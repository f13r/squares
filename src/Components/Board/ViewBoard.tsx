import React, {FC} from 'react';

import {Grid} from "@material-ui/core";
import {ChangeColor, Field, Player} from "../../types";
import ViewSquare from "./ViewSquare";


export interface Props {
    field: Field;
    currentPlayer: Player;
    changeColor: ChangeColor;
}

export type Component = FC<Props>;

const ViewBoard: Component = (props) => {

    const { field, currentPlayer, changeColor } = props;

    return (
        <>
            <Grid container style={{padding: '15px 0 15px 0'}} justify="center" spacing={10}>
                <Grid item>
                    <div style={{color: "green"}}>Player 1</div>
                </Grid>
                <Grid item>
                    <div style={{color: "red"}}>Player 2</div>
                </Grid>
            </Grid>
            {
                field.map((rows, index) => {
                    return (
                        <Grid key={index} container justify="center" spacing={1}>
                            {
                                rows.map((square, index) => {
                                    return (
                                        <ViewSquare key={index} square={square} currentPlayer={currentPlayer} changeColor={changeColor}/>
                                    );
                                })
                            }
                        </Grid>
                    )
                })
            }
        </>
    );
};

export default ViewBoard;
