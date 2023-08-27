import React, { useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCommentModal = ({ visiblee, onClose,visible,handleAddComment,successMessage,data,setData }) => {
    
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visiblee}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeButtonInner}>
              <Text style={styles.closeButtonText}>x</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Add Comment</Text>
          <TextInput
            placeholder="Title"
            value={data.title}
            onChangeText={(text) => setData({ ...data, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Comment Detail"
            value={data.comment}
            onChangeText={(text) => setData({ ...data, comment: text })}
            multiline
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
            <Text style={styles.addButtonText}>Add Comment</Text>
          </TouchableOpacity>
          <Text>
          {successMessage && visible && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
  },
  closeButtonInner: {
    backgroundColor: '#3498db',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    flex:1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successMessage: {
    color: '#00A86B', // Customize success message color
    fontSize: 16,
    marginTop: 10,
  },
});

export default AddCommentModal;
