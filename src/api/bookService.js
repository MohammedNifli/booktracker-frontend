
import axiosClient from "./axiosClient";

export const getBooks=()=>axiosClient.get('/books')
export const addBook=(data)=>axiosClient.post('/books',data)
export const getBookById=(id)=>axiosClient.get(`/books/${id}`)

export const deleteBook = (id) => axiosClient.delete(`/books/${id}`);

export const updateBook = (id, updatedData) => axiosClient.put(`/books/${id}`, updatedData);
