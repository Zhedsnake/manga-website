import React, { useState } from 'react';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

import '../css/UploadNewManga.css';

// Адрес сервера
import { API_URL } from '../api/config';


function uploadManga() {
  
  // Состояния вводимых данных
  const [mangaTitle, setMangaTitle] = useState('');
  const [otherTitles, setOtherTitles] = useState('');
  const [type, setType] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [translators, setTranslators] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<File | undefined>(undefined);

  // Скрытие placeholder при фокусе
  const [isMangaTitleInputFocused, setIsMangaTitleInputFocused] = useState(false);
  const [isOtherTitlesInputFocused, setIsOtherTitlesInputFocused] = useState(false);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const [isAuthorInputFocused, setIsAuthorInputFocused] = useState(false);
  const [isTranslatorsInputFocused, setIsTranslatorsInputFocused] = useState(false);
  const [isDescriptionInputFocused, setIsDescriptionInputFocused] = useState(false);
  
  // Статус загрузки данных
  const [isLoading, setIsLoading] = useState(false);

  // Состояния ошибки
  const [error, setError] = useState(null) ;
  
  // TODO:Может быть понадобится
  // const { promiseInProgress } = usePromiseTracker();

  function handlePreviewChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPreview(e.target.files[0]); // Выбираем только первый файл
    }
  }

  // Функция для загрузки данных на сервер
  async function handleUpload() {

    // Проверка, есть ли файл в selectedPreview
    if (!selectedPreview) {
      return;
    }

    setIsLoading(true); // Устанавливаем состояние isLoading в true перед началом загрузки
    setError(null); // Сбрасываем состояние ошибки

    try {
      // Создание формы и введение в неё данных из импутов
      const formData = new FormData();
      formData.append('mangaTitle', mangaTitle);
      formData.append('otherTitles', otherTitles);
      formData.append('type', type);
      formData.append('authors', authors);
      formData.append('tags', tags);
      formData.append('translators', translators);
      formData.append('description', description);
      formData.append(`preview`, selectedPreview);

      // Вывод содержания FormData в консоль
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      // Отправка FormData на сервер
      await trackPromise(
        axios.post(`${API_URL}/uploadNewMangaData`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              console.log(data);
              // Дополнительные действия после успешной загрузки
            } else {
              console.error('Error uploading images:', error);
              setError(null); // Сбрасываем состояние ошибки
            }
          })
          .catch((error) => {
            console.error('Error uploading images:', error);
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
          placeholder={isOtherTitlesInputFocused ? '' : 'Other Titles'}
          onFocus={() => setIsOtherTitlesInputFocused(true)}
          onBlur={() => setIsOtherTitlesInputFocused(false)}
          onChange={(e) => setOtherTitles(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Manga">Manga</option>
          <option value="Manhwa">Manhwa</option>
        </select>
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
          placeholder={isTranslatorsInputFocused ? '' : 'Translators'}
          onFocus={() => setIsTranslatorsInputFocused(true)}
          onBlur={() => setIsTranslatorsInputFocused(false)}
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
        <input type="file" accept="image/jpg" onChange={handlePreviewChange} />
      </div>

      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default uploadManga;