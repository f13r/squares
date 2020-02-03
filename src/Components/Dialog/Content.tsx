import React from "react";
import {ContentComponent} from "../types";

const Content: ContentComponent = (props) => {

    const {isNewGame, result} = props;

    return isNewGame ?
        <>
            Choose the size of field:
        </>
        :
        <>
            <div style={{color: 'green'}}>Player 1 got {result.score[0]} squares </div>
            <div style={{color: 'red'}}>Player 2 got {result.score[1]} squares </div>
            <br/>
            <div>
                {result.tie && <div>It's a tie! Try again to find out who's better!</div>}
                {!result.tie && <div><b>Congratulations! {result.win} wins!</b></div>}
            </div>
        </>;
};

export default Content;
