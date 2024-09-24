import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { UserService } from "../../service/userservice"
import "./styles.css"
import Logo from "../Logo";

const LeftPanel = () => {
    const [role, setRole] = useState({})
    const location = useLocation();
    const reloadRole = () => {
        setRole({
            isAdmin: UserService.isAdmin(),
            isOwner: UserService.isOwner(),
            isCustomer: UserService.isCustomer()
        });

    }
    useEffect(() => {
        reloadRole();
        setIsLoggedIn(UserService.isAuthenticated());
    }, [location])
    const getAddminLink = () => {
        return <>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/admin/dashboard">
                    <i className={"material-icons"}>dashboard</i>
                    <span className="nav-link-text ms-1">Dashboard</span>
                </Link>
            </li>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/admin/properties">
                    <i className={"material-icons"}>apartment</i>
                    <span className="nav-link-text ms-1">Properties</span>
                </Link>
            </li>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/admin/offers-history">
                    <i className={"material-icons"}>schedule</i>
                    <span className="nav-link-text ms-1">Offers History</span>
                </Link>
            </li>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/admin/users">
                    <i className={"material-icons"}>group</i>
                    <span className="nav-link-text ms-1">Users</span>
                </Link>
            </li>
        </>
    }
    const getOwnerLink = () => {
        return <>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/owner/properties">
                    <i className={"material-icons"}>apartment</i>
                    <span className="nav-link-text ms-1">My Properties</span>
                </Link>
            </li>
        </>
    }
    const getCustomerLink = () => {
        return <>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/customer/properties">
                    <i className={"material-icons"}>apartment</i>
                    <span className="nav-link-text ms-1">
                        List Properties
                    </span>
                </Link>
            </li>
            <li className="nav-item hover:bg-indigo-200">
                <Link className="nav-link text-black " to="/customer/favourites">
                    <i className={"material-icons"}>favorite</i>
                    <span className="nav-link-text ms-1">
                        Favorites
                    </span>
                </Link>
            </li>
            <li className={"nav-item hover:bg-indigo-200"}>
                <Link className="nav-link text-black " to="/customer/offers-history">
                    <i className={"material-icons"}>money</i>
                    <span className="nav-link-text ms-1">
                        Offers History
                    </span>
                </Link>
            </li>
        </>
    }

    const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated());

    if (!isLoggedIn) {
        return "";
    }
    return <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 custom-nav bg-indigo-100"
        id="sidenav-main">

        <div className="sidenav-header">
            <Link to={"/"} className="navbar-brand m-0" target="_blank">
                <Logo/>
            </Link>
        </div>


        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
                {role.isAdmin ? getAddminLink() : ""}
                {role.isOwner ? getOwnerLink() : ""}
                {role.isCustomer ? getCustomerLink() : ""}
                <li className="nav-item hover:bg-indigo-200">
                    <Link className="nav-link text-black" to="/messages">
                        <i className={"material-icons"}>mail</i>
                        <span className="nav-link-text ms-1">Messages</span>
                    </Link>
                </li>
            </ul>
        </div>

    </aside>
}

export default LeftPanel