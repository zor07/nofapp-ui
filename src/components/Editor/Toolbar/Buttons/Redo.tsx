import {useCommands} from "@remirror/react";
import React from "react";

const Redo = () => {
    const actions = useCommands();
    const redo = () => {
        actions.redo()
    };

    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onClick={redo}>
            <svg stroke="currentColor"
                 fill="currentColor"
                 stroke-width="0"
                 name="arrowGoForwardFill"
                 height="1em"
                 width="1em"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M16 7h-5a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h5V1l6 5-6 5V7z"/>
            </svg>
        </button>
    )
}
export default Redo