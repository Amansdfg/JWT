import logo from "../../assets/reactlogo.svg";

export  default function Mobile(){
    return (
        <div className="relative -mt-16 block lg:hidden">
            <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
               href="#">
                <span className="sr-only">Home</span>
                <img src={logo} className="h-8 sm:h-10" alt="logo"/>
            </a>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to ChatGram
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
                Connect, share, and explore with friends. Join a vibrant community and enjoy seamless conversations and
                multimedia sharing. Sign up today!
            </p>
        </div>
    )
}