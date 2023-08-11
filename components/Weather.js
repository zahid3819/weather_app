import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night} from '../assets/backgrounds/index'
//API KEY
const API_KEY = "971239803721abbd121e20c216a420ff";



const Weather = (props) => {

    const [weatherdata, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState('');
    const [background, setBackground] = useState('');

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
        getWeatherData(props.cityName);

        const iconObj = {
            snow: <FontAwesome name="snowflake-o" size={40} color="black" />,
            clear: <Feather name="sun" size={40} color="black" />,
            rain: <Ionicons name="rainy" size={40} color="black" />,
            haze: <Fontisto name="day-haze" size={40} color="black" />,
            cloud: <Entypo name="cloud" size={40} color="black" />,

        }

        if (weatherdata != null) {

            const now = new Date();
            const sunrise = new Date(weatherdata.sys.sunrise * 1000);
            const sunset = new Date(weatherdata.sys.sunset * 1000);
            const isDayTime = now >sunrise && now < sunset;
            switch (weatherdata.weather[0].main) {
                case 'Snow':
                    setIcon(iconObj.snow);
                    isDayTime ? setBackground(snow_day) : setBackground(snow_night);
                    break;
                case 'Clear':
                    setIcon(iconObj.clear);
                    isDayTime ? setBackground(clear_day) : setBackground(clear_night);
                    break;
                case 'Rain':
                    setIcon(iconObj.rain);
                    isDayTime ? setBackground(rain_day) : setBackground(rain_night);
                    break;
                case 'Cloud':
                    setIcon(iconObj.cloud);
                    isDayTime ? setBackground(cloud_day) : setBackground(cloud_night);
                    break;
                default:
                    setIcon(iconObj.haze);
                    isDayTime ? setBackground(haze_day) : setBackground(haze_night);
            }
            props.background(background)
        }

    }, [props.cityName])
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
                    <View style={styles.temprature}>
                        <Text>Humidity: {weatherdata.main.humidity}</Text>
                        <Text>Temperature: {weatherdata.main.temp}</Text>
                    </View>
                    <View>
                        <Text>{icon}</Text>
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
        color:'white',
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