import React, {FC} from "react";

export interface Props {}
export type Component = FC<Props>;

const ViewField: Component = (props) => {
    return (
        <div className="field">
            {props.children}
        </div>
    );
};

export default ViewField;
