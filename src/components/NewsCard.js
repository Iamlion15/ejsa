import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const NewsCard = ({ item, navigation }) => {
  const navigateToDetail = () => {
    navigation.navigate('detail', { item });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={navigateToDetail}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>Source:</Text>
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToDetail}>
        <View style={styles.cardDescription}>
          <Text style={styles.sentimentText}>{item.sentiment}</Text>
          {renderSentimentButton(item.sentiment)}
          <Text style={styles.dateText}>
            Published on {formatDate(item.publishedAt)}
          </Text>
          <Text style={styles.reviewText}>Give your review</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderSentimentButton = (sentiment) => {
  const buttonStyle = [
    styles.sentimentButton,
    {
      backgroundColor:
        sentiment === 'Positive'
          ? '#34D399'
          : sentiment === 'Negative'
          ? '#EF4444'
          : '#3B82F6',
    },
  ];

  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={styles.sentimentButtonText}>
        {sentiment.toUpperCase()} SENTIMENT
      </Text>
    </TouchableOpacity>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#A1A1A1',
    marginTop: 4,
  },
  titleContainer: {
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: '#A1A1A1',
    marginRight: 4,
  },
  cardDescription: {
    paddingTop: 8,
  },
  sentimentText: {
    fontSize: 14,
    marginBottom: 4,
  },
  sentimentButton: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 6,
  },
  sentimentButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 12,
    color: '#3B82F6',
    textAlign: 'center',
  },
});

export default NewsCard;
