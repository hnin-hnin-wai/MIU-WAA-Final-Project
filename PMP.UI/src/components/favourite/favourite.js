import React, { useEffect, useState } from "react"
import { FavouriteService } from "../../service/favourite-service"
import './favourite.scss'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Favourite = () => {
    const [favourites, setFavourites] = useState([])
    const loadMyFavourite = () => {
        FavouriteService.getMyFavourite().then(res => {
            setFavourites(res);
        })
    }
    const removeFavourite = (e, id) => {
        FavouriteService.removeFavourite(id).then(res => {
            toast('🦄 Deleted from favourites!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            loadMyFavourite();
        })
    }
    useEffect(() => {
        loadMyFavourite();
    }, [])
    return <>
        <div className="w-full h-screen">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="mt-5 mb-4 flex justify-content-between items-center">
                        <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
                            Customer
                            <span className={"text-gray-500 mx-4"}> / </span>
                            Offers History
                        </div>
                    </div>
                    <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div
                            className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3 text-center font-medium">
                                        Property Address
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Property Type
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {favourites.map((favorite, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                                            <div
                                                className={`text-sm leading-5 rounded-full py-2`}>
                                                <Link
                                                    to={"/properties/" + favorite.property.id}>{favorite.property.address.line1} </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            <div className="text-sm leading-5 text-gray-900 text-center">
                                                {favorite.property.propertyType}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-center">
                                            <div className="flex items-center justify-content-center text-green-600">
                                                <button onClick={(e) => {
                                                    removeFavourite(e, favorite.id)
                                                }} className="mr-6 text-red-600 hover:text-red-900 focus:outline-none focus:underline flex items-center">
                                                    <i className="material-icons">block</i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
}

export default Favourite