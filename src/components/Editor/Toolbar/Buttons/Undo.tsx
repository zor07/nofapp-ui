import {useCommands} from "@remirror/react";
import React from "react";

const Undo = () => {
    const actions = useCommands();
    const undo = () => {
        actions.undo()
    };

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={undo}>Undo</button>;
}

export default Undo

