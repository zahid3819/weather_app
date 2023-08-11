import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

//API KEY
const API_KEY = "971239803721abbd121e20c216a420ff";



const Weather = () => {

    const [weatherdata, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getWeatherData(cityName) {
        setLoading(true);
        // API
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        let res = await fetch(API);
        if (res.status == 200) {
            res = await res.json();
            setWeatherData(res);
        }
        else {
            setWeatherData(null);
        }
        setLoading(false);
    }
    //The useEffect Hook allows you to perform side effects in your components. 
    //Some examples of side effects are: fetching data, directly updating the DOM, and timers. 
    //useEffect accepts two arguments. The second argument is optional.
    useEffect(() => {
        getWeatherData('Peshawar');
        if (weatherdata != null) {
            console.log(weatherdata);
        }

    }, [])
    if (loading) {
        return (
            <ActivityIndicator size='large' />
        );
    }
    else if (weatherdata == null) {
        return (
            <Text style={{ marginTop: 20, fontSize: 24, textAlign: 'center' }}>Enter City Name</Text>
        )
    }
    else {
        return (
            <View>
                <Text style={styles.degree}>{weatherdata.wind.deg}°</Text>
                <Text style={styles.cityName}>{weatherdata.name}</Text>
                <View>
                    <View style={styles.icon}>
                        <Text>Humidity: {weatherdata.main.humidity}</Text>
                        <Text>Temperature: {weatherdata.main.temp}</Text>
                    </View>
                    <View>
                        <Text>Icon</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Weather;

const styles = StyleSheet.create({
    degree: {
        fontSize: 80,
        textAlign: 'center',
        marginTop: '50%',
        color: 'black',
    },
    cityName: {
        fontSize: 20,
        textAlign: 'center',
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 50,
        height: '50%',
        alignItems: 'center',

    }
})

// Dimensions component is used to set dimension of screen
// ActivityIndicator component is used for loading animation