import {useActive, useCommands} from "@remirror/react";
import {cx} from "remirror";
import React from "react";
import {H1, H2, H3, H4, H5, H6} from "../../icons/headingIcons"

const HeadingButtons = () => {
    const commands = useCommands();
    const active = useActive(true);
    const icons = [<H1/>, <H2/>, <H3/>, <H4/>, <H5/>, <H6/>]

    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <button key={level}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => commands.toggleHeading({ level })}
                        className={cx(active.heading({ level }) ? 'remirror-button-active' : '', 'remirror-button') }>
                    {icons[level-1]}
                </button>
            ))}
        </>
    )
}

export default HeadingButtons