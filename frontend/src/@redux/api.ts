import axios from 'axios';
import { user_authentication } from '@localstorage';

const storage = user_authentication.get();

const token = storage?.token || "";

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token,
  },
});