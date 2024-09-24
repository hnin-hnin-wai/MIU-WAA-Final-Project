import { ROLES } from "../constant/Roles";
import API from "./base-service"

export const FavouriteService = {
    
    getMyFavourite: async function () {
        let result = await API.get("/favourites/my");
        return result.data;
    },
    addToMyFavourite: async function (data) {
        let result = await API.post("/favourites",data, {headers: { "Content-Type": "application/json"}});
        return result.data;
    },
    removeFavourite: async function (id) {
        let result = await API.delete(`/favourites/${id}`);
        return result.data;
    },


}