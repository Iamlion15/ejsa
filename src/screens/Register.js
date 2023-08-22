import { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon } from "../components";
import { argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");
import RegisterScreen from "./RegisterScreen";

import Login from "./Login";

const Register = ({navigation}) => {
  const [isRegisterScreen, setIsRegisterScreen] = useState(true);
  return (
    <Block flex middle>
      <StatusBar hidden />
      {/* <ImageBackground
        source={Images.}
        style={{ width, height, zIndex: 1 }}
      > */}
      <Block safe flex middle>
        <Block style={styles.registerContainer}>
          <Block flex={0.25} middle style={styles.socialConnect}>
            <Text color="#8898AA" size={12}>
              INTERACT WITH THE SYSTEM
            </Text>
            <Block row style={{ marginTop: theme.SIZES.BASE }}>
              <Button
                onPress={() => setIsRegisterScreen(false)}
                color={isRegisterScreen ? "default" : "white"}
              >
                <Block row
                >
                  <Icon
                    name="logo-github"
                    family="Ionicon"
                    size={14}
                    color={"black"}
                    style={{ marginTop: 2, marginRight: 5 }}
                  />
                  <Text style={
                    isRegisterScreen
                      ? styles.socialTextButtonsfOCUSED
                      : styles.socialTextButtons
                  }>REGISTER</Text>
                </Block>
              </Button>
              <Button
                onPress={() => setIsRegisterScreen(false)}
                color={isRegisterScreen ? "white" : "default"}
              >
                <Block row>
                  <Icon
                    name="logo-google"
                    family="Ionicon"
                    size={14}
                    color={"black"}
                    style={{ marginTop: 2, marginRight: 5 }}
                  />
                  <Text style={
                    isRegisterScreen
                      ? styles.socialTextButtons
                      : styles.socialTextButtonsfOCUSED
                  }>LOGIN</Text>
                </Block>
              </Button>
            </Block>
          </Block>
          <Block flex>
            {isRegisterScreen ? <RegisterScreen  /> : <Login navigation={navigation} />}
          </Block>
        </Block>
      </Block>
      
    </Block>
  );
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
  registerContainerLogin: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    width: width * 0.9,
    height: "auto",
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
  socialTextButtonsfOCUSED: {
    color: argonTheme.COLORS.WHITE,
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

export default Register;
