import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, Image, StyleSheet, FlatList, Alert, TextInput} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {setString} from "../store/action/stringActions";


function News({navigation}) {
    const newsFromStore = useSelector(state => state.news.articles);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [flag, setFlag] = useState(true);
    const dispatch = useDispatch();
    const savedString = useSelector(state => state.string.savedString);


    useEffect(() => {
        if (newsFromStore && flag == true) {
            setNews(newsFromStore);
            setLoading(false);
            setFlag(false);
            Alert.alert('Fetching news with query:', savedString);
        } else {
            fetch(`https://newsapi.org/v2/everything?q=${savedString}&from=2023-12-13&sortBy=popularity&apiKey=12661ef1e65c42f3b9aad032b9a3e8b7`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setNews(data.articles);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Get news error!!!!!!!', error);
                    setLoading(false);
                });
        }

    }, [savedString]);

    if (loading) {
        return <Image
            style={{
                justifyContent: "center",
                alignContent: "center",

            }}
            source={{uri: "https://media.tenor.com/TdlYsAE1tvwAAAAi/kumorun-kumoxworld.gif"}}></Image>
    }

    return (
        <View>
            <View style={{
                padding: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    }}
                    placeholder="Введіть тут тему новин"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
                <Button title="Змінити тему" onPress={() => dispatch(setString(text))}/>
            </View>
            <FlatList
                data={news}
                renderItem={({item, index}) => (
                    <View key={index} style={styles.post}>
                        {item.urlToImage && (
                            <Image
                                source={{uri: item.urlToImage}}
                                style={{height: 50, width: 50}}
                            />
                        )}
                        <Text style={{fontWeight: 'bold'}}>{item.title || 'No title'}</Text>
                        <Text>{item.publishedAt || 'No date'}</Text>
                        <Text>{item.description || 'No description'}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 10,
        height: "auto",
        borderBlockEndColor: 'rgb(224, 224, 224)',
        borderBottomWidth: 2,
    }
})
export default News;