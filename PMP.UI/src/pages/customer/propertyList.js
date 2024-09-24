import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './customer.css';
import CustomerService from "../../service/customer-service";
import PropertyItem from "../../components/property/property";
import PropertyFilter from "../../components/property/property-filter";
import PropertyService from "../../service/property";

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetchProperties("Available");
    }, []);

    // const fetchProperties = (status) => {
    //     CustomerService.getPropertiesList(status).then(res => {
    //         setProperties(res);
    //     });
    // };

    const handleMakeOffer = (propertyId) => {
        navigate(`/customer/properties/${propertyId}/offer`);
    };

    const handleSearch = (properties) => {
        setProperties(properties);
    };

    return (
        <Container fluid>
            <PropertyFilter onSearch={handleSearch} />
            <Row className="justify-content-center">
                {properties.map(property => (
                    <Col key={property.id} xs={12} sm={6} md={4} lg={3} className="mb-4 mt-6">
                        <PropertyItem property={property} handleMakeOffer={handleMakeOffer} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PropertyList;
