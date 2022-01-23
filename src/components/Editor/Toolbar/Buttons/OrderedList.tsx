import {useActive, useCommands} from "@remirror/react";
import React from "react";

const OrderedList = () => {
    const { toggleOrderedList, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleOrderedList();
                focus();
            }}>
            Ordered List
        </button>
    );
}

export default OrderedList