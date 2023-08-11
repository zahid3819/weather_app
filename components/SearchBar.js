import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
    return ( 
        <View style={styles.searchBar}>
            <TextInput placeholder="Enter your City"/>
            <Feather name="search" size={24} color="black" />
        </View>
     );
}
 
export default SearchBar;

const styles = StyleSheet.create({
    searchBar:{
        flexDirection: 'row',
        justifyContent:'space-between',
        borderWidth: 2,
        borderColor: 'black',
        width: Dimensions.get('screen').width -80,
        padding: 10,
        borderRadius: 5,
        marginTop: 200
        
    }
})