import axios from 'axios';
import { apiUrl } from '@/env';
import { IUserProfile } from './interfaces';
import {Dictionary} from 'vue-router/types/router';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/login/access-token`, params);
  },

  async logInSteam(postParams: Dictionary<any>) {
      return axios.post(`${apiUrl}/api/login/steam-access-token`, postParams);
  },

  async getMe(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/api/users/me`, authHeaders(token));
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(`${apiUrl}/api/users/`, authHeaders(token));
  },
  async updateUser(token: string, id: number, data: Object) {
    return axios.put(`${apiUrl}/api/users/update/${id}`, data, authHeaders(token));
  },
  async getFilters(token: string) {
    return axios.get(`${apiUrl}/api/filters/`, authHeaders(token));
  },
  async createFilter(token: string, data: Object) {
    return axios.post(`${apiUrl}/api/filters/create`, data, authHeaders(token));
  },
  async updateFilter(token: string, id: number, data: Object) {
    return axios.put(`${apiUrl}/api/filters/update/${id}`, data, authHeaders(token));
  },
  async deleteFilter(token: string, id: number) {
    return axios.delete(`${apiUrl}/api/filters/delete/${id}`, authHeaders(token));
  },
  async readFiltersByUser(token: string, id: number) {
    return axios.get(`${apiUrl}/api/filters/read_filters_by_user/${id}`, authHeaders(token));
  }
};
