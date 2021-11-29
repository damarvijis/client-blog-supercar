import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import {setIsLogin} from "../store/actions/userAction"
import { useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2"

function sidebar() {
  const { isLogin } = useSelector((state) => state.UserReducer)
  const router = useRouter()
  const [blog, setBlog] = useState('inactive')
  const dispatch = useDispatch()
  function blogActive() {
    blog === 'inactive' ? setBlog('active') : setBlog('inactive')
  }
  const logout = () => {
    localStorage.clear()
    dispatch(setIsLogin(false))
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Success Logout!",
    })
    Router.push("/")
  }

  return (
    <div className="sidebar col-2 d-none d-lg-flex">
      <div className="logo">
        <Image src="/mycars.png" height="77" width="100" alt="logo" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: "25px"
        }}
      >
        <p style={{ alignSelf: "center", fontSize: "12px", marginTop: "12px", marginBottom: "4px" }}>
          KINKY OSTENDORF
        </p>
        <p style={{ alignSelf: "center", fontSize: "10px" }}>
          kinkysfruitlab@outlook.com
        </p>
      </div>
      <Link href="/">
        <button className={router.pathname === "/" ? "btn_sidebar_active" : "btn_sidebar"}>
          <div className={router.pathname === "/" ? "images_sidebar_active" : "images_sidebar"}>
            <Image src="/overview.png" width="27" height="20"/>
          </div>
          <div style={{fontSize: "12px"}}>HOME</div>
        </button>
      </Link>
        <button onClick={() => {
          blogActive()
        }}
        style={isLogin ? {display: ""} : {display: "none"}}
        className={blog == "active" || router.pathname === "/myblog" || router.pathname === "/addBlog"  ? "btn_sidebar_active" : "btn_sidebar"}>
          <div className={blog === "active" || router.pathname === "/myblog" || router.pathname === "/addBlog" ? "images_sidebar_active" : "images_sidebar"}>
            <div>
            <Image src="/pencil.png" width="27" height="20"/>
            </div>
          </div>
          <div style={{fontSize: "12px"}}>BLOG</div>
        </button>
        <div className={blog == "active" || router.pathname == "/myblog" || router.pathname == "/addBlog" ? "mt-2" : "d-none"}>
          <Link href="/myblog">
            <p style={{fontSize: "10px"}} className={router.pathname === "/myblog" ? "p_sidebar actived" : "p_sidebar"}>MY BLOG</p>
          </Link>
          <Link href="/addBlog">
            <p style={{fontSize: "10px"}} className={router.pathname === "/addBlog" ? "p_sidebar actived" : "p_sidebar"}>ADD BLOG</p>
          </Link>
        </div>
      <Link href="/login">
        <button style={isLogin ? {display: "none"} : {display: ""}} className={router.pathname === "/login" ? "btn_sidebar_active" : "btn_sidebar"}>
          <div className={router.pathname === "/login" ? "images_sidebar_active" : "images_sidebar"}>
            <Image src="/kanan.png" width="27" height="20"/>
          </div>
          <div style={{fontSize: "12px"}}>LOG IN</div>
        </button>
      </Link>
        <button onClick={logout} style={isLogin ? {display: ""} : {display: "none"}} className={router.pathname === "/login" ? "btn_sidebar_active" : "btn_sidebar"}>
          <div className={router.pathname === "/login" ? "images_sidebar_active" : "images_sidebar"}>
            <Image src="/kiri.png" width="27" height="20"/>
          </div>
          <div style={{fontSize: "12px"}}>LOG OUT</div>
        </button>
      <Link href="/register">
        <button style={isLogin ? {display: "none"} : {display: ""}} className={router.pathname === "/register" ? "btn_sidebar_active" : "btn_sidebar"}>
          <div className={router.pathname === "/register" ? "images_sidebar_active" : "images_sidebar"}>
            <Image src="/collaborators.png" width="27" height="20"/>
          </div>
          <div style={{fontSize: "12px"}}>REGISTER</div>
        </button>
      </Link>
    </div>
  );
}

export default sidebar