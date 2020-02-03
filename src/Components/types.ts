import {FC} from "react";
import {ChangeColor, Field, Player, Square} from "../types";

export interface BoardProps {
    field: Field;
    currentPlayer: Player;
    changeColor: ChangeColor;
}

export type BoardComponent = FC<BoardProps>;


export interface SquareProps {
    square: Square;
    currentPlayer: Player;
    changeColor: ChangeColor;
}

export type SquareComponent = FC<SquareProps>;
