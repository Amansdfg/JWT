import {Form, Link} from "react-router-dom";
export default function Post(){
    return (

    <Form className="w-11/12 h-96 max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-lg" method="POST" encType="multipart/form-data">
        <h2 className="text-center  text-xl">Post</h2>
            <div className="grid w-full">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    required
                    className="bg-gray-300"
                />
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    required
                    className="bg-gray-300"
                />
                <label htmlFor="file">File</label>
                <input type="file" id="file" name="file"  required/>
            </div>

            <p>
                <button>Upload post</button>
            </p>
        </Form>
    )
}