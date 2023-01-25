import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import './Gallery.css'

function Gallery() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [indextoupdate, setIndextoupdate] = useState(null);


    function addImage(image) {
        setImages([...images, image]);
    }

    //------------------------------------------------------------------//

    function updateImageDiscription(index, description) {
        setIndextoupdate(index);
        setDescription(description);
    }
    //------------------------------------------------------------------//
    function updateImageDescription2(description) {
        const newImages = [...images];
        newImages[indextoupdate] = { ...newImages[indextoupdate], description: description };
        setImages(newImages);

        setDescription('');
        setIndextoupdate(null);
    }
    //------------------------------------------------------------------//

    function deleteImage(index) {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }
    //------------------------------------------------------------------//

    // handleFileUpload function for handling image file uploads
    function handleFileUpload(event) {
        // Get the first file from the event target's files array
        const file = event.target.files[0];
        // Get the file type
        const fileType = file.type.split('/')[0];
        // Check if the file type is not an image
        if (fileType !== 'image') {
            // Show an alert message to the user and exit the function
            alert('Only image files are allowed');
            return;
        }
        // Create a new FileReader object
        const reader = new FileReader();
        // Set the onload function to call the addImage function
        reader.onload = function () {
            addImage({ url: reader.result, description: description === "" ? 'no description' : description });
        };
        // Read the file as a DataURL
        reader.readAsDataURL(file);
        // Set the description variable to an empty string
        setDescription('')
    }
    //------------------------------------------------------------------//

    return (
        <div className="container">
            <div className="gallery">
                <div className="inputs">
                    <input className="file" type="file" onChange={handleFileUpload} />
                    <input type="text" placeholder="enter description ..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    {indextoupdate !== null ? <button className='update' onClick={() => updateImageDescription2(description)}>Update</button> : ""}

                </div>
                {images.map((image, index) => (
                    <div className="imag" key={index}>
                        <img src={image.url} alt={image.description} />
                        <div className="qrcode">
                            <QRCode value={"description is :\n"+image.description} style={{ width: "60px", height: "60px" }} />
                        </div>
                        <p>{image.description}</p>

                        <button className='del' onClick={() => deleteImage(index)}>Delete Image</button>
                        {indextoupdate !== null ? "" : <button onClick={() => updateImageDiscription(index, image.description)}>Update description</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;
