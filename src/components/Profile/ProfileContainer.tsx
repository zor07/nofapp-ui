import React, {useEffect} from "react";
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
    initialized: boolean
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
                                                              initialized,
                                                              currentUserId,
                                                              profile,
                                                              posts,
                                                              relapseLogs
                                                          }) => {
    const dispatch = useDispatch()
    const params = useParams()

    const getProfileData = () => {
        if (params.userId) {
            getProfileDataByUserId(params.userId)
        } else {
            if (currentUserId) {
                getProfileDataByUserId(currentUserId)
            }
        }
    }

    const getProfileDataByUserId = (userId: string) => {
        dispatch(getProfile(userId))
        dispatch(getUserPosts(userId))
        dispatch(getRelapseLogs(userId))
    }

    useEffect(() => {
        getProfileData()
    }, [])

    useEffect(() => {
        getProfileData()
    }, [initialized, params.userId])

    return (
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
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
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