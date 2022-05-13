import React from 'react';
import { IconComment, IconHeart, IconsBookmark, IconShare } from '../../UI/Icons/Icons';
import "./Post.css";

const Post = ({props}) => {
    console.log(props)
    return (
        <div className='post--data-container'>
            <div>
                {
                props.user?.photo.length ?
                    <img src={props.user.photo}  className='handle-img-np' />
                    : <span className='handle-img-np handle-img-ph'>
                    {
                        props.user.name ? props.user.name[0].toUpperCase() : "D"
                        }
                    </span>
                }
            </div>
            <div className='post-data-show-container'>
                <div>
                    <span>{
                    props.user.name || "dummy name"
                    }</span>
                    <span>{props.createdAt }</span>
                </div>
                <div>
                    {
                        props.content
                    }
                </div>
                <div className='post-data-action-container'>
                    <IconHeart />
                    <IconComment />
                    <IconShare />
                    <IconsBookmark />
                </div>
            </div>
        </div>
    )
}

export default Post
