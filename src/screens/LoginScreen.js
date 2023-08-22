import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
    const [data, setData] = useState({
        nid: "",
        password: ""
    });
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 4000);
    }
    const [msg, setMsg] = useState();
    const validateInputs = () => {
        if (
            data.nid === "" ||
            data.password === ""
        ) {
            setMsg("Please fill in all fields.");
            showAlert();
            return false;
        }
        return true;
    };
    function handleLogin() {
        if (!validateInputs()) {
            return;
        }
        const methodOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/JSON",
            },
        };
        fetch("http://192.168.43.236:8000/api/user/login", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status == 401) {
                        console.log("INVALID EMAIL OR PASSWORD");
                        setMsg("Invalid email or password")
                        showAlert();
                    }
                    else {
                        if (response.status == 403) {
                            setMessage("Your account has not yet been approved")
                            showAlert()
                        }
                    }
                }
                else {
                    if (response.ok) {
                        return response.json();
                    }
                }
            })
            .then((value) => {
                if (value.message === "200") {
                    // Store the token in SecureStore
                    AsyncStorage.setItem('UserToken', value.token)
                        .then(() => {
                            // Navigate to the next screen or perform any other action
                            navigation.navigate('Home');
                        })
                        .catch((error) => {
                            console.log('Error storing token:', error);
                        });
                }
            })
            .catch((error) => {
                // setMsg("unexpected error occured");
                console.log(error);
            });
    }
    return (
        <>
            <View>
                <Image source={require("../../assets/onlinenews.jpg")} style={styles.headerImage} />
            </View>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Electronic Journal sentiment analysis</Text>
                <View>
                    {msg && visible && (
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{msg}</Text>
                        </View>
                    )}
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="National Identification"
                            placeholderTextColor="#a9a9a9"
                            onChangeText={(text) => setData({ ...data, nid: text })}
                            value={data.nid}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#a9a9a9"
                            secureTextEntry
                            onChangeText={(text) => setData({ ...data, password: text })}
                            value={data.password}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupLink}>
                        <Text style={styles.signupText}>
                            Don't have an account?{' '}
                            <Text style={styles.signupButton} onPress={() => navigation.navigate('register')}>
                                Sign up
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0', // Background color
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    logo: {
        fontSize: 15, // Adjust the font size as needed
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    headerImage: {
        width: '100%',
        height: 200,
        marginTop: 40,
    },
    input: {
        height: 50,
        backgroundColor: 'white', // Input background color
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 10,
        color: '#333', // Input text color
    },
    loginButton: {
        backgroundColor: '#FFD700', // Button background color
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Button text color
    },
    signupLink: {
        marginTop: 20,
    },
    signupText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    signupButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6F61', // Button text color
    },
    messageContainer: {
        backgroundColor: '#ffcccc', // Customize the background color
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ff6666', // Customize the border color
    },
    messageText: {
        color: '#cc0000', // Customize the text color
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default LoginScreen;
