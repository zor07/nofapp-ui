import {useCommands, useEditorState, useRemirrorContext} from "@remirror/react";
import React from "react";
import {cx, ProsemirrorNode} from "remirror";
import {EditorState} from "@remirror/pm";

const AlignButtons = () => {
    const {leftAlign, centerAlign, rightAlign, focus} = useCommands();
    const state = useEditorState();
    const {manager} = useRemirrorContext();

    const gatheredNodes = gatherNodes(
        state,
        manager.store.nodeTags.formattingNode
    );
    const node = gatheredNodes[gatheredNodes.length - 1];

    return (
        <>
            <button className={cx(node?.attrs.nodeTextAlignment === "left" ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable')}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                        leftAlign();
                        focus();
                    }}>
                Left
            </button>
            <button className={cx(node?.attrs.nodeTextAlignment === "center" ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable')}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                        centerAlign();
                        focus();
                    }}>
                Center
            </button>
            <button className={cx(node?.attrs.nodeTextAlignment === "right" ? 'remirror-button-active' : '', 'remirror-role remirror-button remirror-tabbable')}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                        rightAlign();
                        focus();
                    }}>
                Right
            </button>
        </>
    );
}

function gatherNodes(
    state: EditorState,
    included: string[]
): ProsemirrorNode[] {
    const gatheredNodes: ProsemirrorNode[] = [];

    // Gather the nodes to indent.
    state.doc.nodesBetween(state.selection.from, state.selection.to, (node) => {
        if (included.includes(node.type.name)) {
            gatheredNodes.push(node);
        }
    });

    return gatheredNodes;
}

export default AlignButtons