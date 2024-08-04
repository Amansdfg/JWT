import {Form, Link} from "react-router-dom";
import FileUpload from "./FileUpload.jsx";

export default function Post(){
    return(
        <Form className="" method="POST">
            <h2 className="text-center text-white text-xl">Post</h2>
            <div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <FileUpload/>
                </div>
            </div>

            <p>
                <button>Upload post</button>
            </p>
        </Form>
    )
}