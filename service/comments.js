export default axios => ({
  getAll() {
    return axios.get('comments')
      .then(response => response.data)
  },

  getById(id) {
    return axios.get(`comments/${id}`)
      .then(response => response.data)
  },
});