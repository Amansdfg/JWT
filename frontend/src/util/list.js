import github from "../assets/github.svg"
import telegram from "../assets/telegram.svg"
import instagram from "../assets/instagram.svg"
import linkedIn from "../assets/linkedIn.svg"
export const setting=[
    {
        id:1,
        name:"Your profile",
        href:"/profile"
    },
    {
        id:2,
        name:"Setting",
        href:"/settings.svg",
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