import React, { useState, useEffect } from 'react';
import CustomerService from "../../service/customer-service";
import './customer.css';
import { Link } from 'react-router-dom';
import { OfferStatus } from '../../constant/OfferStatus';

const OfferHistory = () => {
    const [offers, setOffers] = useState([]);

    const reloadOffers = () => {
        CustomerService.getOffers().then(res => {
            setOffers(res)
        })
    }

    useEffect(() => {
        reloadOffers()
    }, []);

    const cancelOffer = (e, offer) => {
        e.preventDefault();
        CustomerService.cancelOffer(offer.id).then(res => {
            reloadOffers();
        })
    }

    const acceptOffer = (e, offer) => {
        e.preventDefault();
        CustomerService.acceptOffer(offer.id).then(res => {
            reloadOffers();
        })
    }

    if(offers.length == 0) return (
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
                </div>
            </div>
        </div>
    )

    return (
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
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Created Date
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {offers.map((offer, index) => (
                                    <tr key={index}>
                                       
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900 text-center">
                                                $ {offer.amount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                            {offer.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                            <span
                                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${offer.status === 'pending' ? 'bg-green-200 text-green-600' : offer.status === 'created' ? 'bg-blue-200 text-blue-600' : offer.status === 'contingent' ? 'bg-gray-300 text-gray-800' : 'bg-red-200 text-red-600'}`}>
                                                {offer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-center">
                                            <div className="flex items-center justify-end text-green-600">
                                                <button onClick={(e) => cancelOffer(e, offer)}
                                                   className={`mr-6 text-red-600 hover:text-red-900 focus:outline-none focus:underline flex items-center ${offer.status === 'created' ? "" : "hidden"}`}>
                                                    <span className={"mx-2 text-red-800"}>Cancel </span>
                                                    <i className="material-icons mr-1 text-red-800">block</i>
                                                </button>
                                                <button onClick={(e) => acceptOffer(e, offer)}
                                                   className={`mr-6 text-blue-600 hover:text-blue-900 focus:outline-none focus:underline flex items-center ${offer.status === OfferStatus.OwnerAccepted ? "" : "hidden"}`}>
                                                    <span className={"mx-2 text-blue-800"}>Accept </span>
                                                    <i className="material-icons mr-1 text-blue-800">task_alt</i>
                                                </button>
                                                <Link to={`/properties/${offer.propertyId}`}
                                                   className="text-green-600 hover:text-green-900 focus:outline-none focus:underline flex items-center">
                                                    <span className={"mx-2 text-green-800"}>Go to Property </span>
                                                    <i className="material-icons mr-1 text-green-800">login</i>
                                                </Link>                                                
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
    );
};

export default OfferHistory;
