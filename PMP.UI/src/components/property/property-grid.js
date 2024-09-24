import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PropertyCard from './property-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ImageService from '../../service/image-service';

import PropertyService from '../../service/property';

import './property.scss'

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);

  let propertyData = [];
  let imgs = [];

  useEffect(() => {
    //load data from server
  
    PropertyService.getProperties().then((res) => {
      console.log(res);
      propertyData = res;
      setProperties(propertyData);
  });
  }, []);

  return (
    <>
      <Row xs={2} md={4} className="g-4">
        {properties
          ? properties.map((property) => {
              return (
                <PropertyCard
                  className="col-4"
                  key={property.id}
                  property={property}
                />
              );
            })
          : 'No recent property added'}
      </Row>
    </>
  );
};
export default PropertyGrid;
