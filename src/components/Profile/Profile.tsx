import React from "react"
import {ProfileType, RelapseLog} from "../../redux/profile-reducer";
import {Col, Row, Typography} from "antd";
import AvatarComponent from "./avatar/AvatarComponent";
import UserPost from "./posts/UserPost";
import ProfileTimer from "./timer/ProfileTimer";
import {NoteType} from "../../redux/note-editor-reducer";
import css from "./Profile.module.css"

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<NoteType>
    relapseLogs: Array<RelapseLog>
}

type MapDispatchPropsType = {
    uploadAvatar: (userId: string, file: File) => void
    removeAvatar: (userId: string) => void
    relapsed: (userId: string) => void
    deleteUserPost: (userId: string, noteId: string) => void
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
                                                                         profile,
                                                                         posts,
                                                                         relapseLogs,
                                                                         uploadAvatar,
                                                                         removeAvatar,
                                                                         relapsed,
                                                                         deleteUserPost,
                                                                     }) => {
    const {Title} = Typography;

    const postElements = posts.map((post, index) => (
        <UserPost key={index}
                  post={post.data.content}
                  noteId={post.id}
                  userId={profile.user.id}
                  deleteUserPost={deleteUserPost}/>
    ))

    const relapseLogElements = relapseLogs.map((relapseLog) => <tr>
        <td>{relapseLog.id}</td>
        <td>{relapseLog.start}</td>
        <td>{relapseLog.stop}</td>
    </tr>)

    return (
        <div className={css.profile}>
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
                                Relapse Log:
                            </Title>
                            <table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>start</th>
                                        <th>stop</th>
                                    </tr>
                                </thead>
                                {relapseLogElements}
                            </table>
                        </div>
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
        </div>
    )
}

export default Profile