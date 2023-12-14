import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, Image, StyleSheet, FlatList} from 'react-native';
import {useSelector} from "react-redux";


function News({navigation}) {
    const newsFromStore = useSelector(state => state.news.articles);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(newsFromStore){
            setNews(newsFromStore);
            setLoading(false);
        }else{
            fetch('https://newsapi.org/v2/everything?q=Apple&from=2023-12-13&sortBy=popularity&apiKey=12661ef1e65c42f3b9aad032b9a3e8b7', {
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

    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (

        <FlatList
            data={news}
            renderItem={({ item, index }) => (
                <View key={index} style={styles.post}>
                    {item.urlToImage && (
                        <Image
                            source={{ uri: item.urlToImage }}
                            style={{ height: 50, width: 50 }}
                        />
                    )}
                    <Text style={{ fontWeight: 'bold' }}>{item.title || 'No title'}</Text>
                    <Text>{item.publishedAt || 'No date'}</Text>
                    <Text>{item.description || 'No description'}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />

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