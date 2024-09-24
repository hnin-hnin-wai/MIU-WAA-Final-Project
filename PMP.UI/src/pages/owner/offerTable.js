import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import OwnerService from "../../service/owner-service";
import { Link, useParams } from "react-router-dom";
import MessageDialog from '../../components/messages/message-dialog';
import { OfferStatus } from '../../constant/OfferStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OfferTable = ({ action }) => {

    const { id } = useParams();

    const [offers, setOffers] = useState([]);

    const [completeStatus,setCompleteStatus]=useState(true);

    const fetchOffersByPropertyID = (pid) => {

        OwnerService.getOfferByProperty(pid).then(
            response => {
                setOffers(response);
            }
        ).catch(err => console.log(err.message));

    }

    useEffect(() => {

        fetchOffersByPropertyID(id);

    }, [id]);

    const [ownerId, setOwnerId] = useState();//Need to ask Anh

    const [selectedStatus, setSelectedStatus] = useState(null);

    const statusHandleChange = (event) => {

        setSelectedStatus(event);

        fetchOffersByStatus(event);
    }

    //Need to handle get offers by status 
    const fetchOffersByStatus = (status) => {

        OwnerService.getOfferByStatus(status).then(res => {
            setOffers(res);
        })
    }
 
    const acceptHandleChange = (d) => {
        const data = {
            offerId: d.id
        }

        let result = window.confirm('Are you sure you want to Approve?');
        if((d.status!="contingent")){
          
            if (result) {
                OwnerService.acceptOffer(d.id, data).then(response => {
                    console.log(response);
                    alert("Offer Accepted");
                    fetchOffersByPropertyID(id);
                }).catch(error => console.log(error.message));
            }

            setCompleteStatus(true);
        }else{
           
            if (result) {
                OwnerService.acceptOfferAfterCustomer(d.id, data).then(response => {
                    console.log(response);
                    alert("Offer Completed");
                    fetchOffersByPropertyID(id);
                }).catch(error => console.log(error.message));
            }

            setCompleteStatus(false);
        }
      
      
    };

    const declineHandleChange = (d) => {

        const data = {
            offerId: d.id
        }
        let result = window.confirm('Are you sure you want to Approve?');

        if (result) {

            if(d.status!="completed"){
                OwnerService.cancelOffer(d.id, data)
                .then(res => {
                    console.log(res);
                    alert("Offer cancelled")
                    fetchOffersByPropertyID(id);
                }).catch(error => console.log(error.message));

                setCompleteStatus(true);
            }else{
                setCompleteStatus(false);
            }

        }
    }

    const getMessageIcon = () => {
        return <button type='button' class="btn-message btn btn-outline-warning" btn-sm style={{ marginLeft: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-arrow-up" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016" />
            </svg>
        </button>
    }
    return (
        <div>
           
           <div className="mt-5 mb-4 flex justify-content-between items-center px-4">
                <h1 className="text-1xl font-bolder leading-tight text-indigo-700 px-2">Customer Offer List</h1>
            
           </div>
            <div class="container">
                <div class="row">
                    <div class="col-1 col"></div>
                    <div class="col-2 col">
                    </div>
                    <div class="col-3 col">

                    </div>
                    <div class="col-4 col">
                        <Dropdown onSelect={(eventKey) => { statusHandleChange(eventKey) }}>
                            <Dropdown.Toggle id="dropdown-basic">
                                {selectedStatus ? selectedStatus : "Select by Status"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                <Dropdown.Item key={OfferStatus.created} eventKey={OfferStatus.created}>created</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.pending} eventKey={OfferStatus.pending}>pending</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.contingent} eventKey={OfferStatus.contingent}>Contingent</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.OwnerAccepted} eventKey={OfferStatus.OwnerAccepted}>Owner Accepted</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.CustomerAccepted} eventKey={OfferStatus.CustomerAccepted}>Customer Accepted</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.cancelled} eventKey={OfferStatus.cancelled}>cancelled</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.rejected} eventKey={OfferStatus.rejected}>rejected</Dropdown.Item>
                                <Dropdown.Item key={OfferStatus.completed} eventKey={OfferStatus.completed}>completed</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CUSTOMER
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">OFFER
                                    PRICE
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length >0 ? offers.map((d, index) => {
                                return <tr key={d.id}>
                                    {/*  <td>{d.id}</td> */}
                                    <td>{d.name}</td>
                                    <td>{d.amount}</td>
                                    <td>{d.status}</td>

                                    <td>
                                        <tr>
                                            <td>
                                                <Button variant="outline-success" style={{ marginRight: 10 ,display:completeStatus ? 'block' : 'none' }} onClick={() => acceptHandleChange(d)}>Accept</Button>{' '}
                                            </td>
                                            <td>
                                                <Button variant="outline-danger" style={{display:completeStatus ? 'block' : 'none'}} onClick={() => declineHandleChange(d)}>Decline</Button>{' '}
                                            </td>
                                            <td>
                                                <MessageDialog title={getMessageIcon()} receiver={{ id: d.customer_id, name: d.name }}></MessageDialog>
                                            </td>
                                        </tr>

                                        
                                        
                                    </td>

                                </tr>
                            }) : (
                                <tr>
                                    <td>No Offers!</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OfferTable;
