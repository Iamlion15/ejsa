import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const DeveloperMenu = ({ visible, onClose, comments }) => {
    return (
        <Modal visible={visible} transparent  animationType="slide">
            <View style={styles.container} >
                <View style={styles.menu}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Comments</Text>
                    <View style={styles.commentContainer}>
                        
                        <ScrollView>
                            <View style={styles.commentList}>
                                {comments.map((comment, index) => (
                                    <View key={index} style={styles.commentItem}>
                                        <View style={styles.commentHeader}>
                                            <Text style={styles.commentAuthor}>
                                                {comment.user.firstname} {comment.user.lastname}
                                            </Text>
                                            <Text style={styles.commentDate}>{comment.date}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.comment}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Start from the bottom
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        maxHeight: screenHeight * 0.75, // Set max height to 75% of screen height
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    closeButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentContainer: {
        marginBottom: 20,
    },
    commentList: {
        marginTop: 10,
    },
    commentItem: {
        marginBottom: 15,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    commentAuthor: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentDate: {
        fontSize: 12,
        color: '#999',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default DeveloperMenu;