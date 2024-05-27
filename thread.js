import { self } from 'react-native-threads';
import axios from 'axios';

self.onmessage = async (message) => {
  if (message === 'Start background task') {
    try {
      const response = await axios.get('http://localhost:8080/images');
      self.postMessage(response.data);
    } catch (error) {
      self.postMessage('Error in background task');
    }
  }
};
