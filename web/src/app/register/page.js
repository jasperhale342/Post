"use client";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setErrors] = useState("")

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { username, password, confirmPassword };
   

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/users/",
        headers: {
          "Content-Type": "application/json",
        },
        data:JSON.stringify(submitData),
        withCredentials: true,
      });
      // const res = await fetch("http://localhost:8000/users/", {
      //   method: "POST",
      //   body: JSON.stringify(submitData),
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      console.log(res.data);
      if (res.ok) {
        console.log("Yeai!");
      } else {
        setErrors("")
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
            <div hidden={false} className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">Error!</span> 
              </div>
              <div className="text-red-600 text-center">{}</div>
              <h3 className="Auth-form-title">Create Account</h3>
              <div className="form-group mt-3">
                <Form.Label className="form-control mt-1">username</Form.Label>
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
            <Form.Group
              className="form-group mt-3"
              size="lg"
              controlId="password"
            >
              <Form.Label className="form-control mt-1">
                Confirm Password
              </Form.Label>

              <Form.Control
                type="password"
                className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2 mt-3 text-center btn btn-blue">
              <Button className="" type="submit" disabled={!validateForm()}>
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
