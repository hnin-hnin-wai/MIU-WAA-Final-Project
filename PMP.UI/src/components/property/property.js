import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {FavouriteService} from "../../service/favourite-service";
import {UserService} from "../../service/userservice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyItem = ({ property, handleMakeOffer }) => {
  const extract_image = () => {
    return 'data:image/png;base64,' + property.thumbs;
  };

  useEffect(() => {

  }, []);

  const handleMakeFavorite = (id) => {
    const data = {
      userId: UserService.getUser().userId,
      propertyId: id
    }
    FavouriteService.addToMyFavourite(data);
    toast('🦄 Added to favourites!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="card">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <Link
          to={`/properties/${property.id}`}
          className="d-block blur-shadow-image"
        >
          <img
            className="img-fluid shadow border-radius-lg border-2"
            alt="property"
            variant="top"
            src={extract_image()}
          />
        </Link>
      </div>
      <div className="card-body">
        <div className={'d-flex mt-2 justify-content-between'}>
          <p className="font-weight-bold mx-auto">${property.price}</p>
        </div>
        <div className="mt-2 text-center flex items-center justify-content-between">
          <p className={'flex items-center'}>
            <i className={'material-icons'}>bed</i> {property.numberOfRoom} bds
          </p>
          <p>{property.propertyType}</p>
        </div>
        <div className={"flex justify-content-between mt-2"}>
          <h5 className="font-weight-normal mt-3">
            <i className="material-icons text-lg">place</i>
            {property.address.city}, {property.address.state}
          </h5>
          <div
              className={`text-sm leading-5 rounded-full py-2 px-3 ${property.status === 'Pending' ? 'bg-orange-200 text-orange-600' : property.status === 'Available' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
            {property.status}
          </div>
        </div>
      </div>
      <hr className="dark horizontal my-0"/>
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
        <Link
          to={`/properties/${property.id}/panorama`}
          className="flex items-center bg-green-600 text-white font-montserrat py-1 px-3 font-medium rounded-full hover:bg-green-500 transition-all duration-300"
        >
          <span className={'text-sm mr-2'}>3D Tour</span>
          <i className={'material-icons'}>view_in_ar</i>
        </Link>
        <button onClick={() => handleMakeFavorite(property.id)} className={"rounded-full px-2 py-2 text-white bg-red-700 hover:bg-red-600 flex items-center"}>
          <i className={"material-icons"}>favorite</i>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PropertyItem;
