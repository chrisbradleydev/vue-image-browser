import api from '../../api/imgur'
import { router } from '../../main'
import * as types from '../types'

export const state = {
  images: [],
}

export const getters = {
  allImages: state => state.images,
}

export const mutations = {
  [types.SET_IMAGES](state, { images }) {
    state.images = images
  },
}

export const actions = {
  async fetchImages({ commit, rootState }) {
    const { token } = rootState.auth
    const resp = await api.fetchImages(token)
    commit(types.SET_IMAGES, {
      images: resp.data.data,
    })
  },
  async uploadImages({ rootState }, images) {
    const { token } = rootState.auth
    await api.uploadImages(images, token)
    router.push('/')
  },
}
