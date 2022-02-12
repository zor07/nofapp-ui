import {useCommands} from "@remirror/react";
import React, {useState} from "react";
import {Input, Modal} from "antd";

const AddYoutubeButton = () => {
    const [visible, setVisible] = React.useState(false);
    const [youTubeVideoLink, setYouTubeVideoLink] = useState('')

    const commands = useCommands();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        commands.addYouTubeVideo({ video: youTubeVideoLink})
        setVisible(false);
        setYouTubeVideoLink('')
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <button className="remirror-role remirror-button remirror-tabbable"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={showModal}>
                Add video
            </button>
            <Modal
                title="Insert YouTube video link"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Input placeholder="https://www.youtube.com/"
                       value={youTubeVideoLink}
                       onChange={(e) => setYouTubeVideoLink(e.target.value)}/>
            </Modal>
        </>

    );
};

export default AddYoutubeButton