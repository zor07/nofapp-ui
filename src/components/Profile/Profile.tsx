import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import {Col, Row, Typography} from "antd";
import AvatarComponent from "./avatar/AvatarComponent";
import UserPost from "./posts/UserPost";
import ProfileTimer from "./timer/ProfileTimer";

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
    const {Title} = Typography;

    const postElements = posts.map((post, index) => (
        <UserPost key={index} post={post} />
    ))

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
                    <div>
                        <ProfileTimer start={profile.timerStart}
                                      userId={profile.user.id}
                                      relapsed={relapsed}/>
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
        </div>
    )
}

export default Profile