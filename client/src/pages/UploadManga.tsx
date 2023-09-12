import React, { useState } from 'react';
import axios from 'axios';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

import '../css_files/UploadManga.css';

import { API_URL } from '../api/config';

// Интерфейсы ts
import { MangaImages } from '../api/Interfaces and types/UploadManga';


function UploadManga() {

  
  // Состояния вводимых данных
  const [mangaTitle, setMangaTitle] = useState('');
  const [otherTitles, setOtherTitles] = useState('');
  const [type, setType] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [translators, setTranslators] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>(undefined);


  // Скрытие placeholder при фокусе
  const [isMangaTitleInputFocused, setIsMangaTitleInputFocused] = useState(false);
  const [isOtherTitlesInputFocused, setIsOtherTitlesInputFocused] = useState(false);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const [isAuthorInputFocused, setIsAuthorInputFocused] = useState(false);
  const [isTranslatorsInputFocused, setIsTranslatorsInputFocused] = useState(false);
  const [isDescriptionInputFocused, setIsDescriptionInputFocused] = useState(false);

  
  // Стату загрузки данных
  const [isLoading, setIsLoading] = useState(false);


  // Состояния ошибки
  const [error, setError] = useState(null) ;

  
  // TODO:Может быть понадобится
  // const { promiseInProgress } = usePromiseTracker();


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  }


  // Структура данных для хранения изображений
  const mangaImages: MangaImages = {};

  
  function extractAndSortImages(files: FileList) {
    
    // Пройдитесь по всем выбранным файлам
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      // Используем регулярное выражение для извлечения vol, ch и p из названия файла
      const match = fileName.match(/vol(\d+)_ch(\d+)_p(\d+)\.jpg/i);
      if (match) {
        const [_, vol, ch, p] = match;
        if (!mangaImages[vol]) {
          mangaImages[vol] = {};
        }
        if (!mangaImages[vol][ch]) {
          mangaImages[vol][ch] = {};
        }
        if (!mangaImages[vol][ch][p]) {
          mangaImages[vol][ch][p] = [];
        }
        mangaImages[vol][ch][p].push({ fileName, vol, ch, p });
      }
    }
    
    // Сортировка изображений в каждом массиве
    for (const vol in mangaImages) {
      for (const ch in mangaImages[vol]) {
        for (const p in mangaImages[vol][ch]) {
          mangaImages[vol][ch][p].sort((a, b) => a.fileName.localeCompare(b.fileName));
        }
      }
    }
  
    return mangaImages;
  }
  

  // Функция для загрузки данных на сервер
  async function handleUpload() {


    // Проверка, есть ли файлы в selectedFiles
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    
    // Извлечение и сортированных изображений
    const sortedImages: MangaImages = extractAndSortImages(selectedFiles);
    // Вывод отсортированных изображений в консоль

    // Выводим всю форму в консоль в виде JSON
    console.log('Form Data:', JSON.stringify({
      mangaTitle,
      otherTitles,
      type,
      authors,
      tags,
      translators,
      description,
      selectedFiles: Array.from(selectedFiles).map(file => file.name),
    }, null, 2));


    setIsLoading(true); // Устанавливаем состояние isLoading в true перед началом загрузки
    setError(null); // Сбрасываем состояние ошибки

    try {
      const formData = new FormData();
      formData.append('mangaTitle', mangaTitle);
      formData.append('otherTitles', otherTitles);
      formData.append('type', type);
      formData.append('authors', authors);
      formData.append('tags', tags);
      formData.append('translators', translators);
      formData.append('description', description);
      
      // Добавьте отсортированные изображения в FormData
      for (const vol in sortedImages) {
        for (const ch in sortedImages[vol]) {
          for (const p in sortedImages[vol][ch]) {
            sortedImages[vol][ch][p].forEach((image, i) => {
              const file = new File([], image.fileName, { type: 'image/jpeg' });
              formData.append(`images[${i}]`, file);
            });
          }
        }
      }

      // Выводим всю форму в консоль в виде JSON
      console.log('Form Data:', JSON.stringify({
        mangaTitle,
        otherTitles,
        type,
        authors,
        tags,
        translators,
        description,
        selectedFiles: Array.from(selectedFiles).map(file => file.name),
      }, null, 2));
      console.log('Sorted Images:', JSON.stringify(sortedImages, null, 2));

      // Отправьте FormData на сервер
      await trackPromise(
        axios.post(`${API_URL}/upload`, formData, {
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
        <input type="file" accept="image/jpeg, image/jpg" onChange={handleFileChange} multiple />
      </div>

      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default UploadManga;