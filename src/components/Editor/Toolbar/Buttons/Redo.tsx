import {useCommands} from "@remirror/react";
import React from "react";

const Redo = () => {
    const actions = useCommands();
    const redo = () => {
        actions.redo()
    };

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={redo}>Redo</button>;
}
export default Redo