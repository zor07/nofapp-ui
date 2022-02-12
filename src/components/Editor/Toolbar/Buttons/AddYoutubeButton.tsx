import {useCommands} from "@remirror/react";
import React from "react";

const AddYoutubeButton = () => {
    const commands = useCommands();
    const handleClick = () => commands.addYouTubeVideo({ video: 'Zi7sRMcJT-o', startAt: 450 });
    return (
        <button className="remirror-role remirror-button remirror-tabbable"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleClick}>
            Add video
        </button>
    );
};

export default AddYoutubeButton