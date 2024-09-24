import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router"
import { UserService } from "../../service/userservice"

const OwnerLandingPage = () => {
    const [isOwner, setIsOwner] = useState(UserService.isOwner());
    const location = useLocation();
    return <>
        {!isOwner ? <Navigate to="403"></Navigate> : ""}
        {location.pathname === "/owner" ? <Navigate to="/owner/properties"></Navigate> : ""}
        <Outlet></Outlet>
    </>
}
export default OwnerLandingPage