import React, {useEffect} from "react";
import {
    deleteUserPost,
    getProfile,
    getUserPosts,
    ProfileType,
    relapsed,
    removeAvatar,
    uploadAvatar
} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {RemirrorJSON} from "remirror";
import {useParams} from "react-router-dom";

type MapStatePropsType = {
    initialized: boolean
    currentUserId: string
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

type MapDispatchPropsType = {
    getProfile: (userId: string) => void
    uploadAvatar: (userId: string, file: File) => void
    removeAvatar: (userId: string) => void
    relapsed: (userId: string) => void
    getUserPosts: (userId: string) => void
    deleteUserPost: (userId: string, noteId: string) => void
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: React.FC<ProfileContainerType> = ({initialized, currentUserId, profile, posts}) => {
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if (params.userId) {
            dispatch(getProfile(params.userId))
            dispatch(getUserPosts(params.userId))
        } else {
            if (currentUserId) {
                dispatch(getProfile(currentUserId))
                dispatch(getUserPosts(currentUserId))
            }
        }
    }, [])

    useEffect(() => {
        if (params.userId) {
            dispatch(getProfile(params.userId))
            dispatch(getUserPosts(params.userId))
        } else {
            if (currentUserId) {
                dispatch(getProfile(currentUserId))
                dispatch(getUserPosts(currentUserId))
            }
        }
    }, [initialized, params.userId])

    return (
        <Profile
            profile={profile}
            posts={posts}
            uploadAvatar={uploadAvatar}
            removeAvatar={removeAvatar}
            relapsed={relapsed}
        />
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
        currentUserId: state.auth.id,
        profile: state.profile.profile,
        posts: state.profile.posts
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
        relapsed
    })
)(ProfileContainer);