import React, { useEffect, useState } from 'react';
import PropertyTable from '../../components/property/property-table';
import PropertyService from '../../service/property';
import SendMessage from '../../components/messages/send-message';
import { Button, Modal } from 'react-bootstrap';
import MessageDialog from '../../components/messages/message-dialog';
import { PropertyStatus } from '../../constant/PropertyStatus';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [receiver, setReceiver] = useState({});
  // const [showMessage, setShowMessage] = useState(false);
  const getProppertiesByStatus = () => {
    PropertyService.getPropertyByStatus().then((res) => {
      setProperties(res);
    });
  };
  const approveProperty = (e, property) => {
    e.preventDefault();
    let result = window.confirm('Are you sure you want to Approve?');
    if (result) {
      PropertyService.approveProperty(property.id).then((res) => {
        alert('Property Approved');
        getProppertiesByStatus();
      });
    }
  };
  // const sendMessage = (e, property) => {
  //   e.preventDefault();
  //   setReceiver({ id: property.ownerId, name: property.ownerName });
  //   showDialog();
  // };

  const getAction = (sender) => {
    let property = sender;
    return (
      <div className={"flex items-center justify-center"}>
        <a
          className="text-green-600 hover:text-green-900 focus:outline-none focus:underline flex items-center mr-4"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <MessageDialog
            title={"Send message"}
            receiver={{id:property.ownerId, name:property.ownerName}}
          ></MessageDialog>
        </a>
        {property.status === PropertyStatus.Waiting ? (
          <a
            className="text-green-600 hover:text-green-900 focus:outline-none focus:underline flex items-center"
            href="#"
            onClick={(e) => approveProperty(e, sender)}
          >
            <span className={"mx-2 text-blue-800"}>Approve </span>
            <i className="material-icons mr-1 text-blue-800">task_alt</i>
          </a>
        ) : (
          ''
        )}
      </div>
    );
  };
  // const getDialog = () => {
  //   return (
  //     <MessageDialog
  //       show={showMessage}
  //       onClose={handleClose}
  //       receiver={receiver}
  //     ></MessageDialog>
  //   );
  // };
  useEffect(() => {
    getProppertiesByStatus();
  }, []);
  return (
    <div className={"px-4 mt-6"}>
      <div className="mt-4 mb-4 flex justify-content-between items-center">
        <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2">
          Admin
          <span className={"text-gray-500 mx-4"}> / </span>
          Properties
        </div>
      </div>

      <PropertyTable data={properties} action={getAction}></PropertyTable>
    </div>
  );
};

export default AdminProperties;
