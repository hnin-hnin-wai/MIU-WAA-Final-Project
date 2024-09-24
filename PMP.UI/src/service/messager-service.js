import { ROLES } from "../constant/Roles";
import API from "./base-service"

export const MessageService = {
    
    getMyMessage: async function () {
        let result = await API.get("/messages/my");
        return result.data;
    },
    sendMessage: async function (message) {
        let result = await API.post(`/messages`,message);
        return result.data;
    },


}