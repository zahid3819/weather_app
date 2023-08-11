import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

//While creating production Level app, we need to keep API in environment variable

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
