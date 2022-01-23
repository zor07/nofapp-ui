import {useActive, useCommands} from "@remirror/react";
import React from "react";

const Underline = () => {
    const { toggleUnderline, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleUnderline();
                focus();
            }}
            style={{ fontStyle: active.underline() ? 'underline' : undefined }}
        >
            U
        </button>
    );
}

export default Underline