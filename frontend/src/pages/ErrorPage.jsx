import {Link, useRouteError} from 'react-router-dom';
function ErrorPage() {
    const error = useRouteError();
    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    return (
        <div className="text-center">
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="flex gap-5 justify-center">
                <Link to="/" className="bg-gray-800 text-white py-1 px-3 rounded-md" >Home</Link>
                <Link to="/login" className="bg-gray-800 text-white py-1 px-3 rounded-md" >Login</Link>
            </div>
        </div>
    );
}

export default ErrorPage;
