import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TableHeader = () => (
    <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Newspaper</Text>
        <Text style={styles.headerText}>Total articles</Text>
    </View>
);

const TableItem = ({ name, description, navigation }) => (
    <View style={styles.tableRow}>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("info", { newspaperName: name })}>
            <Text style={styles.tableCellDescription}>{name}</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.tableCell}>{description}</Text>
    </View>
);
const NewspaperTable = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const fetchNews = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        console.log(token)

        if (!token) {
            console.log("token not available");
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        fetch("http://192.168.43.236:8000/api/admin/newspaperstats", requestOptions)
            .then((response) => {
                if (!response.ok) {

                    setMessage("PLEASE RETRY")
                }
                return response.json();
            })
            .then(value => {
                console.log(value)
                setData(value);
            })
            .catch(error => {
                console.log(error.message)
                setMessage("connect your server")
            })
    }
    useEffect(() => {
        fetchNews();
    }, []);

    const filteredContent = data.filter((item) =>
        item.Newspaper.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Newspaper percentage contribution</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            <TableHeader />
            <FlatList
                data={filteredContent}
                keyExtractor={(item) => item.Newspaper}
                renderItem={({ item }) => <TableItem name={item.Newspaper} description={item.Totalarticles} navigation={navigation}
                />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        color: '#555',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 4, // Add elevation to create a raised effect
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        color: '#555',
        textAlign: 'right', // Align the text to the right
    },
    tableCellDescription: {
        flex: 1,
        fontSize: 16,
        color: '#555',
    },
});

export default NewspaperTable;
