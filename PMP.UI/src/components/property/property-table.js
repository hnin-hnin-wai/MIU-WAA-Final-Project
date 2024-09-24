import { Table } from "react-bootstrap";

const PropertyTable = ({ data, action }) => {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full">
                        <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3 text-center font-medium">#</th>
                            <th className="px-6 py-3 text-center font-medium">Address</th>
                            <th className="px-6 py-3 text-center font-medium">Status</th>
                            <th className="px-6 py-3 text-center font-medium">Type</th>
                            {typeof action === "function" && (
                                <th className="px-6 py-3 text-center font-medium">Action</th>
                            )}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data ? (
                            data.map((d, index) => (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-no-wrap text-center">{d.id}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-center">{d.address?.line1}, {d.address?.state}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-center">{d.status}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-center">{d.propertyType}</td>
                                    {typeof action === "function" && (
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            {action(d)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">No recent property added</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropertyTable;
