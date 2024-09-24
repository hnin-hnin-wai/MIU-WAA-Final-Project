import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { Link } from 'react-router-dom';
import MessageDialog from '../messages/message-dialog';

const PropertyDescription = (props) => {
  const property = props.property;

  const extract_image = () => {
    let property = props.property;
    return 'data:image/png;base64,' + property.thumbs;
  };

  const numberFormat = (num) => {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const extract_subtitle = () => {
    let address = props.property.address;
    if (!address) return '';
    let result = '';
    if (address.line1) result += address.line1 + ', ';
    if (address.city) result += address.city + ',';
    if (address.state) result += address.state + ', ';
    if (address.postalCode) result += address.postalCode;
    return result;
  };

  return (
    <div className="col-xs-1 w-80" align="center">
      <div class="row align-items-start">
        <div class="col">
          <div className="mt-2 text-left flex items-center justify-content-between">
            <div className="font-weight-bold w-100">
              <span className="proeprty-status">{property.status}</span>
              <br></br>
              <span className="property-price">
                {property.price && numberFormat(property.price)}
              </span>
              <br></br>
              <span>
                <i className={'material-icons'}>bed</i> {property.numberOfRoom}{' '}
                bds
              </span>
              <br></br>
              {extract_subtitle()}
              <br></br>
            </div>
          </div>
        </div>

        <div class="col">
          {' '}
          <div className="card-footer d-flex items-center justify-content-between">
            <Link
              to={`/properties/${property.id}/offer`}
              className="flex items-center bg-indigo-600 text-white font-montserrat py-1 px-3 font-medium rounded-full hover:bg-indigo-500 transition-all duration-300"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            >
              <span className={'text-sm mr-2'}>Send offer</span>
              <i className={'material-icons'}>send</i>
            </Link>

            <MessageDialog
              title={
                <Link
                  to={`/properties/${property.id}`}
                  className="flex items-center bg-primary text-white font-montserrat py-1 px-3 
                  font-medium rounded-full hover:bg-primary transition-all duration-300"
                  type="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  <span className={'text-sm mr-2'}>Send Message</span>
                  <i className={'material-icons'}>mail</i>
                </Link>
              }
              receiver={{ id: property.ownerId, name: property.ownerName }}
            ></MessageDialog>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyDescription;
