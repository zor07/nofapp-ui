import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import css from './Diary.module.css'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";

const Diary = (props) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const onEditorChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState)
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onEditorChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    const onBoldClick = () => {
        onEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }



    return (
        <div className={css.diaryRoot}>
            <button onClick={onBoldClick.bind(this)}>Bold</button>
            <div className={css.editor}>
                <Editor editorState={editorState}
                        placeholder="Enter some text..."
                        handleKeyCommand={handleKeyCommand}
                        onChange={onEditorChange}/>
            </div>
        </div>


    );
}

const mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(Diary);
