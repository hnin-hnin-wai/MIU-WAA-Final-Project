import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import PropertyTable from "../../components/property/property-table"
import React, { useEffect, useState } from "react";
import { PropertyService } from "../../service/property";
import { PropertyStatus } from "../../constant/PropertyStatus";
import {toast, ToastContainer} from "react-toastify";

const OwnerProperty = () => {
    const [properties, setProperties] = useState([]);

    const fetchProperties = () => {
        PropertyService.getMyProperties().then((res) => {
            setProperties(res);
        });
    }
    console.log(properties);
    useEffect(() => {
        fetchProperties();
    }, []);
    
    const deleteProps = (id) => {
        PropertyService.changePropertyStatus(id, PropertyStatus.Deleted).then(
            res => {
                toast('🦄 Successfully deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                fetchProperties();
            }
        );
    }

    const getAction = (property) => {
        return (
            <div className="flex items-center justify-end text-green-600">
                <Link to={'/owner/edit-property?id='+property.id}
                      className="text-orange-200 hover:text-orange-300 focus:outline-none focus:underline flex items-center mr-6">
                    <i className="material-icons mr-1 text-orange-500">edit</i>
                </Link>
                <button onClick={() => deleteProps(property.id)} variant="outline-danger btn-sm"
                        className="text-red-800 hover:text-red-900 focus:outline-none focus:underline flex items-center mr-6">
                    <i className={"material-icons"}>block</i>
                </button>
                <Link to={'/owner/' + +property.id + '/offerlist'}
                      className="text-green-600 hover:text-green-900 focus:outline-none focus:underline flex items-center">
                    <span className={"mx-2 text-green-800"}>View offers </span>
                    <i className="material-icons mr-1 text-green-800">login</i>
                </Link>
            </div>
        )
    }

    return <>
        <div className="mt-5 mb-4 flex justify-content-between items-center px-4">
            <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
                Owner
                <span className={"text-gray-500 mx-4"}> / </span>
                Properties
            </div>
            <Link to={'add-property'}
                className={"bg-indigo-600 text-white font-montserrat py-1 px-3 font-medium rounded-full hover:bg-indigo-500 transition-all duration-300"}>
                + Add property
            </Link>
        </div>
        <div class="px-4">
            <PropertyTable allowEdit={true} data={properties} action={getAction}></PropertyTable>
        </div>
        <ToastContainer/>
    </>
}

export default OwnerProperty