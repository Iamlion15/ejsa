import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DeveloperMenu from './commentSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCommentModal from './addCommentModal';

const NewsDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const id = item._id;
    const [passid, setPassid] = useState("");
    const [reviews, setReviews] = useState([])
    const [newsData, SetNewsData] = useState({
        title: "",
        summary: "",
        source: "",
        sentiment: "",
        link: ""
    });
    const [totalComments, setTotalComments] = useState();
    const [developerMenuVisible, setDeveloperMenuVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSeeComments = () => {
      setDeveloperMenuVisible(true);
    };
  
    const handleDeveloperMenuClose = () => {
      setDeveloperMenuVisible(false);
    };

    const handleAddComments = () => {
        setIsModalVisible(true);
      };
    
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
    
      


    const fetchNews = async () => {
        try {
            const token = await AsyncStorage.getItem('UserToken');
            console.log(token);

            if (!token) {
                console.log('token not available');
                return;
            }
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const urls = [
                'http://192.168.43.236:8000/api/user/getreviews/' + id,
                'http://192.168.43.236:8000/api/user/getnews/' + id,
            ];

            const requests = urls.map((url) => fetch(url, requestOptions));
            const responses = await Promise.all(requests);
            const data = await Promise.all(responses.map((response) => response.json()));
            setReviews(data[0]);
            setTotalComments(data[0].length);
            SetNewsData({
                title: data[1].title,
                summary: data[1].summary,
                source: data[1].source,
                sentiment: data[1].sentiment,
                link: data[1].url,
            });
            console.log(data[1]);
            setPassid(data[1]._id)

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [id]);

    // const handleSeeComments = () => {
    //     navigation.navigate('news review', { comments: reviews, total: totalComments }); // Pass the reviews array as a parameter
    // };
    // const handleAddComments = () => {
    //     navigation.navigate('add comment', { news: passid }); // Pass the reviews array as a parameter
    // };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.source}>{item.source}</Text>
                <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComments}>
        <Text style={styles.addCommentButtonText}>+</Text>
      </TouchableOpacity>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sentiment}>{item.sentiment}</Text>
            <Text style={styles.summary}>{item.summary}</Text>


            <TouchableOpacity style={styles.buttonContainer} onPress={handleSeeComments}>
                <Text style={styles.buttonText}>See Comments</Text>
            </TouchableOpacity>
            <DeveloperMenu
        visible={developerMenuVisible}
        onClose={handleDeveloperMenuClose}
        comments={reviews} 
      />
      <AddCommentModal
        visiblee={isModalVisible}
        onClose={handleModalClose}
        newsid={id}
      />
        </ScrollView>
        
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    source: {
      fontSize: 16,
      color: '#555',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sentiment: {
      fontSize: 16,
      color: '#00A86B', 
      marginBottom: 20,
    },
    summary: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: '#3498db', 
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    addCommentButton: {
        backgroundColor: '#3498db', 
        width: 40,
        height: 40,
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', 
        marginBottom: 20, 
      },
      addCommentButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
  });
  
  export default NewsDetailScreen;
  