import { Thread } from 'react-native-threads';

export const runBackgroundTask = () => {
  const thread = new Thread('./thread.js');

  thread.onmessage = (message) => {
    console.log(message);
  };

  thread.postMessage('Start background task');
};
