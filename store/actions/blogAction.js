import {
  SET_BLOGS,
  SET_ISERROR,
  SET_ISLOADING,
  SET_BLOG_ID,
  SET_MYBLOG
} from "../actionTypes";
const server = "http://localhost:3005"
import axios from "axios"

export function setDataBlogs(payload) {
  return {
    type: SET_BLOGS,
    payload,
  };
}

export function setMyBlogs(payload) {
  return {
    type: SET_MYBLOG,
    payload,
  };
}

export function setDataBlogById(payload) {
  return {
    type: SET_BLOG_ID,
    payload,
  };
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload,
  };
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload,
  };
}

export function fetchBlog(data = { title: "", page: 1 }) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/blogs?title=${data.title}&page=${data.page}`,
        method: "GET",
      })
        .then(({ data }) => {
          dispatch(setDataBlogs(data))
          resolve(data)
        })
        .catch((err) => {
          reject(err)
          dispatch(setIsError(err));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    })
  }
}

export function fetchMyBlog() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/myblogs`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
      })
        .then(({ data }) => {
          dispatch(setMyBlogs(data))
          resolve(data)
        })
        .catch((err) => {
          reject(err)
          dispatch(setIsError(err));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    })
  }
}

export function fetchBlogById(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/blogs/${id}`,
        method: "GET",
      })
      .then(({ data }) => {
          dispatch(setDataBlogById(data))
          resolve(data)
        })
        .catch((err) => {
          reject(err)
          dispatch(setIsError(err));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    })
  }
}

export function addNewBlog(data, file) {
  let form = new FormData()
  form.append("title", data.title)
  file ? form.append("imgUrl", file) : ""
  form.append("content", data.content)
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/blogs`,
        method: "POST",
        data: form,
        headers: {
          access_token: localStorage.getItem("access_token"),
          'Content-Type': 'multipart/form-data'
        },
      })
        .then((data) => {
          console.log(data);
          fetchBlog(data = { title: "", page: 1 })
          resolve()
        })
        .catch((err) => {
          dispatch(setIsError(err));
          reject(err.response.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}

export function addComment(comment, id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/comments/${id}`,
        method: "POST",
        data: {comment},
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data);
          fetchBlog(data = { title: "", page: 1 })
          resolve()
        })
        .catch((err) => {
          dispatch(setIsError(err));
          reject(err.response.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}

export function editBlog(id, data, file) {
  // console.log(id, data, file, "from action")
  let form = new FormData()
  form.append("title", data.title)
  file ? form.append("imgUrl", file) : ""
  form.append("content", data.content)
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/blogs/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
          'Content-Type': 'multipart/form-data'
        },
        data: form,
      })
        .then((data) => {
          fetchBlog(data = { title: "", page: 1 })
          resolve()
        })
        .catch((err) => {
          console.log(err);
          dispatch(setIsError(err));
          reject(err)
        })
    })
  }
}

export function deleteBlog(id) {
  // console.log(id, "from action")
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/blogs/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data, "from action")
          fetchBlog(data = { title: "", page: 1 })
          resolve()
        })
        .catch((err) => {
          reject(err)
          dispatch(setIsError(err));
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}

export function deleteComment(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/comments/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data, "from action")
          fetchBlog(data = { title: "", page: 1 })
          resolve()
        })
        .catch((err) => {
          reject(err)
          dispatch(setIsError(err));
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}