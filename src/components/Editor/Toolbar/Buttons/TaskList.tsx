import {useActive, useCommands} from "@remirror/react";
import React from "react";

const TaskList = () => {
    const { toggleTaskList, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleTaskList();
                focus();
            }}>
            Task List
        </button>
    );
}

export default TaskList