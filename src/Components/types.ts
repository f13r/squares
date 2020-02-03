import {ChangeEvent, FC} from "react";
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

export interface DialogProps {
    startGame: () => void;
    changeFieldSize: (evt: ChangeEvent<HTMLInputElement>) => void;
    dialogOpen: boolean;
    result: {
        tie: boolean;
        win: string;
        score: number[];
    };
    fieldSizeError: string;
    fieldSize: number;
}

export type DialogComponent = FC<DialogProps>;
