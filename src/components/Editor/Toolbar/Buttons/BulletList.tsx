import {useActive, useCommands} from "@remirror/react";
import React from "react";

const BulletList = () => {
    const { toggleBulletList, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleBulletList();
                focus();
            }}>
            Bullet List
        </button>
    );
}

export default BulletList