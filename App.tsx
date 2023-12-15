/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import News from "./Components/News";
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as url from "url";
import {setNews} from "./store/action/newsActions";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "./store";

function HomeScreen({navigation}) {
    const savedString = useSelector(state => state.string.savedString);
    const dispatch = useDispatch();
    const newsFromStore = useSelector(state => state.news.articles);
    useEffect(() => {

        fetch(`https://newsapi.org/v2/everything?q=${savedString}&from=2023-12-13&sortBy=popularity&apiKey=12661ef1e65c42f3b9aad032b9a3e8b7`)
            .then(response => response.json())
            .then(data => {
                dispatch(setNews(data.articles));
            })
            .catch(error => console.error('Get news error!!!!!!!', error));
    }, [dispatch]);
    return (

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 400, textAlign: "center",}}>Вітаємо в нашому додатку!</Text>
            <Text style={{fontSize: 20, fontWeight: 400, marginTop: 15}}>Ваша тема новин:{savedString}</Text>
            <Image
                style={{
                    width: 300,
                    height: 300,
                    justifyContent: "center",
                    alignContent: "center",

                }}
                source={{uri: "https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif"}}></Image>
            <View style={{flex: 1, justifyContent: 'flex-end', width: 400}}>
                <View style={{
                    borderTopWidth: 1,
                    borderColor: 'rgb(206,206,208)',
                    height: 60,
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    backgroundColor: 'rgb(231,234,236)'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Image
                            style={styles.homeLogo}
                            source={{
                                uri: 'https://img.icons8.com/wired/64/list--v1.png',
                            }}
                        />
                        <Text style={{color: 'black', textAlign: 'center'}}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Image
                            style={styles.userLogo}
                            source={{
                                uri: 'https://img.icons8.com/dotty/80/user.png',
                            }}
                        />
                        <Text style={{color: 'black', textAlign: 'center'}}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>


    );
}

function DetailsScreen({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style={{
                    borderRadius: 50,
                    width: 200,
                    height: 200,
                    marginTop: 30
                }}
                source={{uri: 'https://i.pinimg.com/550x/b1/d2/da/b1d2da1502b5c55d9459d6ee60c5367f.jpg'}}
            />
            <Text style={{fontSize: 50, fontWeight: 400}}>Evgenia Deken</Text>
            <View style={{flex: 1, justifyContent: 'flex-end', width: 400}}>
                <Text style={{textAlign: 'center', marginBottom: 10}}>Webc-2211</Text>
                <View style={{
                    borderTopWidth: 1,
                    borderColor: 'rgb(206,206,208)',
                    height: 60,
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    backgroundColor: 'rgb(231,234,236)'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Image
                            style={styles.homeLogo}
                            source={{
                                uri: 'https://img.icons8.com/wired/64/list--v1.png',
                            }}
                        />
                        <Text style={{color: 'black', textAlign: 'center'}}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Image
                            style={styles.userLogo}
                            source={{
                                uri: 'https://img.icons8.com/dotty/80/user.png',
                            }}
                        />
                        <Text style={{color: 'black', textAlign: 'center'}}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

function NotificationsScreen({navigation}) {
    return (
        <News/>
    );
}


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
    return (

        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Profile" component={DetailsScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

function App() {
    return (
        <Provider store={store}>


            <PersistGate  loading={ <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{
                        width:100,
                        height:100,
                    }}
                    source={{uri: "https://media.tenor.com/TdlYsAE1tvwAAAAi/kumorun-kumoxworld.gif"}}></Image>
                <Text>Loading...</Text>
            </View>} persistor={persistor}>

            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Main">
                    <Drawer.Screen name="Main" component={StackNavigator}/>
                    <Drawer.Screen name="News" component={NotificationsScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        borderBlockEndColor: 'rgb(224, 224, 224)',
        borderBottomWidth: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    chat: {
        height: "auto",
        borderBlockEndColor: 'rgb(224, 224, 224)',
        borderBottomWidth: 2,
        paddingBottom: 10,
    },
    headerNavigation: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: 'rgb(2,2,2)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'rgb(2,2,2)',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    myResendMessages: {
        backgroundColor: 'rgb(238,238,248)',
        height: "auto",
        textAlign: "center",
        alignContent: "center",
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        fontSize: 20,
        fontWeight: 400,
        position: "absolute",
        right: 55,
        top: -50,
    },
    resendMessages: {
        backgroundColor: 'rgb(238,238,248)',
        height: "auto",
        textAlign: "center",
        alignContent: "center",
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        fontSize: 20,
        fontWeight: 400,
        position: "absolute",
        left: 55,
        top: -50,
    },
    highlight: {
        fontWeight: '700',
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    settingLogo: {
        width: 40,
        height: 40,
        justifyContent: "flex-end",
    },
    messageText: {
        position: "relative",
        zIndex: 10,
        color: 'rgb(0,0,0)',
    },
    myMessageText: {
        position: "relative",
        zIndex: 10,
        color: 'rgb(255,255,255)',
    },
    messagesSection: {
        marginLeft: 10,
        flexDirection: "row",
        marginTop: 20,
        alignContent: "center",
        flex: 1,
        zIndex: 5,
    },
    message: {
        backgroundColor: 'rgb(224, 224, 224)',
        textAlign: "center",
        alignContent: "center",
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 400,
    },
    nosik: {
        position: 'absolute',
        left: 5,
        top: '120%',
        backgroundColor: 'rgb(224, 224, 224)',
        width: 15,
        height: 15,
        transform: [
            {translateX: -10},
            {translateY: -10},
            {rotate: '45deg'},
        ],
    },
    myMessagesSection: {
        marginRight: 10,
        justifyContent: "flex-end",
        flexDirection: "row",
        marginTop: 20,
        alignContent: "center",
        flex: 1,
    },
    myTinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    myMessage: {
        backgroundColor: 'rgb(55, 116, 232)',
        textAlign: "center",
        alignContent: "center",
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        fontSize: 20,
        fontWeight: 400,
    },
    myNosik: {
        position: 'absolute',
        right: -15,
        top: '120%',
        backgroundColor: 'rgb(55, 116, 232)',
        width: 15,
        height: 15,
        transform: [
            {translateX: -10},
            {translateY: -10},
            {rotate: '45deg'},
        ],
    },
    inputSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    input: {
        height: 40,
        margin: 12,
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        borderColor: 'rgb(224, 224, 224)',
    },
    sendLogo: {
        width: 25,
        height: 25,
        position: "relative",
        right: 10,
    },
    homeLogo: {
        width: 25,
        height: 25,
    },
    userLogo: {
        width: 30,
        height: 30,
    },
    cameraLogo: {
        width: 25,
        height: 25,
        position: "relative",
        left: 10
    },
    micropfoneLogo: {
        width: 25,
        height: 25,
        position: "absolute",
        left: 50,
        zIndex: 10,
    },

});

export default App;
