import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const UpdateRegistration = ({route,navigation }) => {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        nID: '',
        password: '',
    });
    const { person } = route.params;
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('');
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 6000);
    }
    const [msg, setMsg] = useState();
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const validateInputs = () => {
        if (
            data.firstname === "" ||
            data.lastname === "" ||
            data.email === "" ||
            data.phone === "" ||
            data.nID === "" ||
            data.password === ""
        ) {
            setMsg("Please fill in all fields.");
            showAlert();
            return false;
        }

        if (!isValidEmail(data.email)) {
            setMsg("Invalid email format.");
            showAlert();
            return false;
        }

        return true;
    };
    function UpdateHandler() {
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
        fetch("http://192.168.43.236:8000/api/user/modify", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("INVALID EMAIL OR PASSWORD");
                    if (response.status === 400) {
                        setMsg("UNABLE TO UPDATE")
                        showAlert();
                    }
                }
                else {
                    if (response.ok) {
                        setMsg("SUCCESFULLY UPDATED ")
                        showAlert();
                        navigation.navigate("user account")
                    }
                }
            })
            .catch((error) => {
                showAlert();
                setMsg("unexpected error occured");
                console.log(error);
            });
    }

    useEffect(() => {
        setData(person)
    },[])

    const renderStepContent = () => {
        return (
            <>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    value={data.firstname}
                    onChangeText={(text) => setData({ ...data, firstname: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    value={data.lastname}
                    onChangeText={(text) => setData({ ...data, lastname: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={data.email}
                    onChangeText={(text) => setData({ ...data, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={data.phone}
                    onChangeText={(text) => setData({ ...data, phone: text })}
                    keyboardType="phone-pad"
                />

            </>
        );
    }
    return (
        <>
            <View>
                <Image source={require("../../assets/onlinenews.jpg")} style={styles.headerImage} />
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Update user</Text>
                <View>
                    {msg && visible && (
                        <View style={msg == "SUCCESFULLY REGISTERED ,WAIT ON THE ADMIN APPROVAL" ? styles.messageContainerSuccess : styles.messageContainer}>
                            <Text style={msg == "SUCCESFULLY REGISTERED ,WAIT ON THE ADMIN APPROVAL" ? styles.messageTextSuccess : styles.messageText}>{msg}</Text>
                        </View>
                    )}
                </View>
                <ScrollView>
                    {renderStepContent()}
                    <View>
                    <TouchableOpacity style={styles.registerButton} onPress={UpdateHandler}>
                        <Text style={styles.registerButtonText}>Update user</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                
            </View>

        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginBottom: 40
    },
    headerImage: {
        width: '100%',
        height: 200,
        marginTop: 40,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    previousButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
    messageContainerSuccess: {
        backgroundColor: '#5CD859', // Customize the background color for success
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#5CD859', // Customize the border color for success
    },
    messageTextSuccess: {
        color: '#fff', // Customize the text color for success
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default UpdateRegistration;
