import axios from "axios";

const url = "http://localhost:8080/projects";

export async function getData() {
    return await axios.get(`${url}/getAllProjects`);
}

export async function deleteData(projectId) {
    return await axios.delete(`${url}/${projectId}`);
}

export async function PostData(data) {
    return await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json' 
        }
    });
}

export async function putData(projectId, data) {
    return await axios.put(`${url}/${projectId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
