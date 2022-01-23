import {useActive, useCommands} from "@remirror/react";
import React from "react";

const Bold = () => {
    const { toggleBold, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleBold();
                focus();
            }}
            style={{ fontWeight: active.bold() ? 'bold' : undefined }}>
            B
        </button>
    );
}

export default Bold