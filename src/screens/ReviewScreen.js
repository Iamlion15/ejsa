import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';

const ReviewScreen = ({ route }) => {
    const { comments,total } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Block style={styles.content}>
        <Text size={24} style={styles.title}>Comments</Text>
        {/* Display the number of comments */}
        <Text style={styles.commentCountText}>
                    {total} {total === 1 ? 'Comment' : 'Comments'}
                </Text>
        {comments.map((comment, index) => (
          <Block key={index} style={styles.commentContainer}>
            <Text size={14} color={argonTheme.COLORS.ACTIVE} bold>
              {comment.user.firstname} {comment.user.lastname} 
            </Text>
            <Text size={16} style={styles.commentTitle}>
              {comment.title}
            </Text>
            <Text size={14} style={styles.commentText}>
              {comment.comment}
            </Text>
          </Block>
        ))}
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  content: {
    padding: theme.SIZES.BASE,
  },
  title: {
    marginBottom: theme.SIZES.BASE * 2,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginBottom: theme.SIZES.BASE * 2,
    padding: theme.SIZES.BASE,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BORDER,
    borderRadius: theme.SIZES.BASE / 2,
  },
  commentTitle: {
    marginTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    fontWeight: 'bold',
  },
  commentText: {
    lineHeight: 20,
  },
  commentCountText: {
    marginTop: theme.SIZES.BASE,
    textAlign: 'center',
    color: argonTheme.COLORS.MUTED,
},
});

export default ReviewScreen;
