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
                <div className='flex post-data-content-header'>
                    <span className='fn-wg-700'>{
                    props.user.name || "dummy name"
                    }</span>
                    <span className='gray-txt lg-txt'>{props.createdAt }</span>
                </div>
                <div>
                    {
                        props.content
                    }
                </div>
                <div className='post-data-action-container'>
                    <span className='hover'><IconHeart /></span>
                    <span className='hover'><IconComment /></span>
                    <span className='hover'><IconShare /></span>
                    <span className='hover'><IconsBookmark /></span>
                </div>
            </div>
        </div>
    )
}

export default Post
