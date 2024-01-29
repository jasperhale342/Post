"use client";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setErrors] = useState("")
  const router = useRouter();

  const [password, setPassword] = useState("");
  let session = ''

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { username, password };


    try {


      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },

        credentials: "include",


      });
      
      if (res.ok) {
        router.push("/");


      } 
      else {
     
      
        setErrors(await res.json())
      }
    } catch (error) {
     
    
      
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
              <div hidden={!error} class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span class="font-medium">Error!</span> {error.errors}
              </div>
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
