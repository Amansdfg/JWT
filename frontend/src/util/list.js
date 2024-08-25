import github from "../assets/github.svg"
import telegram from "../assets/telegram.svg"
import instagram from "../assets/instagram.svg"
import linkedIn from "../assets/linkedIn.svg"

import user from "../assets/user.svg"
import notification from '../assets/notification.svg'
import lock from '../assets/lock.svg'
import block from "../assets/block.svg"
import message from "../assets/message.svg"
import comment from "../assets/comment.svg"
import info from "../assets/aboutUs.svg"
import password from "../assets/password.svg"
export const setting=[
    {
        id:1,
        name:"Your profile",
        href:"/profile"
    },
    {
        id:2,
        name:"Setting",
        href:"/settings",
    },
    {
        id:3,
        name:"Sign out",
        href:"/sign-out"
    }
]
export const header=[
    {
        id:'1',
        name:"Home",
        href:"",
    },
    {
        id:'2',
        name:"Chat",
        href:"chat",
    },
    {
        id:"3",
        name:"Profile",
        href:"profile"
    }
]
export const register=[
    {
        id:"FirstName",
        name:"First Name"
    },
    {
        id:"LastName",
        name:"Last Name"
    },
    {
        id:"Email",
        name:"Email"
    },
    {
        id:"Password",
        name:"Password"
    },
    {
        id:"PasswordConfirmation",
        name:"Password Confirmation"
    },
]
export const social=[
    {
        id:"1",
        name:"Github",
        href:"https://github.com/Amansdfg",
        img:github,
    },
    {
        id:"2",
        name:"LinkedIn",
        href:"https://www.linkedin.com/in/aman-kalabay-4371542bb/",
        img:linkedIn,
    },
    {
        id:"3",
        name:"Telegram",
        href:"https://t.me/AmanKalabay",
        img:telegram,
    },
    {
        id:"4",
        name:"Instagram",
        href:"https://www.instagram.com/aman_kalabay/",
        img:instagram,
    }
]
export const currentYear=new Date().getFullYear();
export const settingsMenu=[
    {
        id:"s1",
        name:'user',
        title:'Edit profile',
        href:'/settings/edit',
        image:user,
    },
    {
        id:"s2",
        name:'notification',
        title:'Notification',
        href:'/settings/notification',
        image:notification,
    },
    // {
    //     id:"s3",
    //     name:'account privacy',
    //     title:'Account privacy',
    //     href:'/settings/privacy',
    //     image:lock,
    // },
    {
        id:"s4",
        name:'password',
        title:'Change password',
        href:'/settings/change-password',
        image:password,
    },
    {
        id:"s5",
        name:'blocked',
        title:'Blocked',
        href:'/settings/blocked',
        image:block,
    },
    {
        id:"s6",
        name:'messages',
        title:'Messages',
        href:'/settings/messages',
        image:message,
    },
    {
        id:"s7",
        name:'comment',
        title:'Comment',
        href:'/settings/comment',
        image:comment,
    },
    {
        id:"s8",
        name:'about-us',
        title:'About us',
        href:'/settings/about_us',
        image:info,
    },
]