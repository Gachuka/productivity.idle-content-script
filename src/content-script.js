import axios from "axios";

function axiosGet() {
  axios.get('http:localhost:7878').then((res) => {
    console.log(res.data)
  })
}

setInterval(() => {axiosGet()}, 5000)