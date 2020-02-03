import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogContentText, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogComponent} from "../types";

const Modal: DialogComponent = (props) => {

    const {startGame, dialogOpen, content, title, newGameForm } = props;

    return (
        <Dialog
            onClose={startGame}
            open={dialogOpen}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                    <br/>
                    {newGameForm}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
