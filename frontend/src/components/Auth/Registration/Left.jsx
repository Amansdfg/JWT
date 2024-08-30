import bg from "../../../assets/wallpaper.avif";
import logo from "../../../assets/reactlogo.svg";

export default function Left(){
    return (
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img alt=""
                 src={bg}
                 className="absolute inset-0 h-full w-full object-cover opacity-80"/>
            <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white" href="#">
                    <span className="sr-only">Home</span>
                    <img src={logo} className="h-8 sm:h-10" alt="logo"/>
                </a>
                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    Welcome to ChatGram
                </h2>
                <p className="mt-4 leading-relaxed text-white/90">
                    Connect, share, and explore with friends. Join a vibrant community and enjoy seamless conversations
                    and multimedia sharing. Sign up today!
                </p>
            </div>
        </section>
    )
}