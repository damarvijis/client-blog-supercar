import Sidebar from "../component/sidebar";
import { useState, useEffect } from "react"
import Image from "next/image";
import { fetchMyBlog, deleteBlog } from "../store/actions/blogAction"
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import Router, { useRouter } from 'next/router'
import TextClamp from 'react-string-clamp';
import Swal from "sweetalert2"

export default function Home() {
  let router = useRouter()
  const dispatch = useDispatch()
  const { myBlogs } = useSelector((state) => state.BlogReducer)

  useEffect(() => {
    dispatch(fetchMyBlog())
  }, [])

  return (
    <>
    <Sidebar />
    <div className="myContainer">
      <div className="d-flex flex-row mt-4">
        <div className="me-3"><Image src="/mycars.png" height="57" width="77" alt="pencil" /></div>
        <div >
          <p className="mb-1" style={{fontSize: "11px"}}>WELCOME TO</p>
          <h3>Supercar Blog</h3>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-end">
        </div>
    <div className="tab">
      <h5>SUPERCAR BLOGS</h5>
      <div className="tab-head">
        <div className="col-3"><h6>IMAGE</h6></div>
        <div className="col-2"><h6>TITLE</h6></div>
        <div className="col-4"><h6>CONTENT</h6></div>
        <div className="col-3"><h6>ACTION</h6></div>
      </div>
      { 
        myBlogs.map((e) => {
          return(
            <div className="tab-body" key={e.id} style={{cursor: "auto"}}>
              <div className="col-3"><Image src={e.imgUrl} height="170" width="200" alt="car" /></div>
              <p className="col-2">{e.title}</p>
             <div className="col-4"><TextClamp text={e.content} lines={3}/></div>
             <div className="col-3 d-flex flex-row">
              <Button onClick={() => {router.push(`/editBlog/${e.id}`)}} className="d-flex me-2 align-items-center bg-transparent btn shadow-none" style={{ color: "#7DB7B4", border: "2px solid #7DB7B4"}} type="button">
                <i className="bi bi-pencil-fill me-2" style={{color: "#7DB7B4"}}></i>Edit
              </Button>
              <Button onClick={() => {
                dispatch(deleteBlog(e.id)).then(() => {
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Success Delete Blog!",
                  })
                  router.push(`/`)
                })
              }} className="d-flex align-items-center bg-transparent btn shadow-none" style={{color: "#8E0505", border: "2px solid #8E0505"}} type="button">
                <i className="bi bi-trash-fill me-2" style={{color: "#8E0505"}}></i>Delete
              </Button>
             </div>
            </div>
          )
        })
      }
    </div>
    </div>
    </>
  )
}