"use client";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import dynamic from "next/dynamic";

import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";

import { useRouter } from "next/navigation";

const CreatePost = (props) => {
  const [owner, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  let data = ''

  function validateForm() {
    return title.length > 0 && content.length > 0;
  }

  
  useEffect(() => {
    async function fetchMyAPI() {

        const res = await axios({
            method: 'GET',
            url: "http://localhost:8000/current-user/",
            withCredentials: true


        })
        data = await res.data
        setUsername(data['id'])
    }

    fetchMyAPI()
}, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {owner, title, content };

    try {
      // const res = await axios({
      //   method: 'POST',
      //   url: "http://localhost:8000/login/",
      //   body:
      //   headers: {
      //     "Content-Type": "application/json"
      //   },

      // })
      let myHeaders = new Headers({
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken')
      });
      console.log(submitData)
      const res = await fetch("http://localhost:8000/posts/", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: myHeaders,
        credentials: "include"
      
      });
      console.log(res);
      if (res.ok) {
        console.log("success");
      } else {
        console.log("Oops! Something is wrong.");
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
