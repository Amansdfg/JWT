export default function NotFound(){
    return(
        <div className="grid place-items-center py-52 sm:py-72">
            <div className="text-center">
                <h1 className="text-purple-800 font-semibold">404</h1>
                <p className="mt-3 sm:text-5xl text-2xl font-bold">Page not found</p>
                <h2 className="text-stone-600 mt-6">Sorry, we couldn't find the page you're looking for.</h2>
                <div className="mt-10 flex justify-center items-center gap-x-6">
                    <a href="http://localhost:5173/" className="bg-purple-700 hover:bg-purple-500 p-2 text-white rounded-md">Go back home</a>
                    <a href="http://localhost:5173/support">Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </div>
    )
}