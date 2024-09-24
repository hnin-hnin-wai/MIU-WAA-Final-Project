import { ROLES } from "../constant/Roles";
import API from "./base-service"

export const UserService = {
    getUser: function () {
        let token = sessionStorage.getItem("access_token");
        if (!token)
            return null;
        let payload = JSON.parse(token).access_token.split(".")[1];
        let user = JSON.parse(atob(payload)).user;
        return user
    },
    isInRole: function (role) {
        let user = this.getUser();
        if (!user)
            return false;

        let index = user.roles.findIndex(r => r.name === role)
        return index !== -1;
    },
    isAdmin: function () {
        return this.isInRole(ROLES.ADMIN)
    },
    isCustomer: function () {
        return this.isInRole(ROLES.CUSTOMER)
    },
    isOwner: function () {
        return this.isInRole(ROLES.OWNER)
    },
    isAuthenticated: function () {
        let token = sessionStorage.getItem("access_token");
        return token;
    },
    login: async function (data) {
        let result = await API.post("/authenticate/login", data)
        console.log(result.data);
        sessionStorage.setItem("access_token", JSON.stringify(result.data))
        return result.data;
    },
    register: async function (data) {
        let result = await API.post("/authenticate/registers", data)
        console.log(result.data);
        return result.data;
    },
    logout: async function () {
        sessionStorage.removeItem("access_token")
    },
    getUserByRole:async function(role){
        let result = await API.get("/users/roles/" + role)
        return result.data;
    },
    getMyMessage : async function(){

    }

}