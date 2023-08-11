import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";

const SearchBar = (props) => {

    const [name, setName] = useState(''); 

    function cityNameHandler (cityName){
        setName(cityName);
    }

    function nameEnterhandler(){
        props.cityName(name);
    }

    return ( 
        <View style={styles.searchBar}>
            <TextInput placeholder="Enter your City" onChangeText={cityNameHandler}/>
            <Feather name="search" size={24} color="black"  onPress={nameEnterhandler}/>
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