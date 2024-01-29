"use client";

import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import axios from "axios";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'

const updatePost = ({params}) => {
    const [owner, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setData] = useState("");
    const router = useRouter()
    const id = params.id
    
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
      async function getPost() {
        const url = "http://localhost:8000/post/"+id +"/"
        
        const post = await axios({
          method: "GET",
          url: url,
          withCredentials: true,
        });
        console.log(post.data);
        
        setTitle(post.data.title)
        setContent(post.data.content)
      }
      getPost()
      fetchMyAPI()
      console.log("the id is: ", id)
  }, [])
    const handleSubmit = async (e) => {
      e.preventDefault();
      const submitData = {owner, title, content };
  
      try {
       
        let myHeaders = new Headers({
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get('csrftoken')
        });
        console.log(submitData)
        const res = await fetch("http://localhost:8000/post/"+id+"/", {
          method: "PUT",
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
                    readOnly={true}
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
                  className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                readOnly={true}
                  value={content}
                  rows={10}
                  maxLength={300}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              
            </div>
          </Form>
        </div>
      </div>
    );
  };
  
  export default dynamic(() => Promise.resolve(updatePost), {
    ssr: true,
  });