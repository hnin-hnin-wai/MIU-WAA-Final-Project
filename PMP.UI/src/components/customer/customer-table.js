import { Table } from "react-bootstrap"

const CustomerTable = ({ data }) => {

    return <Table className="table align-items-center justify-content-center mb-0">
        <thead>
            <tr>
                <th className="text-center">#</th>
                <th className="">Name</th>
                <th className="text-center">Created Date</th>
            </tr>
        </thead>
        <tbody>
            {data ? data.map((d, index) => {
                return <tr key={d.id}>
                    <td className="text-sm text-secondary font-weight-bold mb-0 text-center">{index}</td>
                    <td className="text-sm text-secondary font-weight-bold mb-0">{d.name}</td>
                    <td className="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"> {d.createdDate}</span>
                    </td>
                </tr>
            }) : "No recent customer added"}
        </tbody>
    </Table>
}

export default CustomerTable