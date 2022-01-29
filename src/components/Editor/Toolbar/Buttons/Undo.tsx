import {useCommands} from "@remirror/react";
import React from "react";

const Undo = () => {
    const actions = useCommands();
    const undo = () => {
        actions.undo()
    };

    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onClick={undo}>
            <svg stroke="currentColor"
                 fill="currentColor"
                 stroke-width="0"
                 name="arrowGoBackFill"
                 height="1em"
                 width="1em"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"/>
            </svg>
        </button>
    )
}

export default Undo

