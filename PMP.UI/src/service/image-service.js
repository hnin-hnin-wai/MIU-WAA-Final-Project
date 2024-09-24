import API from './base-service';

const ImageService = {
  getAllImages: async function () {
    let result = await API.get('/images/all');
    return result.data;
  },

  uploadImage: function (fileFormData) {
    return API.post('/images/upload', fileFormData);
  },
  getPropertyImages: function(id){
    return API.get('/images/'+id);
  },
  upload3DImage: function (fileFormData) {
    return API.post('/image3d', fileFormData);
  },
  getProperty3DImages: async function (id) {
    let result = await API.get(`/image3d/${id}`);
    return result.data;
  }
  //
};

export default ImageService;
