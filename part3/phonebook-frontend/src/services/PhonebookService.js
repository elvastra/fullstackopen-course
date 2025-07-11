import axios from 'axios'

// const baseUrl = "http://localhost:3001/persons"
// Integrate with the express backend
const baseUrl = "/api/persons"

const getAll = () => axios.get(baseUrl)
  .then(res => res.data)

const create = (obj) => axios.post(baseUrl, obj)
  .then(res => res.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)
  .then(res => res.data)

const update = (id, obj) => axios.put(`${baseUrl}/${id}`, obj)
  .then(res => res.data)


export default
{
  getAll,
  create,
  remove,
  update
}
