import {useActive, useCommands} from "@remirror/react";
import React from "react";

const Strike = () => {
    const { toggleStrike, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleStrike();
                focus();
            }}>
            S
        </button>
    );
}

export default Strike