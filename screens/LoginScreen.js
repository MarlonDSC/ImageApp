import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../viewModels/authViewModel';

const LoginScreen = () => {
  const { login, isAuthenticated, user } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    login(credentials);
  };

  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome, {user.name}</Text>
      ) : (
        <>
          <TextInput
            placeholder="Username"
            value={credentials.username}
            onChangeText={(text) => setCredentials({ ...credentials, username: text })}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default LoginScreen;
