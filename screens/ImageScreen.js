import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useImages } from '../viewModels/imageViewModel';

const ImageScreen = () => {
  const { images, loading, uploadImage, searchImages, loadImagesFromLocalStorage } = useImages();
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadImagesFromLocalStorage();
  }, []);

  const handleSearch = () => {
    searchImages(query);
  };

  const handleUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search for images"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="Upload Image" onPress={handleUploadImage} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
          )}
        />
      )}
    </View>
  );
};

export default ImageScreen;
