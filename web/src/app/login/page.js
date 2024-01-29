"use client";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  let session = ''

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { username, password };
    console.log(JSON.stringify(submitData));
    console.log("the csrf thing is: ")

    try {

      // const res = await axios({
      //   method: 'POST',
      //   url: "http://localhost:8000/login/",
      //   body:
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
    
      // })
      
      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
        
        credentials: "include",
        
        
      });
      console.log(await res.json());
      if (res.ok) {
        console.log("Yeah!");
        

      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }

    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="Auth-form-container">
        <Form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <Form.Group>
              <div className="form-group mt-3">
                <Form.Label className="form-control mt-1">Username</Form.Label>
                <Form.Control
                  className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  autoFocus
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group
              className="form-group mt-3"
              size="lg"
              controlId="password"
            >
              <Form.Label className="form-control mt-1">Password</Form.Label>

              <Form.Control
                type="password"
                className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-3 text-center btn btn-blue">
              <Button className="" type="submit" disabled={!validateForm()}>
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
