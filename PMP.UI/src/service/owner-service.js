import { ROLES } from '../constant/Roles';
import API from './base-service';

export const OwnerService = {
    getOfferByProperty: async function (id) {
        let result = await API.get(`/owners/properties/${id}/offers`);
       return result.data;
    },
    getOfferByStatus: async function (status) {
      let result = await API.get(`/owners/offers/status/${status}`);
     return result.data;
  },
    acceptOffer:async function(offerId,data){
       let result = await API.post(`/offers/owner/${offerId}/accept`,data);
       return result.data;
    } ,
    cancelOffer:async function(offerId,data){
       let result = await API.post(`/offers/owner/${offerId}/cancel`,data);
       return result.data;
    },acceptOfferAfterCustomer:async function(offerId,data){
      let result = await API.post(`/offers/owner/${offerId}/accept-after-customer`,data);
      return result.data;
   } ,

}

export default OwnerService