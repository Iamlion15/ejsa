import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarChartExample from './barchart';

const StatisticsScreen = () => {
  const [positive, setPositive] = useState([]);
  const [negative, setNegative] = useState([]);
  const [activeSentiment, setActiveSentiment] = useState("positive");
  const [activeNav, setActiveNav] = useState(1);
  const [chunkIndex, setChunkIndex] = useState(0);
  const toggleNavs = (index) => {
    setActiveNav(index);
    if (index === 1) {
      setActiveSentiment("positive");
      setChunkIndex(0)
    } else if (index === 2) {
      setActiveSentiment("negative");
      setChunkIndex(0)
    }
  };
  const handleNextClick = () => {
    const currentChunks = activeSentiment === "positive" ? chunkedPositive : chunkedNegative;

    if (chunkIndex < currentChunks.length - 1) {
      setChunkIndex(chunkIndex + 1);
    }
  };
  const handlePreviousClick = () => {
    if (chunkIndex > 0) {
      setChunkIndex(chunkIndex - 1);
    }
  };
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

    fetch("http://192.168.43.236:8000/api/admin/percentagestats", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("error");
        }
        return response.json();
      })
      .then(value => {
        const positiveArray = Object.entries(value.positive).map(([source, value]) => ({ source, value }));
        const NegativeArray = Object.entries(value.negative).map(([source, value]) => ({ source, value }));
        setPositive(positiveArray);
        setNegative(NegativeArray)
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  };
  const chunkedPositive = chunkArray(positive, 4);
  const chunkedNegative = chunkArray(negative, 4)
  const getCurrentChunk = () => {
    if (activeSentiment === "positive") {
      return chunkedPositive[chunkIndex] || [];
    } else if (activeSentiment === "negative") {
      return chunkedNegative[chunkIndex] || [];
    }
  };
  const initialiseData = (chunkIndex) => {
    const currentChunk = getCurrentChunk();

    const labels = currentChunk.map((item, index) => {
      if (index === 0) {
        return ""; // Empty label for the first item in the chunk
      }
      return item.source;
    });

    const data = currentChunk.map((item, index) => {
      if (index === 0) {
        return 0; // 0 value for the first item in the chunk
      }
      return item.value;
    });
    console.log("Labels:", labels);
    console.log("Data:", data);
    return {
      labels: labels,
      datasets: [
        {
          label: "Performance",
          data: data,
        },
      ],
    };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>statistical report</Text>
      <View style={styles.header}>
        <TouchableOpacity style={[
          styles.headerButton,
          activeSentiment === "negative" && styles.activeButton,
        ]}
          onPress={() => toggleNavs(1)}
        >
          <Text
            style={[
              styles.buttonText,
              activeSentiment === "negative" && styles.activeButtonText,
            ]}
          >
            Positive Sentiments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
            styles.headerButton,
            activeSentiment === "positive" && styles.activeButton,
          ]}
          onPress={() => toggleNavs(2)}
        >
          <Text
            style={[
              styles.buttonText,
              activeSentiment === "positive" && styles.activeButtonText,
            ]}
          >
            Negative sentiments
          </Text>
        </TouchableOpacity>
      </View>
      <BarChartExample data={initialiseData(chunkIndex)} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
          onPress={handlePreviousClick} disabled={chunkIndex === 0}
        >
          <Text style={styles.buttonText}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={handleNextClick} disabled={chunkIndex === getCurrentChunk().length - 1}
        >
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Light gray background
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333', // Dark gray color
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white backgroun
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerButton: {
    backgroundColor: '#007AFF', // Success color
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#F5F5F5', // White smoke gray color for active button
  },
  activeButtonText: {
    color: '#007AFF', // Blue color for active button text
  },
});

export default StatisticsScreen;
