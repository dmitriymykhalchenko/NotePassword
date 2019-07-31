import React, { Component } from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, TextInput, Alert,AlertIOS,SafeAreaView} from 'react-native'
import { ThemeProvider, Button } from 'react-native-elements';

const theme = {
  Button: {
    raised: true,
  },
};

// Your App
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button title="My Button" />
      <Button title="My 2nd Button" />
    </ThemeProvider>
  );
};
