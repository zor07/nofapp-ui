import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import EditorReadView from "../Editor/EditorReadView";
import Timer from "../Timer/Timer";
import {TimerType} from "../../redux/timer-reducer";
import {Avatar, Button, Col, Divider, Row, Space, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import css from "./Profile.module.css"

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

const Profile: React.FC<MapStatePropsType> = ({profile, posts}) => {

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
                    <Avatar shape="square" size={256} icon={<UserOutlined/>} alt={profile.avatarUri}/>
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