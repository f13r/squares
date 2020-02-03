import React from "react";
import TextField from "@material-ui/core/TextField";
import {DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {NewGameComponent} from "./types";

const ViewNewGameForm: NewGameComponent = (props) => {

    const {fieldSizeError, fieldSize, changeFieldSize, startGame} = props;

    return (
        <>
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
            <DialogActions>
                <Button onClick={startGame} color="primary">
                    Start!
                </Button>
            </DialogActions>
        </>
    )
};

export default ViewNewGameForm;
