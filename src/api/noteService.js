// noteService.js
import axiosClient from "./axiosClient";

// Pass `id` and `content` to the function
export const addNote = (id, content) => {
  return axiosClient.post(`/books/${id}/notes`, { content });
};
