import axios from "axios";

const API = "https://api.imgur.com";

const uploadPicture = async (picture) => {
  const config = {
    headers: {
      Authorization: {
        "Client-ID": "9f7b9caadb5366b",
      },
    },
  };
  const response = await axios.post(`${API}/3/image`, picture, config);
  return response.data;
};

export { uploadPicture };
