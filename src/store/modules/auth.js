import qs from 'qs'
import api from '../../api/imgur'
import { router } from '../../main'
import * as types from '../types'

export const state = {
  token: window.localStorage.getItem('imgur_token'),
}

export const getters = {
  isLoggedIn: state => !!state.token,
}

export const mutations = {
  [types.SET_TOKEN](state, { token }) {
    state.token = token
  },
}

export const actions = {
  /* eslint-disable no-empty-pattern */
  login({}, clientId) {
    api.login(clientId)
  },
  finalizeLogin({ commit }, hash) {
    const callback = qs.parse(hash.replace('#', ''))
    commit(types.SET_TOKEN, {
      token: callback.access_token,
    })
    window.localStorage.setItem('imgur_token', callback.access_token)
    router.push('/')
  },
  logout({ commit }) {
    commit(types.SET_TOKEN, {
      token: null,
    })
    window.localStorage.removeItem('imgur_token')
    router.push('/')
  },
}
