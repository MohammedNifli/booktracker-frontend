
import axiosClient from "./axiosClient";


export const addNote = (id, content) => {
  return axiosClient.post(`/books/${id}/notes`, { content });
};

export const getAllNotes=(id)=>axiosClient.get(`/books/${id}/notes`)

export const deleteNote=(id)=>axiosClient.delete(`books/${id}/notes`)