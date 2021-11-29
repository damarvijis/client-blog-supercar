import Sidebar from "../component/sidebar";
import { useState } from "react"
import Image from "next/image";
import { Form, Button } from "react-bootstrap"
import Router, { useRouter } from 'next/router'
import TextClamp from 'react-string-clamp';

export default function Home(props) {
  const { dataBlogs, pages } = props
  const [page, setPage] = useState(pages)
  const [value, setValue] = useState('')
  const [maxPage, setMaxPage] = useState(dataBlogs.totalPage)
  const [dataSearch, setDataSearch] = useState([])
  let items = []
  let router = useRouter()

  function submitSearch (e) {
    e.preventDefault()
    let search = value.charAt(0).toUpperCase() + value.slice(1)
    const result = dataBlogs.rows.filter(el => el.title.includes(search))
    setDataSearch(result)
  }

  function handleChange (event) {
    let words = event.target.value
    let search = words.charAt(0).toUpperCase() + words.slice(1)
    setValue(event.target.value)
    const result = dataBlogs.rows.filter(el => el.title.includes(search))
    setDataSearch(result)
  }

  for (let i = 0; i < maxPage; i++) {
    items.push(
      <h5 key={i}
      onClick={() => {
        Router.push(`/?page=${i + 1}`)
        setPage(i+1)
      }} 
        style={{cursor: 'pointer'}}
        className={pages == i+1 ? "col-6 align-items-center background-number" : "col-6 align-items-center"}>{i + 1}</h5>
    )
  }
    
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
        <Form onSubmit={submitSearch}>
          <div className="row">
            <div className="searchBox" style={{marginRight: "60px"}}>
              <div className="col-md-1 d-flex">
              <Button className="d-flex align-items-center border-0 bg-transparent p-0 btn shadow-none" type="submit">
                <Image src="/search.png" width="13" height="13"/>
              </Button>
              </div>
              <div className="form-group col-md-11 flex-column">
              <input className="ms-1 form-control p-0 border-0 bg-transparent shadow-none" type="text" placeholder="Search by title" value={value} onChange={handleChange} />
              </div>
            </div>
          </div>
        </Form>
        </div>
    <div className="tab">
      <h5>SUPERCAR BLOGS</h5>
      <div className="tab-head">
        <div className="col-4"><h6>IMAGE</h6></div>
        <div className="col-3"><h6>TITLE</h6></div>
        <div className="col-5"><h6>CONTENT</h6></div>
      </div>
      { dataSearch.length != 0 && value.length != 0 ? dataSearch.map((e) => { 
      return (<div className="tab-body" key={e.id} onClick={() => {
             router.push(`/blog/${e.id}`)
            }}>
              <div className="col-4"><Image src={e.imgUrl} height="170" width="200" alt="car" /></div>
              <p className="col-3">{e.title}</p>
             <div className="col-5"><TextClamp text={e.content} lines={3}/></div>
            </div>)}) :
        dataBlogs.rows.map((e) => {
          return(
            <div className="tab-body" key={e.id} onClick={() => {
              router.push(`/blog/${e.id}`)
            }}>
              <div className="col-4"><Image src={e.imgUrl} height="170" width="200" alt="car" /></div>
              <p className="col-3">{e.title}</p>
             <div className="col-5"><TextClamp text={e.content} lines={3}/></div>
            </div>
          )
        })
      }
      <div className="row mt-5 p-3 d-flex justify-content-center">
        <div className="col-1 d-flex justify-content-end align-items-center">
          <Button className="bg-transparent border-0 shadow-none" disabled={page == 1}>
            <Image src="/kiri.png" onClick={() => {
              Router.push(`/?page=${Number(router.query.page) - 1}`)
              setPage(Number(router.query.page) - 1)
            }}
              className="d-flex align-items-center bg-transparent border-0 shadow-none" width="13" height="13"/>
          </Button>
        </div>
        <div className="row col-1 align-items-center pages">
          {items}
        </div>
        <div className="row col-1 d-flex justify-content-start align-items-center">
          <Button className="bg-transparent border-0 shadow-none" disabled={page == maxPage}>
            <Image src="/kanan.png" onClick={() => {
              router.pathname == "/" ? Router.push(`/?page=${2}`) : Router.push(`/?page=${Number(router.query.page) + 1}`)
              setPage(Number(router.query.page) + 1)
            }} 
              className="d-flex align-items-center" width="13" height="13"/>
          </Button>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const res = await fetch(`https://server-blog-supercar.herokuapp.com/blogs?page=${page}`)
	const dataBlogs = await res.json()
	return {
		props: {
			dataBlogs,
      pages: Number(page)
		}
	}
}