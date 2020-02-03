export interface AppState {
    field: Field;
    fieldSize: number;
    fieldSizeError: string;
    currentPlayer: Player;
    result: {
        tie: boolean;
        win: string;
        score: number[];
    };
    dialogOpen: boolean;
}

export interface Row extends Array<Square> {}
export interface Field extends Array<Row> {}

export enum Player {
    One,
    Two,
}

export interface Square {
    id: number;
    owner?: Player;
}
export interface SquarePosition {
    row: number;
    column: number;
}

export type GenerateField = (size: number) => Field;

export type FindSiblingSquareToCheck = (field: Field, row: number, column: number, owner: Player) => Array<SquarePosition>;

export type CheckSquare = (field: Field, row: number, column: number, owner: Player, visited?: Array<SquarePosition>) => number;

export type IsVisited = (row: number, column: number) => boolean;

export type ChangeColor = (square: Square, player: Player) => () => void;
