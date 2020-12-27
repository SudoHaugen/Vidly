import React from 'react';

const Like = ({ isLiked, onClick }) => {
    const liked = (isLiked === true ? "fa fa-heart" : "far fa-heart");
    return (
        <i className={`${liked}`} style={{ cursor: "pointer"}} onClick={onClick}></i>
    )
}

export default Like;