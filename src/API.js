import axios from "axios";

export default options =>
  new Promise((resolve, reject) => {
    axios({
      url: options.url,
      headers: {
        ...options.headers
      },
      method: options.method,
      params: options.params,
      data: options.data,
      responseType: options.responseType
    })
      .then(resourse => {
        resolve(resourse.data);
      })
      .catch(error => {
        reject(error);
      });
  });
