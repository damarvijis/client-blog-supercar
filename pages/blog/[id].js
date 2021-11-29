import { addComment, deleteComment, fetchBlogById } from "../../store/actions/blogAction"
import Sidebar from "../../component/sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import Image from "next/image";
import { Form, Button } from "react-bootstrap"
import Router, { useRouter } from 'next/router'
import Swal from "sweetalert2"

function Home(props) {
  const router = useRouter()
  const { dataBlogById } = props.props
  const dispatch = useDispatch()
  const { dataUser, isLogin } = useSelector((state) => state.UserReducer)
  const [value, setValue] = useState('')

  const addComments = (e) => {
    e.preventDefault()
    dispatch(addComment(value, +router.query.id))
    .then(() => {
      setValue("")
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Add Comment!",
      })
      router.push(`/blog/${+router.query.id}`)
    })
    .catch(err => {
      console.log(err);
      setValue("")
    })
  }

  function handleChange (event) {
    setValue(event.target.value)
  }

  return (
    <>
    <Sidebar />
    <div className="myContainer">
      <div className="mt-5 m-auto d-flex flex-column">
        <div style={{ borderRadius: "20px", overflow: "hidden"}} className="d-flex m-auto">
          <Image src={dataBlogById.imgUrl} width="450" height="350"/>
        </div>
        <h1 className="m-auto mt-4">{dataBlogById.title}</h1>
        <p className="m-auto mt-4 lh-lg" style={{textAlign: "justify"}}>{dataBlogById.content}</p>
        <div className="mt-5">
          <p>Comments :</p>
          <Form className={isLogin ? "d-flex" : "d-none"} onSubmit={addComments}>
            <input type="text" value={value} onChange={handleChange} className="form-control shadow-none" style={{border: "2px solid #7DB7B4"}} placeholder="Add Comment" />
            <Button className="d-flex btn align-items-center bg-transparent btn shadow-none" style={{color: "#666666",border: "2px solid #7DB7B4"}} type="submit">Submit</Button>
          </Form>
          <div className="mt-3">
          {
            dataBlogById.Comments.map((e, idx) => {
              return(
                <>
                <div key={idx} className="tab-comment">
                  <span className="fw-bold">{e.username}</span>
                  <span className="">{e.comment}</span>
                  <div className={isLogin && (dataUser.username == e.username || dataBlogById.UserId == dataUser.id) ? "d-flex justify-content-end" : "d-none"}>
                  <Button onClick={() => {
                    dispatch(deleteComment(e.id)).then(() => {
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Success Delete Comment!",
                      })
                      router.push(`/blog/${+router.query.id}`)
                    })
                  }} className="d-flex align-items-center bg-transparent btn shadow-none" style={{color: "#666666",border: "2px solid #7DB7B4"}} type="button"><i className="bi bi-trash"></i>Delete</Button>
                  </div>
                </div>
              </>
              )
            })
          }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const res = await fetch(`http://localhost:3005/blogs/${id}`)
  const dataBlogById = await res.json()
  	return {
		props: {
			dataBlogById
		}
	}
}

export default Home
