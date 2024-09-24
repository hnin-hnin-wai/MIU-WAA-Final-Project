import { ROLES } from "../constant/Roles";
import API from "./base-service"

export const AdminService = {
    
    getDashboard: async function () {
        let result = await API.get("/admin/dashboard");
        return result.data;
    },
    approveOwner: async function (id) {
        let result = await API.post(`/admin/owners/${id}/approval`,{});
        return result.data;
    },
    getOffersHistory: async function(){
        let result = await API.get("/admin/offers/history");
        return result.data;
    }

}