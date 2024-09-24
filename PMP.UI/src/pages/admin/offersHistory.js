import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AdminService} from "../../service/admin-service";

const OffersHistoryAdmin = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        AdminService.getOffersHistory().then(res => {
            setOffers(res)
        })
    }, []);

    return <>
        <div className="w-full h-screen">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="mt-5 mb-4 flex justify-content-between items-center">
                        <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
                            Admin
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
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Created User
                                    </th>
                                    <th className="px-6 py-3 text-center font-medium">
                                        Created Date
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {offers.map((offer, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                                <div className="text-sm leading-5 text-gray-900 text-center">
                                                    {offer.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${offer.status === 'pending' ? 'bg-green-200 text-green-600' : offer.status === 'created' ? 'bg-blue-200 text-blue-600' : offer.status === 'contingent' ? 'bg-gray-300 text-gray-800' : 'bg-red-200 text-red-600'}`}>
                                                    {offer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 text-center">
                                                {offer.createdUser.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 text-center">
                                                {offer.createdDate}
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
    </>
}

export default OffersHistoryAdmin;