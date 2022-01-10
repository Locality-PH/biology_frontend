import React, { useEffect } from 'react'
import { Avatar } from "antd";
import utils from "utils";

function AvatarProfile(props) {

    const avatar = localStorage.getItem('avatar');
    var AvatarComponent, test;
    
    useEffect(() => {
        console.log("avatar")
        console.log(avatar)
        test = props.size;
    }, [])

    if (avatar != null) {
        AvatarComponent = <Avatar src={avatar} className={props.classname} size={props.size} style={props.style} > </Avatar>
    } else {
        AvatarComponent = <Avatar className={props.classname} size={props.size} style={props.style} >
            {utils.getNameInitial("Giann Mediavillo")}
        </Avatar>
    }

    return (
        <div >
            {AvatarComponent}
        </div>

    )
}

export default AvatarProfile
