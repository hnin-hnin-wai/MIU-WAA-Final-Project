import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropertyService from '../../service/property';
import ImageService from '../../service/image-service';
import { Pannellum } from 'pannellum-react';
import { Carousel } from 'react-bootstrap';
import PropertyDescription from './property-description';

const PropertyDetails = (props) => {
  const { id } = useParams();

  const [property, setProperty] = useState({});
  const [address, setAddress] = useState({});

  const [images, setImages] = useState([]);
  const [image3d, setImage3d] = useState({
    image: '',
  });

  useEffect(() => {
    loadPropertyDetails();
    load3DImage();
    loadAllImages();
  }, [id]);

  const load3DImage = () => {
    let pid = id;
    ImageService.getProperty3DImages(pid).then((res) => {
      console.log(res);
      setImage3d(res);
    });
  };

  const loadAllImages = () => {
    let pid = id;
    ImageService.getPropertyImages(pid).then((res) => {
      setImages(res.data);
    });
  };

  const extract_image = (image3d) => {
    return 'data:image/png;base64,' + image3d;
  };

  const numberFormat = (q) => {
    return q.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  };

  const loadPropertyDetails = () => {
    let pid = id;
    console.log(pid);
    PropertyService.getPropertyById(pid).then((res) => {
      console.log(res);
      setProperty(res);
      setAddress(res.address);
    });
  };

  return (
    <>
      <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2" style={{ margin: 30 }}>
        <Link to="/customer/properties">Back to properties</Link>
        <span className={"text-gray-500 mx-4"}> / </span>
        Property detail
      </div>
      <div className="col-xs-1" align="center">



        <div className="w-80">
          {property && (
            <Pannellum
              height="640px"
              image={extract_image(image3d.image)}
              autoLoad
              autoRotate={-2}
              orientationOnByDefault={false}
              compass
              draggable
              keyboardZoom
              mouseZoom
              preview=""
              previewAuthor=""
              previewTitle=""
              showControls
              showFullscreenCtrl={true}
              showZoomCtrl
              hotspotDebug={false}
            />
          )}
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <PropertyDescription property={property} />
        </div>
        <div className="mt-4 w-80">
          <Carousel>
            {images &&
              images.map((image, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      max-width="80%"
                      className="d-block w-100"
                      src={`data:image/png;base64,${image.image}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>
      </div>
    </>

  );
};

export default PropertyDetails;
