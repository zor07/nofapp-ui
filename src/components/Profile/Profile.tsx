import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import EditorReadView from "../Editor/EditorReadView";
import Timer from "../Timer/Timer";
import {TimerType} from "../../redux/timer-reducer";
import {Button, Col, Divider, Row, Typography} from "antd";
import css from "./Profile.module.css"
import AvatarComponent from "./AvatarComponent";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

type MapDispatchPropsType = {
    uploadAvatar: (userId: string, file: File) => void
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = ({profile, posts, uploadAvatar}) => {
    const postElements = posts.map((post, index) => <EditorReadView key={index} data={post} displayTitle={true}/>);

    const timer: TimerType = {
        id: "",
        isRunning: true,
        start: profile.timerStart,
        description: "main"
    }
    const {Title} = Typography;
    return (

        <div className="space-align-container">
            <Row>
                <Col flex={2}>
                    <div>
                        <Title level={4}>{profile.user.name}</Title>
                    </div>
                    <div>
                        <AvatarComponent url={profile.avatarUri} userId={profile.user.id} uploadAvatar={uploadAvatar}/>
                    </div>
                </Col>
                <Col flex={4}>

                        <div className={css.timer}>
                            <Timer timer={timer}/>
                        </div>
                        <div>
                            <Button danger >Relapsed</Button>
                        </div>
                </Col>

            </Row>
            <Divider/>
            <Row>
                <div>{postElements}</div>
            </Row>
        </div>


    )
}

export default Profile