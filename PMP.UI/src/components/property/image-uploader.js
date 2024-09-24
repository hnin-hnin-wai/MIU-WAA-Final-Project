import React, { useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import ImageService from '../../service/image-service';
import { ImagesViewer } from './image-viewer';

const ImagesUpload = (props) => {
  const [files, setFiles] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState(false);
  
  const [image3Dfile, setImage3Dfile] = React.useState(null);
  const [file3DUploaded, setFile3DUploaded] = React.useState(false);

  const [propertyId, setPropertyId] = React.useState();

  const [image3d, setImage3d] = React.useState([]);
  const [images, setImages] = React.useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const reloadImage = ()=>{
    let pid = searchParams.get("id");
    setPropertyId(pid);
    ImageService.getPropertyImages(pid)
      .then((response) => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const reload3DImage = ()=>{
    
    let pid = searchParams.get("id");
    setPropertyId(pid);
    //
    ImageService.getProperty3DImages(pid)
      .then((response) => {
        console.log(response);
        setImage3d([response]);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    reloadImage();
  }, []);

  
  useEffect(() => {
    reload3DImage();
  }, []);

  const onFileChange = (event) => {
    setFiles(event.target.files);
  };

  const on3DFileChange = (event) => {
    setImage3Dfile(event.target.files);
  };

  const on3DUpload = (event) => {
    event.preventDefault();
    if(!image3Dfile){
      alert('Please select a file');
      return;
    }


    const formData = new FormData();
    formData.append('property_id', searchParams.get("id"));
    formData.append('file', image3Dfile[0]);

    ImageService.upload3DImage(formData)
      
      .then((response) => {
        console.log(response);
        setFile3DUploaded(true);
        reload3DImage();        
      })

      .catch((error) => {
        console.log(error);
      });

  };


  const onUpload = (event) => {
    event.preventDefault();
    
    if(!files){
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('property_id', searchParams.get("id"));
    for (const key of Object.keys(files)) {
      formData.append('files', files[key]);
    }

    ImageService.uploadImage(formData)
      
      .then((response) => {
        console.log(response);
        setFileUploaded(true);
        reloadImage();        
      })

      .catch((error) => {
        console.log(error);
      });

  };

  return (    
    <>
      <div className="text-1xl font-bolder leading-tight text-indigo-700 px-2" style={{margin:30}}>
                <Link to="/owner/properties">Back to properties</Link>
                <span className={"text-gray-500 mx-4"}> / </span>
                Image Uploader
      </div>

      <h1 style={{textAlign:'center'}}>Upload images for property</h1>
      <h6 style={{fontStyle:'italic', textAlign:'center', color:'red'}}>(uploading new images will override the older ones)</h6>
      
      <div className="row">
        
        <div className="card col-md-6 offset-md-3 mt-5"> 
          
          <div className="card-body">
            <span>Images property</span>
            <form onSubmit={onUpload}>
              <div>
                <label>Select a file:</label>
                <input
                  className="mx-2"
                  type="file"
                  name="file"
                  onChange={onFileChange}
                  multiple
                ></input>
              </div>
              <button className="btn btn-success btn-sm mt-3" type="submit">
                Upload
              </button>
              {fileUploaded ? <div style={{color:'green'}}>File uploaded successfully</div> : ''}
            </form>
          </div>

          <div className="card-body">
            <span>Upload 3D Image</span>
            <form onSubmit={on3DUpload}>
              <div>
                <label>Select a file:</label>
                <input
                  className="mx-2"
                  type="file"
                  name="file"
                  onChange={on3DFileChange}
                  
                ></input>
              </div>

              <button className="btn btn-success btn-sm mt-3" type="submit">
                Upload 3D images
              </button>
              {file3DUploaded ? <div style={{color:'green'}}>3D image uploaded successfully</div> : ''}
            </form>
          </div>

        </div>

        <ImagesViewer images={image3d} title="3D Image review"></ImagesViewer>
        
        <ImagesViewer images={images} title="Images review"></ImagesViewer>


      </div>
    </>
  );
};

export default ImagesUpload;
