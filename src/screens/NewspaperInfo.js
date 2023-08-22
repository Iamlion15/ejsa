import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewspaperInfoScreen = ({route}) => {
  const {newspaperName}=route.params;  
    const [data, setData] = useState({});
    const [message, setMessage] = useState('');
    const fetchNews = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        if (!token) {
            console.log("token not available");
            return;
        }

        const methodOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body:JSON.stringify({"newspaperName":newspaperName})

        };
        fetch("http://192.168.43.236:8000/api/user/newspapersentiment", methodOptions)
            .then((response) => {
                if (!response.ok) {

                    setMessage("PLEASE RETRY")
                }
                return response.json();
            })
            .then(value => {
                setData(value);
                console.log(value)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchNews();
    }, [newspaperName]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Newspaper Info</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.newspaperName}>{newspaperName}</Text>
        <View style={styles.sentimentsContainer}>
          <View style={styles.sentiment}>
            <Text style={styles.sentimentLabel}>Positive Sentiments</Text>
            <Text style={styles.sentimentCount}>{data.Positive}</Text>
          </View>
          <View style={styles.sentiment}>
            <Text style={styles.sentimentLabel}>Negative Sentiments</Text>
            <Text style={styles.sentimentCount}>{data.Negative}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  newspaperName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sentimentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sentiment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  sentimentLabel: {
    fontSize: 16,
    color: '#333',
  },
  sentimentCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#007bff', // You can change the color
  },
});

export default NewspaperInfoScreen;
