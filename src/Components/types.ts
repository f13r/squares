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
    dialogOpen: boolean;
    title: string;
    content: JSX.Element;
    newGameForm: JSX.Element;
}

export type DialogComponent = FC<DialogProps>;

export interface NewGameFormProps {
    startGame: () => void;
    changeFieldSize: (evt: ChangeEvent<HTMLInputElement>) => void;
    fieldSizeError: string;
    fieldSize: number;
}

export type NewGameComponent = FC<NewGameFormProps>;

export interface ContentProps {
    isNewGame: boolean;
    result: {
        tie: boolean;
        win: string;
        score: number[];
    };
}

export type ContentComponent = FC<ContentProps>;
