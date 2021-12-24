import fs from 'fs';
import path from 'path';

const api = {
  getAllFiles: () => {
    fs.readdir(path.resolve(__dirname, '/articles')).then((files) => console.log(files));
  },
};

export default api;
