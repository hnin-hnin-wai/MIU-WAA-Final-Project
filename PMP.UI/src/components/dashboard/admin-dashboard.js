import React, { useEffect, useState } from "react"
import { AdminService } from "../../service/admin-service";
import PropertyTable from "../property/property-table";
import CustomerTable from "../customer/customer-table";
import './dashboard.scss'
const AdminDashBoard = () => {

    const [dashboard, setDashboard] = useState({});
    useEffect(() => {
        AdminService.getDashboard().then(res => {
            setDashboard(res)
        })
    }, [])
    return <>
        <div className="mt-6 mb-4 flex justify-content-between items-center px-4">
            <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
                Admin
                <span className={"text-gray-500 mx-4"}> / </span>
                Dashboard
            </div>
        </div>
        <div className="admin-dashboard px-4">
            <div className="dashboard-block col-5">
                <div class="card mb-4 ">
                    <div class="d-flex">

                        <h6 class="mt-3 mb-2 ms-3 ">Recent customer</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">

                            <CustomerTable data={dashboard.recentCustomers}>
                            </CustomerTable>

                        </div>
                    </div>
                </div>

            </div>
            <div className="dashboard-block col-6">
                <div class="card mb-4 ">
                    <div class="d-flex">

                        <h6 class="mt-3 mb-2 ms-3 ">Recent rented Property</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">

                            <PropertyTable data={dashboard.recentRented}></PropertyTable>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminDashBoard