import { useEffect, useState } from 'react';
import { STATE_LIST } from '../../constant/StatesList';
import { PROPERTY_TYPES } from '../../constant/PropertyType';
import { Container, Dropdown, Form, Button } from 'react-bootstrap';

import { PropertyService } from '../../service/property';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const EditProperty = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState({});
  const [address, setAddress] = useState({});

  const loadProperty = () => {
    let pid = searchParams.get("id");
    console.log(pid);
    PropertyService.getPropertyById(pid).then((res) => {
      console.log(res);
      setProperty(res);
      setAddress(res.address);
    });
  }

  useEffect(() => {
    loadProperty();
  }, []);

  const handlePropertyType = (selectedType) => {
    setProperty({ ...property, propertyType: selectedType });
  };

  const handleDropdownSelect = (selectedState) => {
    setAddress({ ...address, state: selectedState });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(property);

    PropertyService.updateProperty(property)
      .then((res) => {
        console.log(res);
        setProperty(res);
      })
      .catch((error) => {
        console.log(error);
      });

    PropertyService.updateProperty(property).then((res) => {
      navigate('/owner/upload-images?id=' + res.id);
    });
  };

  return (
    <>
      <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2" style={{ margin: 30 }}>
        <Link to="/owner/properties">Back to properties</Link>
        <span className={"text-gray-500 mx-4"}> / </span>
        Edit property
      </div>

      <h1 style={{ textAlign: 'center' }}>Edit property</h1>
      <Container fluid="md">
        <Form className="sm">
          <Form.Group className="mb-3" controlId="propertyType">
            <Form.Label>Property Type</Form.Label>
            <Dropdown onSelect={handlePropertyType}>
              <Dropdown.Toggle id="dropdown-basic">
                {property.propertyType
                  ? property.propertyType
                  : 'Select property type'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {PROPERTY_TYPES.map((pType) => (
                  <Dropdown.Item key={pType.type} eventKey={pType.type}>
                    {pType.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group className="mb-3" controlId="propertyPrice">
            <Form.Label>Property Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter property price"
              name="propertyPrice"
              value={property.price}
              onChange={(e) => {
                setProperty({ ...property, price: e.target.value });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="numberOfRoom">
            <Form.Label>Number of Room</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of rooms"
              name="numberOfRoom"
              value={property.numberOfRoom}
              onChange={(e) => {
                setProperty({ ...property, numberOfRoom: e.target.value });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="street">
            <Form.Label>Street Address </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              name="street"
              value={address.line1}
              onChange={(e) => {
                setAddress({ ...address, line1: e.target.value });
                setProperty({ ...property, address: address });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="line2">
            <Form.Label>Street Address Line 2 </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              name="line2"
              value={address.line2}
              onChange={(e) => {
                setAddress({ ...address, line2: e.target.value });
                setProperty({ ...property, address: address });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={address.city}
              onChange={(e) => {
                setAddress({ ...address, city: e.target.value });
                setProperty({ ...property, address: address });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="state">
            <Form.Label>State</Form.Label>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle id="dropdown-basic">
                {address.state ? address.state : 'Select State'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {STATE_LIST.map((state) => (
                  <Dropdown.Item key={state.code} eventKey={state.name}>
                    {state.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              name="postalCode"
              value={address.postalCode}
              onChange={(e) => {
                setAddress({ ...address, postalCode: e.target.value });
                setProperty({ ...property, address: address });
              }}
              required
            />
          </Form.Group>

          <Button variant="primary" onClick={submitForm}>
            Save
          </Button>
        </Form>
      </Container></>
  );

}

export default EditProperty
