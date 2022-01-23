import {useActive, useCommands} from "@remirror/react";
import {cx} from "remirror";
import React from "react";

const HeadingButtons = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                    key={level}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.toggleHeading({ level })}
                    className={cx(active.heading({ level }) ? 'remirror-button-active' : 'remirror-button') + ' remirror-role remirror-tabbable'}
                >
                    H{level}
                </button>
            ))}
        </>
    )
}

export default HeadingButtons