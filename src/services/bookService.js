import axios from 'axios';

// eslint-disable-next-line
export const postBook = (title, image) => axios.post('/books', { title, image });