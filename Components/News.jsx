import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    Alert,
    TextInput,
    Linking,
    TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {setString} from "../store/action/stringActions";
import {setData} from "../store/action/dataActions";


function News({navigation}) {
    const newsFromStore = useSelector(state => state.news.articles);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [flag, setFlag] = useState(true);
    const dispatch = useDispatch();
    const savedString = useSelector(state => state.string.savedString);
    const chooseData = useSelector(state => state.data.data);
    const renderItem = ({item, index}) => (
        <View key={index} style={styles.post}>
            {item.urlToImage && (
                <Image
                    source={{uri: item.urlToImage}}
                    style={styles.image}
                />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title || ''}</Text>
                <Text style={styles.date}>{item.publishedAt || 'Без дати'}</Text>
                <Text style={styles.description}>
                    {item.description && item.description.length > 100
                        ? item.description.substring(0, 100) + '...'
                        : item.description || ''}
                </Text>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: '#007bff',
                    }}
                    onPress={() => Linking.openURL(`${item.url}`)}
                >
                    <Text style={{color: 'white', textAlign: 'center',}}>До новини</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        if (newsFromStore && flag == true) {
            setNews(newsFromStore);
            setLoading(false);
            setFlag(false);
            //Alert.alert('Fetching news with query:', savedString);
        } else {
            fetch(`https://newsapi.org/v2/everything?q=${savedString}&from=${chooseData}&sortBy=popularity&apiKey=12661ef1e65c42f3b9aad032b9a3e8b7`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setNews(data.articles);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Помилка отримання новин!', error);
                    setLoading(false);
                });
        }

    }, [savedString, chooseData]);

    if (loading) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                }}
                source={{uri: "https://media.tenor.com/TdlYsAE1tvwAAAAi/kumorun-kumoxworld.gif"}}></Image>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <View>
            <View style={{
                padding: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor: 'rgb(224, 224, 224)',
                borderBottomWidth: 1,
            }}>
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        width: 350,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 50,
                        borderColor: 'rgb(224, 224, 224)',
                        backgroundColor: 'rgb(255,255,255)',
                    }}
                    placeholder="Введіть тему новин, чи дату формату 2023-12-13"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
                <View style={{display: 'flex', flexDirection: "row"}}>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            marginRight: 10,
                            borderRadius: 10,
                            backgroundColor: '#007bff', // или любой другой цвет
                        }}
                        onPress={() => dispatch(setString(text))}
                    >
                        <Text style={{color: 'white'}}>Змінити тему</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: '#007bff',
                        }}
                        onPress={() => dispatch(setData(text))}
                    >
                        <Text style={{color: 'white'}}>Змінити дату</Text>
                    </TouchableOpacity>
                </View>
                <Text>Поточна тема: {savedString}</Text>
                <Text>Поточна дата: {chooseData}</Text>
            </View>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(224, 224, 224)',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        color: 'grey',
        marginBottom: 5,
    },
    description: {
        color: 'black',
    },
})
export default News;