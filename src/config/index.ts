import axios from "axios";

const connection = axios.create({
    baseURL: "http://universities.hipolabs.com",
});

export default connection