import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import { getDuration } from '../util/auth';
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer.jsx";

function RootLayout() {
    const token=useLoaderData();
    const submit=useSubmit();

    useEffect(()=>{
        if(!token){
            return;
        }
        if(token==="EXPIRED"){
            submit(null,{action:'/logout',method:'post'})
        }
        const tokenDuration=getDuration();
        console.log(tokenDuration);
        setTimeout(()=>{
            submit(null,{action:'/logout',method:'post'})
        },[tokenDuration])
    },[token,submit])
    return (
        <>
            <Header/>
            <main className="bg-aman min-h-svh">
                <Outlet/>
            </main>
            <Footer />
        </>

    );
}

export default RootLayout;
