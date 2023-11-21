import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../firebase/firebase.config';

function FileUpload({setImgUrl,userId}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    const imageRef = ref(storage, `profile/${userId}`);
    await uploadBytes(imageRef, selectedFile);
    
    // image file URL save
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImgUrl(downloadURL);
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect}/>
      <button onClick={handleUpload}>변경사항 저장</button>
    </div>
  )
}

export default FileUpload;