import qs from 'qs'
import axios from 'axios'

const BASE_URL = 'https://api.imgur.com'

export default {
  login(clientId) {
    window.location = `${BASE_URL}/oauth2/authorize?${qs.stringify({
      client_id: clientId,
      response_type: 'token',
    })}`
  },
  fetchImages(token) {
    return axios.get(`${BASE_URL}/3/account/me/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  uploadImages(images, token) {
    const promises = Array.from(images).map(image => {
      const formData = new FormData()
      formData.append('image', image)

      return axios.post(`${BASE_URL}/3/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })

    return Promise.all(promises)
  },
}
