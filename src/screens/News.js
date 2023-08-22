import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import NewsCard from '../components/NewsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');
const CHUNK_SIZE = 5; // Number of news items per chunk

const News = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);

  const fetchNews = async () => {
    const token = await AsyncStorage.getItem('UserToken');
    console.log(token)

    if (!token) {
      console.log("token not available");
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    fetch('http://192.168.43.236:8000/api/user/getnews', requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage('PLEASE RETRY');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        const chunkedNews = [];
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          chunkedNews.push(data.slice(i, i + CHUNK_SIZE));
        }
        setNews(chunkedNews);
        setCurrentChunk(0);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error.message);
        setMessage('Connect to your server');
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const handleNext = () => {
    setCurrentChunk(currentChunk + 1);
  };

  const handlePrev = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  const currentNewsChunk = news[currentChunk] || [];

  return (
    <View style={styles.container}>
    <FlatList
      data={currentNewsChunk}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <NewsCard item={item} />}
      style={styles.articles}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, { opacity: currentChunk === 0 ? 0.5 : 1 }]}
        onPress={handlePrev}
        disabled={currentChunk === 0}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { opacity: currentChunk === news.length - 1 ? 0.5 : 1 }]}
        onPress={handleNext}
        disabled={currentChunk === news.length - 1}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
},
articles: {
  width: width - 20,
  paddingVertical: 10,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  paddingHorizontal: 20,
},
button: {
  backgroundColor: '#FFD700',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
buttonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},
});

export default News;
