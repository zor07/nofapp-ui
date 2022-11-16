import React from "react"
import {ProfileType, RelapseLog} from "../../redux/profile-reducer";
import {Col, PageHeader, Row, Typography} from "antd";
import AvatarComponent from "./avatar/AvatarComponent";
import UserPost from "./posts/UserPost";
import ProfileTimer from "./timer/ProfileTimer";
import {NoteType} from "../../redux/note-editor-reducer";
import css from "./Profile.module.css"
import RelapseLogTable from "./relapse-log/RelapseLogTable";
import ReactPlayer from 'react-player'

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
    deleteRelapseLog: (userId: string, relapseLogId: string) => void
}

const Profile: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
                                                                         profile,
                                                                         posts,
                                                                         relapseLogs,
                                                                         uploadAvatar,
                                                                         removeAvatar,
                                                                         relapsed,
                                                                         deleteUserPost,
                                                                         deleteRelapseLog
                                                                     }) => {
    const {Title} = Typography;

    const postElements = posts.map((post, index) => (
        <UserPost key={index}
                  post={post.data.content}
                  noteId={post.id}
                  userId={profile.user.id}
                  deleteUserPost={deleteUserPost}/>
    ))

    return (
        <div className={css.profile}>
            <PageHeader title={profile.user.name}/>
            <div className="space-align-container">
                <Row>
                    <Col flex={2}>
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
                            <RelapseLogTable userId={profile.user.id} relapseLogs={relapseLogs}
                                             deleteRelapseLog={deleteRelapseLog}/>
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
                <Row>
                    <Col flex={2}>
                        <ReactPlayer
                            // playing={showVideo}
                            className='react-player'
                            url={[
                                {
                                    src: "http://127.0.0.1:9000/video/Sample-Video-File-For-Testing.mp4",
                                    type: "video/mp4"
                                },
                            ]}
                            // width='100%'
                            controls={true}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Profile