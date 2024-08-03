
import Left from "./Left.jsx";
import Mobile from "./Mobile.jsx";
import Form from "./Register.jsx";
const Registration=()=>{
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <Left/>
                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <Mobile/>
                        <Form/>
                    </div>
                </main>
            </div>
        </section>
    )
}
export default Registration;