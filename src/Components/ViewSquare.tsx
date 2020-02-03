import React, {FC} from "react";
import {ChangeColor, Player, Square} from "../types";

export interface Props {
    square: Square;
    // changeColor: ChangeColor;
    // currentPlayer: Player;
}

export type Component = FC<Props>;

const ViewSquare: Component = ({square}) => {

    let color = 'grey';

    switch (square.owner) {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'green';
            break;
        default:
            break;
    }

    return (
        <div className="square" style={{backgroundColor: color}}/>
    );
};

export default ViewSquare;
