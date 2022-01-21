import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import css from './Diary.module.css'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
}

type MapDispatchToPropsType = {
}

type DiaryPropsType = MapStateToPropsType & MapDispatchToPropsType

const Diary: React.FC<DiaryPropsType> = (props) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty()
    );

    const onEditorChange = (editorState) => {
        setEditorState(editorState)
    }

    return (
        <div>
            <div >
                <Editor editorClassName={css.editor}
                        editorState={editorState}
                        onEditorStateChange={onEditorChange}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {

    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(Diary);
