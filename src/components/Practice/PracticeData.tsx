import React from "react";
import {RemirrorJSON} from "remirror";
import {
    Callout,
    CodeBlock,
    createIFrameHandler,
    createLinkHandler,
    Doc,
    Heading,
    MarkMap,
    RemirrorRenderer,
    TextHandler
} from "@remirror/react-renderer";
import {Button, Descriptions, PageHeader, Tag} from "antd";
import {useNavigate} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";

type EditorStaticPropsType = {
    content: RemirrorJSON
    name: string
    isPublic: boolean
    id: string
}

const PracticeData: React.FC<EditorStaticPropsType> = ({content, name, isPublic, id}) => {

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

    const removeEmptyOrNull = (obj: RemirrorJSON) => {
        Object.keys(obj).forEach(k =>
            ((obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k])) ||
            ((!obj[k] && obj[k] !== undefined) && delete obj[k])
        );
        return obj;
    };

    const removeTitle = (obj: RemirrorJSON) : RemirrorJSON => {
        const contentWithoutTitle = [...obj.content]
        if (contentWithoutTitle[0] && contentWithoutTitle[0].type === 'heading') {
            contentWithoutTitle.shift()
        }
        obj.content = contentWithoutTitle
        return obj;
    }

    const data = removeEmptyOrNull(content)

    const dataWithoutTitle = removeTitle(data)

    const navigate = useNavigate()

    const onEditPractice = (practiceId: string) => {
        navigate(`/practice/editor/${practiceId}`)
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={name}
                extra={[<Button key="1" icon={<EditOutlined/>} onClick={() => onEditPractice(id)}>Edit</Button>]}>
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Tags">
                        {isPublic
                            ? <Tag color="green">Public practice</Tag>
                            : <Tag color="blue">My Practice</Tag>
                        }
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>


            <div className='remirror-theme'>
                <RemirrorRenderer  json={dataWithoutTitle}
                                   skipUnknownTypes={true}
                                   skipUnknownMarks={true}
                                   typeMap={typeMap}
                                   markMap={markMap}  />
            </div>
        </div>
    )
};

export default PracticeData