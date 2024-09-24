import API from './base-service';

const PropertyImageService = {
  getAllImages: async function () {
    return API.get('/property/images');
  },

  uploadImage: async function (fileFormData) {
    return API.post('/property/images', fileFormData);
  },
};

export default PropertyImageService;
