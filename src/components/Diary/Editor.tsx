import React from "react";
import "remirror/styles/all.css";

import { BoldExtension, ItalicExtension, HeadingExtension } from "remirror/extensions";
import {
    Remirror,
    useRemirror,
    EditorComponent,
    useHelpers,
    useKeymap, useCommands, useActive
} from "@remirror/react";

import { useState, useCallback, useEffect } from "react";
import {cx} from "remirror";

// Hooks can be added to the context without the need for creating custom components
const hooks = [
    () => {
        const { getJSON } = useHelpers();

        const handleSaveShortcut = useCallback(
            ({ state }) => {
                console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON]
        );

        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap("Mod-s", handleSaveShortcut);
    }
];

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
    );
};

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

export const Redo = () => {
    const actions = useCommands();
    const redo = () => {
        actions.redo()
    };

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={redo}>Redo</button>;
}

export const Undo = () => {
    const actions = useCommands();
    const undo = () => {
        actions.undo()
    };

    return <button
        className="remirror-role remirror-button remirror-tabbable"
        onClick={undo}>Undo</button>;
}

export const Bold = () => {
    const { toggleBold, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleBold();
                focus();
            }}
            style={{ fontWeight: active.bold() ? 'bold' : undefined }}
        >
            B
        </button>
    );
};

export const Italic = () => {
    const { toggleItalic, focus } = useCommands();
    const active = useActive();

    return (
        <button
            className="remirror-role remirror-button remirror-tabbable"
            onClick={() => {
                toggleItalic();
                focus();
            }}
            style={{ fontStyle: active.italic() ? 'italic' : undefined }}
        >
            I
        </button>
    );
};

const initialContent = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [{ type: "text", text: "This is a sample text" }]
        }
    ]
};

const Editor = () => {
    const [saveText, setSaveText] = useState("");
    // const { getJSON } = useHelpers();

    const { manager, state, setState } = useRemirror({
        extensions: () => [new BoldExtension({}), new ItalicExtension(), new HeadingExtension({})],
        // Set the initial content.
        content: {
            type: "doc",
            content: []
        },

        // Place the cursor at the start of the document. This can also be set to
        // `end`, `all` or a numbered position.
        selection: "start",

        // Set the string handler which means the content provided will be
        // automatically handled as html.
        // `markdown` is also available when the `MarkdownExtension`
        // is added to the editor.
        stringHandler: "html"
    });

    useEffect(() => {
        // make api request and get initial data then set content
        manager.view.updateState(manager.createState({ content: initialContent }));
    }, [manager]);

    const handleSaveText = (text) => {
        setSaveText(text);
    };

    return (
        <div className="remirror-theme">
            <h2>Start editing to see some magic happen!</h2>
            {saveText.length > 0 && <p>{saveText}</p>}
            <div className="remirror-theme">
                {/* the className is used to define css variables necessary for the editor */}
                <Remirror
                    manager={manager}
                    initialContent={state}
                    hooks={hooks}
                    onChange={(parameter) => {
                        // Update the state to the latest value.
                        setState(parameter.state);
                    }}
                >
                    <div className="remirror-role remirror-toolbar">
                        <div className="remirror-role remirror-group">
                            <Undo/>
                            <Redo/>
                        </div>
                        <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
                        <div className="remirror-role remirror-group">
                            <HeadingButtons />
                        </div>
                        <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
                        <div className="remirror-role remirror-group">
                            <Bold/>
                            <Italic/>
                        </div>


                    </div>
                    <div className="remirror-editor remirror-a11y-dark">
                        <EditorComponent/>
                    </div>

                    <SaveButton state={state} />
                </Remirror>
            </div>
        </div>
    );
}

export default Editor
