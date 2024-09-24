import { ROLES } from '../constant/Roles';
import API from './base-service';


export const CustomerService = {
    getPropertiesList: async function () {
        let result = await API.get(`/properties`);
        return result.data;
    },
    getOffers: async function () {
        let result = await API.get(`/offers/user`);
        return result.data;
    },
    cancelOffer: async function (id) {
        let result = await API.post(`/offers/${id}/cancel`,{});
        return result.data;
    },
    acceptOffer: async function (id) {
        let result = await API.post(`/offers/${id}/accept`,{});
        return result.data;
    },
    getPropertyById: async function (id) {
        let result = await API.get(`/properties/${id}`);
        return result.data;
    },
}

export default CustomerService;
