import React from "react";
import {RemirrorJSON} from "remirror";
import {
    Callout,
    CodeBlock,
    createIFrameHandler, createLinkHandler,
    Doc,
    Heading, MarkMap,
    RemirrorRenderer,
    TextHandler
} from "@remirror/react-renderer";

type EditorStaticPropsType = {
    content: RemirrorJSON
}

const PracticeData: React.FC<EditorStaticPropsType> = ({content}) => {

    const typeMap: MarkMap = {
        blockquote: 'blockquote',
        bulletList: 'ul',
        taskList: 'ul',
        callout: Callout,
        codeBlock: CodeBlock,
        doc: Doc,
        hardBreak: 'br',
        heading: Heading,
        horizontalRule: 'hr',
        iframe: createIFrameHandler(),
        image: 'img',
        listItem: 'li',
        taskListItem: 'li',
        paragraph: 'p',
        orderedList: 'ol',
        text: TextHandler,
    };

    const markMap: MarkMap = {
        italic: 'em',
        bold: 'strong',
        code: 'code',
        link: createLinkHandler({ target: '_blank' }),
        underline: 'u',
    };

    const removeEmptyOrNull = (obj) => {
        Object.keys(obj).forEach(k =>
            (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
            (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );
        return obj;
    };

    const data = removeEmptyOrNull(content)
    console.log(data)

    return (
        <div className='remirror-theme'>
            <RemirrorRenderer  json={data}
                               skipUnknownTypes={true}
                               skipUnknownMarks={true}
                               typeMap={typeMap}
                               markMap={markMap}  />
        </div>
    )
};

export default PracticeData