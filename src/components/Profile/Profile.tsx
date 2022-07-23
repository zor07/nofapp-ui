import React, {useEffect, useState} from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import Timer from "../Timer/Timer";
import {TimerType} from "../../redux/timer-reducer";
import {Button, Col, Divider, Row, Typography} from "antd";
import css from "./Profile.module.css"
import AvatarComponent from "./AvatarComponent";
import {useDispatch} from "react-redux";
import UserPost from "./posts/UserPost";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

type MapDispatchPropsType = {
    uploadAvatar: (userId: string, file: File) => void
    removeAvatar: (userId: string) => void
    relapsed: (userId: string) => void
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = ({profile, posts, uploadAvatar, removeAvatar, relapsed}) => {

    const [shouldRelapse, setShouldRelapse] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (shouldRelapse) {
            dispatch(relapsed(profile.user.id))
            setShouldRelapse(false)
        }
    }, [shouldRelapse])

    const postElements = posts.map((post, index) => (
        <UserPost key={index} post={post} />
    ))

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
                        <AvatarComponent
                            url={profile.avatarUri}
                            userId={profile.user.id}
                            uploadAvatar={uploadAvatar}
                            removeAvatar={removeAvatar}
                        />
                    </div>
                    <div className={css.timer}>
                        <Timer timer={timer}/>
                    </div>
                    <div>
                        <Button danger onClick={() => setShouldRelapse(true)}>Relapsed</Button>
                    </div>
                </Col>
                <Col flex={16}>
                    <div>
                        <Title level={1}>
                            My Posts:
                        </Title>
                        <div>
                            {postElements}
                        </div>

                    </div>

                </Col>

            </Row>
            <Divider/>

        </div>


    )
}

export default Profile