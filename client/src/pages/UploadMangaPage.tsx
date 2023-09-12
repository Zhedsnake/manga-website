import React, { useState } from 'react';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

import "../css_files/UploadMangaPage.css";

import { API_URL } from "../api/config";

export default function UploadMangaPage() {
  
  // Состояния вводимых данных
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mangaTitle, setMangaTitle] = useState('');
  const [type, setType] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [translators, setTranslators] = useState('');
  const [description, setDescription] = useState('');

  // Скрытие placeholder при фокусе
  const [isMangaTitleInputFocused, setIsMangaTitleInputFocused] = useState(false);
  const [isTypeInputFocused, setIsTypeInputFocused] = useState(false);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const [isAuthorInputFocused, setIsAuthorInputFocused] = useState(false);
  const [isDescriptionInputFocused, setIsDescriptionInputFocused] = useState(false);

  // Стату загрузки данных
  const [isLoading, setIsLoading] = useState(false);

  // Состояния ошибки
  const [error, setError] = useState(null) ;
  
  // Может быть понадобится
  // const { promiseInProgress } = usePromiseTracker();




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
      formData.append('mangaTitle', mangaTitle);
      formData.append('type', type);
      formData.append('authors', authors);
      formData.append('tags', tags);
      formData.append('translators', translators);
      formData.append('description', description);
      formData.append('image', selectedFile);
  
      await trackPromise(
        axios.post(`${API_URL}/upload`, formData)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              console.log(data);
              // Дополнительные действия после успешной загрузки
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
  }
  
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder={isMangaTitleInputFocused ? '' : 'Manga Title'}
          onFocus={() => setIsMangaTitleInputFocused(true)}
          onBlur={() => setIsMangaTitleInputFocused(false)}
          onChange={(e) => setMangaTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder={isTypeInputFocused ? '' : 'Type'}
          onFocus={() => setIsTypeInputFocused(true)}
          onBlur={() => setIsTypeInputFocused(false)}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder={isAuthorInputFocused ? '' : 'Authors'}
          onFocus={() => setIsAuthorInputFocused(true)}
          onBlur={() => setIsAuthorInputFocused(false)}
          onChange={(e) => setAuthors(e.target.value)}
        />
        <input
          type="text"
          placeholder={isTagInputFocused ? '' : 'Tags'}
          onFocus={() => setIsTagInputFocused(true)}
          onBlur={() => setIsTagInputFocused(false)}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder={isTagInputFocused ? '' : 'Tags'}
          onFocus={() => setIsTagInputFocused(true)}
          onBlur={() => setIsTagInputFocused(false)}
          onChange={(e) => setTranslators(e.target.value)}
        />
        <textarea
          placeholder={isDescriptionInputFocused ? '' : 'Description'}
          onFocus={() => setIsDescriptionInputFocused(true)}
          onBlur={() => setIsDescriptionInputFocused(false)}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
      <input type="file" accept="image/jpeg, image/jpg" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}
