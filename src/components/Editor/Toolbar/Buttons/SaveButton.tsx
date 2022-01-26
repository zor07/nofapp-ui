import {useHelpers} from "@remirror/react";
import React, {useCallback} from "react";
import {EditorState} from "@remirror/pm";
import {RemirrorJSON} from "remirror";


type SaveButtonPropsType = {
    state: EditorState
    saveContent: (content: RemirrorJSON) => void
}

const SaveButton: React.FC<SaveButtonPropsType> = ({ state, saveContent }) => {
    const { getJSON } = useHelpers();

    const handleClick = useCallback(
        ({ state }) => {
            console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);
            saveContent(getJSON(state))

            return true; // Prevents any further key handlers from being run.
        },
        [getJSON]
    );

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={handleClick}>Save</button>;
};
export default SaveButton