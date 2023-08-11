import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import { useState } from 'react';

//While creating production Level app, we need to keep API in environment variable

export default function App() {

  const [savedName, setSavedName] = useState("");
  const [backgroundImage, setbackgroundImage] = useState('');

  function cityNameHandler(cityName) {
    setSavedName(cityName);
  }

  function backgroundHandler(background) {
    setbackgroundImage(background);
  }


  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.container}>
        <SearchBar cityName={cityNameHandler} />
        <Weather cityName={savedName} background={backgroundHandler} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
  },
});
