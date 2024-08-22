import {currentYear, social} from "../util/list.js";

function Footer(){
    return(
        <footer className="flex dark:bg-darkMode  flex-col w-full justify-center px-10 bg-aman py-10">
            <ul className="flex gap-5 justify-center">
                {social.map((data)=>(
                    <li key={data.id}>
                        <a href={data.href} target="_blank">
                            <img src={data.img} className="h-14 rounded-3xl p-2" alt={data.name}/>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col px-5  text-center">
                <h2 className="text-2xl font-bold dark:text-white">Developed By Aman Kalabay</h2>
                <h5 className="text-xl dark:text-white">Copyright &copy; {currentYear}, Aman Kalabay. All Rights Reserved</h5>
            </div>
        </footer>
    )
}
export default Footer;