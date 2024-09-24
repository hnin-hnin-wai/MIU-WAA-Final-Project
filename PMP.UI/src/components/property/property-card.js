import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = (props) => {

  const extract_image = () => {
    let property = props.property;
    return 'data:image/png;base64,' + property.thumbs;
  };

  const numberFormat =(q) => {
    return q.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
   } 

  const extract_subtitle = () => {
    let address = props.property.address;
    let result = '';
    if(address.line1) result += address.line1 +', ';
    if(address.city) result += address.city+', ';
    if(address.state) result += address.state+', ';
    if(address.postalCode) result += address.postalCode;
    return result;
  }; 

  return (
    <Link className="card-link" to={`/properties/${props.property.id}`}>
    <Card style={{ margin: '2px', paddingLeft: '0px',paddingRight: '0px', }}>
      <Card.Img variant="top" src={extract_image()} style={{ minHeight:'280px', maxHeight: '280px' }}  />
      <Card.Body style={{minHeight:'150px'}}>
        <span className='property-status'></span>
        <span >{props.property.status}</span>
        <Card.Title>{ numberFormat(props.property.price)}</Card.Title>      
        <Card.Text>  
          {extract_subtitle()}
        </Card.Text> 

      </Card.Body>
    </Card>
    </Link>
  );
};

export default PropertyCard;
