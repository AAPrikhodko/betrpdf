import axios from "axios";
import {IPdfData} from "../services/types";

const API_URL = " https://639335b5ab513e12c50722ff.mockapi.io"
axios.defaults.baseURL = API_URL

export const DataService = {
    async getData(){
        return axios.get<IPdfData[]>('/job')
    }
}