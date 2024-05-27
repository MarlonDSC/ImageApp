import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useImages = () => {
  const dispatch = useDispatch();
  const { images, loading } = useSelector((state) => state.images);

  const uploadImage = async (imageUri) => {
    dispatch({ type: 'UPLOAD_IMAGE_REQUEST' });
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://tuapi.com/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: response.data });
      await saveImagesToLocalStorage([...images, response.data]);
    } catch (error) {
      dispatch({ type: 'UPLOAD_IMAGE_FAILURE' });
    }
  };

  const searchImages = async (query) => {
    dispatch({ type: 'SEARCH_IMAGE_REQUEST' });
    try {
      const response = await axios.get(`http://tuapi.com/api/images/search?query=${query}`);
      dispatch({ type: 'SEARCH_IMAGE_SUCCESS', payload: response.data });
      await saveImagesToLocalStorage(response.data);
    } catch (error) {
      dispatch({ type: 'SEARCH_IMAGE_FAILURE' });
    }
  };

  const saveImagesToLocalStorage = async (images) => {
    try {
      await AsyncStorage.setItem('images', JSON.stringify(images));
    } catch (error) {
      // handle error
    }
  };

  const loadImagesFromLocalStorage = async () => {
    try {
      const savedImages = await AsyncStorage.getItem('images');
      if (savedImages) {
        dispatch({ type: 'SEARCH_IMAGE_SUCCESS', payload: JSON.parse(savedImages) });
      }
    } catch (error) {
      // handle error
    }
  };

  return {
    images,
    loading,
    uploadImage,
    searchImages,
    loadImagesFromLocalStorage,
  };
};
