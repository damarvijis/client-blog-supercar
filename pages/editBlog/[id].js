import { editBlog, fetchBlogById } from "../../store/actions/blogAction"
import Sidebar from "../../component/sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import Image from "next/image";
import { Form, Button } from "react-bootstrap"
import Router, { useRouter } from 'next/router'
import Swal from "sweetalert2"

function EditBlogs(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { myData } = props.props

  const [editBlogs, setEditBlogs] = useState({
    title: myData.title,
    imgUrl: myData.imgUrl,
    content: myData.content,
  })
  const [addFile, setAddFile] = useState(null)

  const inputAdd = (e) => {
    const value = e.target.value
    const name = e.target.name
    setEditBlogs({
      ...editBlogs,
      [name]: value,
    })
  }

  const changeFileImg = (e) => {
    const file = e.target.files[0]
    setAddFile(file)
  }

  const submitAddBlog = (e) => {
    e.preventDefault()
    dispatch(editBlog(+router.query.id, editBlogs, addFile)).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Add New Blog!",
      })
      router.push("/myblog")
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      })
      router.push("/addBlog")
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
              src="https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80"
              alt="login form" width="500px" height="700px"
            />
          </div>
          <div className="col-md-6 col-lg-7 d-flex flex-column align-items-center justify-content-center">
            <Image src="/mycars.png" height="100" width="150" alt="logo" className="mb-1"/>
            <h3 className="mt-1">Edit Blog</h3>
            <Form onSubmit={submitAddBlog}>
              <input type="text" className="form-control shadow-none mt-4" style={{border: "2px solid #7DB7B4"}} placeholder="Title" name="title" value={editBlogs?.title} onChange={inputAdd}/>
              <Image
              src={editBlogs?.imgUrl} className="mt-2 m-auto"
              alt="login form" width="150px" height="170px"
            />
              <input type="file" className="form-control shadow-none mt-2" style={{border: "2px solid #7DB7B4"}} onChange={changeFileImg}/>
              <textarea className="form-control shadow-none mt-2" style={{border: "2px solid #7DB7B4"}} placeholder="Content" name="content" value={editBlogs?.content} onChange={inputAdd} rows={3}></textarea>
              <Button className="d-flex btn align-items-center mt-4 m-auto border-0 btn shadow-none" style={{color: "#FFFFFF",backgroundColor: "#7DB7B4"}} type="submit">Edit Blog</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

EditBlogs.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const res = await fetch(`https://server-blog-supercar.herokuapp.com/blogs/${id}`)
  const myData = await res.json()
  return {
		props: {
			myData
		}
	}
}

export default EditBlogs