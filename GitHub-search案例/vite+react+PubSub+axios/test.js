const axios = require('axios')

axios.get('http://localhost:8000/posts2').then(
  response => {
    console.log(response.data)
  },
  error => {
    console.log(error.message)
  }
)