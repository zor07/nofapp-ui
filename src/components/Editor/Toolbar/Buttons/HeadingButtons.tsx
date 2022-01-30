import {useActive, useCommands} from "@remirror/react";
import {cx} from "remirror";
import React from "react";
import h1 from "../../../assets/images/toolbar/h1.svg"
import h2 from "../../../assets/images/toolbar/h2.svg"
import h3 from "../../../assets/images/toolbar/h3.svg"
import h4 from "../../../assets/images/toolbar/h4.svg"
import h5 from "../../../assets/images/toolbar/h5.svg"
import h6 from "../../../assets/images/toolbar/h6.svg"

const HeadingButtons = () => {
    const commands = useCommands();
    const active = useActive(true);

    const icons = [h1, h2, h3, h4, h5, h6]

    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <button key={level}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => commands.toggleHeading({ level })}
                        className={cx(active.heading({ level }) ? 'remirror-button-active' : '', 'remirror-button') }>
                    {/*{icons[level-1]}*/}
                    <img alt={''} src={icons[level-1]}/>
                </button>
            ))}
        </>
    )
}

export default HeadingButtons