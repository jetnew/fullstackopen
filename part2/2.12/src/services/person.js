import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(response => response.data)
}

const deletePerson = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const put = newObject => {
    return axios
        .put(`${baseUrl}/${newObject.id}`, newObject)
        .then(response => response.data)
}

export default { create, getAll, deletePerson, put }