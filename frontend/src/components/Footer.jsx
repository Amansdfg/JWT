import {currentYear, social} from "../util/list.js";

function Footer(){
    return(
        <footer className="flex  flex-col w-full justify-center px-10 bg-aman">
            <ul className="flex gap-5 justify-center">
                {social.map((data)=>(
                    <li key={data.id}>
                        <a href={data.href} target="_blank">
                            <img src={data.img} className="h-14 rounded-3xl p-2"/>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col px-5 justify-center mx-auto">
                <h2>Developed By Aman Kalabay</h2>
                <h5>Copyright &copy; {currentYear}, Aman Kalabay. All Rights Reserved</h5>
            </div>
        </footer>
    )
}
export default Footer;