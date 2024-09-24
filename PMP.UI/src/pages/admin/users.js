import React, { useEffect, useState } from "react";
import { AdminService } from "../../service/admin-service";
import { UserService } from "../../service/userservice";
import { Navigate } from "react-router";
import { ROLES } from "../../constant/Roles";
import { Button } from "react-bootstrap";
import './admin.scss'; // Import Tailwind CSS file

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [filterRole, setFilterRole] = useState(ROLES.OWNER);
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

    const reloadUser = () => {
        UserService.getUserByRole(filterRole).then(res => {
            console.log(res);
            setUserList(res);
        });
    };

    useEffect(() => {
        reloadUser();
    }, [filterRole]);

    const approveOwner = (e, user) => {
        e.preventDefault();
        console.log(user);
        AdminService.approveOwner(user.id).then(res => {
            alert("Owner is Approved");
            reloadUser();
        });
    };

    const onRoleChange = (e) => {
        setFilterRole(e.target.value);
    };

    return (
        <>
            {!isAdmin ? <Navigate to="/403" /> : (
                <div className="px-4">
                    <div className="mt-5 mb-4 flex justify-content-between items-center">
                        <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
                            Admin
                            <span className={"text-gray-500 mx-4"}> / </span>
                            Users
                        </div>
                        <div className="mb-4 flex justify-between items-center">
                            <select
                                className={"bg-indigo-600 text-white font-montserrat py-2 px-2 font-medium rounded-lg hover:bg-indigo-500 transition-all duration-300"}
                                onChange={(e) => onRoleChange(e)}>
                                <option value={ROLES.OWNER}>Owner</option>
                                <option value={ROLES.CUSTOMER}>Customer</option>
                                <option value={ROLES.ADMIN}>Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {userList.map((user, index) => (
                                        <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{user.roles[0]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.pending === true ? 'bg-orange-200 text-orange-600' : 'bg-green-200 text-green-600'}`}>
                                                    {user.pending === true ? "Pending" : "Approved"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-content-center items-center">
                                                {user.pending && (
                                                    <button
                                                        onClick={(e) => approveOwner(e, user)}
                                                        className="text-green-600 hover:text-green-900 focus:outline-none focus:underline flex items-center"riant="primary">
                                                        <span className={"mx-2 text-blue-700"}>Approve </span>
                                                        <i className="material-icons mr-1 text-blue-700">task_alt</i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {userList.length === 0 && (
                                        <tr>
                                            <td colSpan="4"
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No
                                                recent customer added
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
