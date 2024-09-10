import { Form } from "react-router-dom";
import ImagePicker from "./UI/ImagePicker.jsx";

export default function Post() {
    return (
        <Form
            className="w-11/12  max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-lg"
            method="POST"
            encType="multipart/form-data"
        >
            <h2 className="text-center text-2xl font-semibold mb-6">Create a Post</h2>
            <div className="grid w-full gap-4">
                <label htmlFor="content" className="text-lg font-medium">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    required
                    className="bg-gray-200 rounded-md p-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="file" className="text-lg font-medium">
                    File
                </label>
                <ImagePicker label="Upload your image" name="file" />
            </div>

            <p className="mt-6 text-center">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Upload Post
                </button>
            </p>
        </Form>
    );
}
