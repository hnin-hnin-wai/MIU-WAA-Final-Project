import React, { useEffect, useState } from 'react';
import { Pannellum } from 'pannellum-react';
import CustomerService from '../../service/customer-service';
import { useParams } from 'react-router';

const Panorama = () => {
  const [property, setProperty] = useState(null);
  const { propertyId } = useParams();

  useEffect(() => {
    CustomerService.getPropertyById(parseInt(propertyId)).then((res) => {
      setProperty(res);
    });
  }, [propertyId]);

  const extract_image = (image3d) => {
    return 'data:image/png;base64,' + image3d;
  };

  // Render the Pannellum component only if the property object is available
  return (
    <div className={'mt-4'}>
      {property && (
        <Pannellum
          width="100%"
          height="800px"
          image={extract_image(property.image3d)}
          autoLoad
          autoRotate={-2}
          author={property.ownerName}
          title={`$${property.price}`}
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
  );
};

export default Panorama;
