import React, {useEffect, useState} from "react";
import {
    deleteRelapseLog,
    deleteUserPost,
    getProfile,
    getRelapseLogs,
    getUserPosts,
    ProfileType,
    relapsed,
    RelapseLog,
    removeAvatar,
    uploadAvatar
} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useParams} from "react-router-dom";
import {NoteType} from "../../redux/note-editor-reducer";

type MapStatePropsType = {
    currentUserId: string
    profile: ProfileType
    posts: Array<NoteType>
    relapseLogs: Array<RelapseLog>
}

type MapDispatchPropsType = {
    getProfile: (userId: string) => void
    uploadAvatar: (userId: string, file: File) => void
    removeAvatar: (userId: string) => void
    relapsed: (userId: string) => void
    getUserPosts: (userId: string) => void
    deleteUserPost: (userId: string, noteId: string) => void
    getRelapseLogs: (userId: string) => void
    deleteRelapseLog: (userId: string, relapseLogId: string) => void
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: React.FC<ProfileContainerType> = ({
                                                              currentUserId,
                                                              profile,
                                                              posts,
                                                              relapseLogs
                                                          }) => {
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    }, [params.userId, currentUserId])

    const fetchData = () => {
        setReady(false)
        const id = params.userId != null ? params.userId : currentUserId

        const fetch = async (id: string) => {
            await dispatch(getProfile(id))
            await dispatch(getUserPosts(id))
            await dispatch(getRelapseLogs(id))
        }

        if (id !== null && id !== '') {
            fetch(id).then(() => setReady(true))
        }
    }

    return (
        <div>
            {ready &&
                <Profile
                    profile={profile}
                    posts={posts}
                    relapseLogs={relapseLogs}
                    uploadAvatar={uploadAvatar}
                    removeAvatar={removeAvatar}
                    relapsed={relapsed}
                    deleteUserPost={deleteUserPost}
                    deleteRelapseLog={deleteRelapseLog}
                />
            }
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        currentUserId: state.auth.id,
        profile: state.profile.profile,
        posts: state.profile.posts,
        relapseLogs: state.profile.relapseLogs
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        getProfile,
        uploadAvatar,
        removeAvatar,
        getUserPosts,
        deleteUserPost,
        relapsed,
        getRelapseLogs,
        deleteRelapseLog
    })
)(ProfileContainer);