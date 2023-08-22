import { Block, Text, theme } from "galio-framework";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Dimensions,
} from "react-native";

import {
    KeyboardAvoidingView,
    ScrollView
} from "react-native";

import { Button, Icon, Input } from "../components";
import { argonTheme } from "../constants";
import { useState, useRef } from "react";
const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
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
        // if (data.nid.length !== 20) {
        //     setMsg("National Identity must be 20 characters.");
        //     showAlert();
        //     return false;
        // }
        return true;
    };
    function LoginHandler() {
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
                        setMsg("INVALID EMAIL OR PASSWORD")
                        showAlert();
                    }
                    else {
                        if (response.status == 403) {
                            setMessage("YOUR ACCOUNT HAS NOT YET BEEN VERIFIED YET")
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
            <ScrollView>
                {msg && visible && (
                    <Block flex center>
                        <Button color="error" style={{
                            marginBottom: theme.SIZES.BASE,
                            width: width * 0.8,
                        }}>
                            <Text>{msg}</Text>
                        </Button>
                    </Block>
                )}
                {/* {message && visible && (
                    <Block flex center>
                        <Button color="success" style={{
                            marginBottom: theme.SIZES.BASE,
                            width: width * 0.8,
                        }}>
                            <Text>{message}</Text>
                        </Button>
                    </Block>
                )} */}
                <Block flex center>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                        enabled
                    >

                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="National Identity"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="ic_mail_24px"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, nid: text })}
                            />
                        </Block>

                        <Block width={width * 0.8}>
                            <Input
                                password
                                borderless
                                placeholder="Password"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="padlock-unlocked"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, password: text })}
                            />
                        </Block>
                        <Block middle>
                            <Button color="success"
                                style={styles.createButton}
                                onPress={LoginHandler}
                            >
                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                    LOGIN
                                </Text>
                            </Button>
                        </Block>
                    </KeyboardAvoidingView>
                </Block>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.875,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25
    }
});

export default Login;