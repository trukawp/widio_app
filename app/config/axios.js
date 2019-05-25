import axios from "axios";
import { AsyncStorage } from 'react-native';

export default axios.create({
  baseURL: 'http://192.168.1.173:8080/api',
  headers: {
    authorization: AsyncStorage.getItem('__ut__')
  }
});
