import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogContentText, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {DialogComponent} from "./types";

const ViewDialog: DialogComponent = (props) => {

    const {startGame, dialogOpen, result, fieldSizeError, fieldSize, changeFieldSize } = props;

    return (
        <Dialog
            onClose={startGame}
            open={dialogOpen}
        >
            <DialogTitle>That's all folks!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div style={{color: 'green'}}>Player 1 got {result.score[0]} squares </div>
                    <div style={{color: 'red'}}>Player 2 got {result.score[1]} squares </div>
                    <br/>
                    <div>
                        {result.tie && <div>It's a tie! Try again to find out who's better</div>}
                        {!result.tie && <div><b>Congratulations! {result.win} wins!</b></div>}
                    </div>
                    <br/>
                    <TextField
                        margin="dense"
                        label="Field size"
                        type="number"
                        error={!!fieldSizeError.length}
                        value={fieldSize}
                        onChange={changeFieldSize}
                        helperText={fieldSizeError}
                        fullWidth
                        inputProps={{min: "2", max: "8", step: "1"}}
                    />
                    <Button onClick={startGame} color="primary">
                        Start over!
                    </Button>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ViewDialog;
