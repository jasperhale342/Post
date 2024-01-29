"use client";
import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
function printPosts(e) {
  console.log("these are the posts ", e);
}

function Home() {
  const [me, setMe] = useState("");
  const [allPosts, dataSet] = useState("");
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 4;

  // // Simulate fetching items from another resources.
  // // (This could be items from props; or items loaded in a local state
  // // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = allPosts.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(allPosts.length / itemsPerPage);

  // // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  useEffect(() => {
    async function fetchMyAPI() {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/current-user/",
        withCredentials: true,
      });

      console.log( res.data);
      setMe(res.data["id"])
    }
    async function getPosts() {
      const posts = await axios({
        method: "GET",
        url: "http://localhost:8000/posts/",
        withCredentials: true,
      });
      console.log(posts.data);
      dataSet(posts.data);
    }

    fetchMyAPI();
    getPosts();
    console.log(allPosts);
    // console.log("data is: " + data)
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      {allPosts
        ? allPosts.map((post, index) => (
            <div key={index}>
              <div className="Auth-form-container">
        <Form className="form-post">
          <div className="Auth-form-content">
            <Form.Group>
              <div className="form-group mt-3">
                <Form.Label className="form-control mt-1">
                  {post.title}
                </Form.Label>
                
              </div>
            </Form.Group>

            <Form.Group className="form-group mt-3" size="lg" controlId="post">
        

              <Form.Control
                as="textarea"
                className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={post.content}
                readOnly={true}
                rows={10}
                maxLength={300}
               
              />
            </Form.Group>
            <div className="flex">
             
              {post.owner == me ? <NextLink
                type="button"
                className="px-4 py-2 p-2 ml-auto float-end text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                href={`/post/edit/${post.id}`}
              
              >
                edit Post
              </NextLink> : ""}
             
              
            </div>
          </div>
        </Form>
      </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default Home;
