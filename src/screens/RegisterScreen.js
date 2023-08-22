import { Block, Text, theme } from "galio-framework";
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

const RegisterScreen = ({ navigation }) => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        nID: "",
        password: ""
    });
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message,setMessage]=useState('');
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 4000);
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

        if (data.phone.length !== 10) {
            setMsg("Phone number must be 10 digits.");
            showAlert();
            return false;
        }
        if (data.nID.length !== 20) {
            setMsg("National Identity must be 20 characters.");
            showAlert();
            return false;
        }
        return true;
    };
    function RegisterHandler() {
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
        fetch("http://localhost:8000/api/user/register", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    console.log("INVALID EMAIL OR PASSWORD");
                    if (response.status == 405) {
                        setMsg("EMAIL OR PHONE NUMBER USED")
                        showAlert();
                    }
                }
                else {
                    if (response.ok) {
                        showAlert();
                        setMessage("SUCCESFULLY REGISTERED ,WAIT ON THE ADMIN APPROVAL")
                    }
                }
            })
            .catch((error) => {
                showAlert();
                setMsg("unexpected error occured");
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
                
                <Block flex center>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                        enabled
                    >
                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="First Name"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="hat-3"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, firstname: text })}
                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="Last Name"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="ic_mail_24px"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, lastname: text })}
                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="Email"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="ic_mail_24px"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, email: text })}
                            />
                        </Block>
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
                                onChangeText={(text) => setData({ ...data, nID: text })}
                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                            <Input
                                borderless
                                placeholder="phone"
                                iconContent={
                                    <Icon
                                        size={16}
                                        color={argonTheme.COLORS.ICON}
                                        name="ic_mail_24px"
                                        family="ArgonExtra"
                                        style={styles.inputIcons}
                                    />
                                }
                                onChangeText={(text) => setData({ ...data, phone: text })}
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
                                onPress={RegisterHandler}
                            >
                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                    CREATE ACCOUNT
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

export default RegisterScreen;