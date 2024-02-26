"use client";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import api from "../util/axios";
import { useRouter } from "next/navigation";

const CreatePost = (props) => {
  const [owner, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postMessage, setPostMessage] = useState(false)
  const router = useRouter();
  let data = ''

  function validateForm() {
    return title.length > 0 && content.length > 0;
  }


  useEffect(() => {
    async function fetchMyAPI() {
      const res = await api.get("/current-user/")
      data = await res.data
      setUsername(data['id'])
    }

    fetchMyAPI()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostMessage(false)
    const submitData = { owner, title, content };

    try {
      const res = await api.post("/posts/", JSON.stringify(submitData))
      if (res.status == "201") {

        setPostMessage(true)
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }

    setTitle("");
    setContent("");
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="Auth-form-container">
        <Form className="form-post" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <Form.Group>
              <div hidden={!postMessage} className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Success!</span> Post Created! Check out the home page
              </div>
              <div className="form-group mt-3">
                <Form.Label className="form-control mt-1">
                  Post Title
                </Form.Label>
                <Form.Control
                  className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  autoFocus
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
              </div>
            </Form.Group>

            <Form.Group className="form-group mt-3" size="lg" controlId="post">
              <Form.Label className="form-control mt-1">Post Body</Form.Label>

              <Form.Control
                as="textarea"
                className="shadow appearance-none h-100 resize-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={content}

                maxLength={300}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <div className="flex">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 p-2 ml-auto float-end text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                disabled={!validateForm()}
              >
                Create Post
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreatePost), {
  ssr: false,
});
