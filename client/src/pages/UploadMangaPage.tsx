import React, { useState } from 'react';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

import "../css_files/UploadMangaPage.css";

import { API_URL } from "../api/config";

export default function UploadMangaPage() {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null) ;

  const { promiseInProgress } = usePromiseTracker();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
    
  async function handleUpload() {
    if (!selectedFile) {
      return;
    }
  
    setIsLoading(true); // Устанавливаем состояние isLoading в true перед началом загрузки
    setError(null); // Сбрасываем состояние ошибки
  
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      await trackPromise(
        axios.post(`${API_URL}/upload`, formData)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              console.log('Uploaded image URL:', data.imageUrl);
              // Можете сохранить этот URL в состоянии компонента или отправить куда-либо еще.
            } else {
              console.error('Error uploading image:', error);
              setError(null); // Сбрасываем состояние ошибки
            }
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
            setError(error.message);
          })
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <input type="file" accept="image/jpeg, image/jpg" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}
