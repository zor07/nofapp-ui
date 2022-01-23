import {useHelpers} from "@remirror/react";
import React, {useCallback} from "react";

const SaveButton = ({ state }) => {
    const { getJSON } = useHelpers();

    const handleClick = useCallback(
        ({ state }) => {
            console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

            return true; // Prevents any further key handlers from being run.
        },
        [getJSON]
    );

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={handleClick}>Save</button>;
};
export default SaveButton