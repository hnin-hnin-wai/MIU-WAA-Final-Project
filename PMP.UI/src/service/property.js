import { ROLES } from '../constant/Roles';
import API from './base-service';

export const PropertyService = {
  getPropertyByStatus: async function (status) {
    let result = await API.get(`/properties/status/${status}`);
    return result.data;
  },
  getPropertyById: async function (id) {
    let result = await API.get(`/properties/${id}`);
    return result.data;
  },
  getMyProperties: async function () {
    let result = await API.get(`/properties/my`);
    return result.data;
  },
  approveProperty: async function (id) {
    let result = await API.get(`/properties/${id}/approval`);
    return result.data;
  },

  addProperty: async function (property) {
    let result = await API.post(`/properties`, property);
    return result.data;
  },

  updateProperty: async function (property) {
    let result = await API.put(`/properties/${property.id}`, property);
    return result.data;
  },
  searchProperty: async function (data) {
    let result = await API.post(`/properties/filters`, data, {headers: {"Content-Type": "application/json"}});
    return result.data;
    },
  getProperties: async function () {
    let result = await API.get(`/properties`);
    return result.data;
  },
  changePropertyStatus: async function (id, status) {
    let result =  await API.put(`/properties/${id}/status/${status}`);
    return result.data;
  }
}

export default PropertyService;
