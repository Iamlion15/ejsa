import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import { argonTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCommentScreen = ({ route, navigation }) => {
    const { news } = route.params;
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 4000);
    }
    const [data, setData] = useState({
        title: "",
        comment: "",
        news: news,
    })
    console.log("news id: "+data.news)
    console.log(news);
    const [successMessage, setSuccessMessage] = useState('');
    const handleAddComment = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        console.log(token);
        // setData({...data,news:news})
        console.log(data)
        if (!token) {
            console.log('token not available');
            return;
        }
        console.log("before sendind news id "+data.news)
        const methodOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        fetch("http://192.168.43.236:8000/api/user/addreview", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 500) {
                        console.log(response)
                    }
                }
                else {
                    if (response.ok) {
                        setSuccessMessage("Comment added successfully!");
                        showAlert()
                        //navigation.goBack();    
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <ScrollView style={styles.container}>
            <Block style={styles.content}>
                <Text h4 style={styles.title}>Add Comment</Text>
                <Input
                    placeholder="Title"
                    onChangeText={(text) => setData({ ...data, title: text })}
                    style={styles.input}
                    iconContent={<Block />}
                />
                <Input
                    placeholder="Comment Detail"
                    onChangeText={(text) => setData({ ...data, comment: text })}
                    multiline
                    style={styles.detailInput}
                    iconContent={<Block />}
                />
                <Button color={argonTheme.COLORS.SUCCESS} style={styles.button} onPress={handleAddComment}>
                    <Text style={styles.buttonText}>Add Comment</Text>
                </Button>
                <Text>
                {successMessage && visible && (
                    <Block style={styles.successMessage}>
                            <Block>
                                <Text style={styles.successText}>{successMessage}</Text>
                            </Block>
                    </Block>
                    )}
                    </Text>
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
        color: argonTheme.COLORS.HEADER,
    },
    input: {
        marginBottom: theme.SIZES.BASE,
        borderRadius: theme.SIZES.BASE / 2,
        borderColor: argonTheme.COLORS.BORDER,
        borderWidth: 1,
        paddingLeft: theme.SIZES.BASE,
    },
    detailInput: {
        marginBottom: theme.SIZES.BASE,
        borderRadius: theme.SIZES.BASE / 2,
        borderColor: argonTheme.COLORS.BORDER,
        borderWidth: 1,
        paddingLeft: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE,
        height: 120,
    },
    button: {
        marginBottom: theme.SIZES.BASE,
        width: '100%',
        borderRadius: theme.SIZES.BASE / 2,
    },
    buttonText: {
        color: theme.COLORS.WHITE,
        fontSize: theme.SIZES.FONT,
        fontWeight: 'bold',
    },
    successMessage: {
        backgroundColor: argonTheme.COLORS.SUCCESS,
        borderRadius: theme.SIZES.BASE / 2,
        padding: theme.SIZES.BASE,
        marginTop: theme.SIZES.BASE,
    },
    successText: {
        color: theme.COLORS.WHITE,
        fontSize: theme.SIZES.FONT,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddCommentScreen;
