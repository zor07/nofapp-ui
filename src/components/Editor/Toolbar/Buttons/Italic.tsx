import {useActive, useCommands} from "@remirror/react";
import React from "react";

const Italic = () => {
    const { toggleItalic, focus } = useCommands();
    const active = useActive();

    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onClick={() => {
                    toggleItalic();
                    focus();
                }}
                style={{ fontStyle: active.italic() ? 'italic' : undefined }}>
            I
        </button>
    );
};

export default Italic