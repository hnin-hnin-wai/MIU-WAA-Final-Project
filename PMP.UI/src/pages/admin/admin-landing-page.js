import { Navigate, Outlet, useLocation } from "react-router"
import AdminDashBoard from "../../components/dashboard/admin-dashboard"
import { Link } from "react-router-dom"
import './admin.scss'
import { useState } from "react"
import { UserService } from "../../service/userservice"
const AdminLandingPage = () => {
    const localtion = useLocation()
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin())
    return <>
        {!isAdmin ? <Navigate to="403"></Navigate> : ""}
        {localtion.pathname === "/admin" ? <Navigate to="/admin/dashboard"></Navigate> : ""}
        <Outlet></Outlet>
    </>
}
export default AdminLandingPage