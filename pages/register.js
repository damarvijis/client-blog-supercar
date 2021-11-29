import { register } from "../store/actions/userAction"
import Sidebar from "../component/sidebar";
import { useDispatch } from 'react-redux'
import { useState, useEffect } from "react"
import Image from "next/image";
import { Form, Button } from "react-bootstrap"
import Router, { useRouter } from 'next/router'
import Swal from "sweetalert2"

function Register() {
  const dispatch = useDispatch()
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
  })

  const changeInputRegister = (e) => {
    const value = e.target.value
    const name = e.target.name
    setUserRegister({
      ...userRegister,
      [name]: value,
    })
  }

  const submitRegister = (e) => {
    e.preventDefault()
    dispatch(register(userRegister))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Success Register, please login",
        })
        Router.push("/login")
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        })
      })
  }

  return (
    <>
    <Sidebar />
    <div className="myContainer">
      <div className="card" style={{borderRadius: "1rem", marginTop: "70px"}}>
        <div className="row g-0">
          <div className="col-md-6 col-lg-5 d-none d-md-flex" style={{overflow: "hidden", borderRadius: "1rem 0 0 1rem"}}>
            <Image
              src="https://images.unsplash.com/photo-1566023967456-785e9a45c537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80"
              alt="login form" width="500px" height="700px"
            />
          </div>
          <div className="col-md-6 col-lg-7 d-flex flex-column align-items-center justify-content-center">
            <Image src="/mycars.png" height="100" width="150" alt="logo" className="mb-1"/>
            <h3 className="mt-1">Create an account</h3>
            <Form onSubmit={submitRegister}>
              <input type="text" className="form-control shadow-none mt-4" style={{border: "2px solid #7DB7B4"}} placeholder="Username" name="username" value={userRegister.username} onChange={changeInputRegister}/>
              <input type="email" className="form-control shadow-none mt-2" style={{border: "2px solid #7DB7B4"}} placeholder="Email" name="email" value={userRegister.email} onChange={changeInputRegister}/>
              <input type="password" className="form-control shadow-none mt-2" style={{border: "2px solid #7DB7B4"}} placeholder="Password" name="password" value={userRegister.password} onChange={changeInputRegister}/>
              <Button className="d-flex btn align-items-center mt-4 m-auto border-0 btn shadow-none" style={{color: "#FFFFFF",backgroundColor: "#7DB7B4"}} type="submit">Register</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register