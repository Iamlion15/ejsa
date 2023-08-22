import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import myTheme from "../../constants/Theme"

const DrawerItem = ({ label, focused, onPress }) => {
    const containerStyles = [
        styles.defaultStyle,
        focused ? [styles.activeStyle, styles.shadow] : null
    ];
    return (
        <TouchableOpacity style={{ height: 60 }} onPress={onPress}>
            <Block flex row style={containerStyles}>
                <Block row center flex={0.9}>
                    <Text
                        size={15}
                        bold={focused ? true : false}
                        color={focused ? "white" : "rgba(0,0,0,0.5)"}
                    >
                        {label}
                    </Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    defaultStyle: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    activeStyle: {
        backgroundColor: myTheme.COLORS.ACTIVE,
        borderRadius: 4
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.1
    }
});

export default DrawerItem;

