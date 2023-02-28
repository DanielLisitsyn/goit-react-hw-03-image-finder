import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33085585-9ffaa73370f38d57c609e57e3';
const IMAGE_TYPE = 'image_type=photo';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${IMAGE_TYPE}&per_page=12`
  );

  return data;
};
