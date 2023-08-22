import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MultiStepRegistration = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationalId: '',
        password: '',
    });

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleFormChange = (key, value) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={formData.firstName}
                            onChangeText={value => handleFormChange('firstName', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            value={formData.firstName}
                            onChangeText={value => handleFormChange('firstName', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={formData.firstName}
                            onChangeText={value => handleFormChange('firstName', value)}
                            keyboardType="email-address"
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="National ID"
                            value={formData.nationalId}
                            onChangeText={value => handleFormChange('nationalId', value)}
                        />
                        {/* Other inputs */}
                    </>
                );
            // Add more cases for other steps
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create an Account</Text>
            {renderStepContent()}
            <View style={styles.buttonContainer}>
                {step > 1 && <Button title="Previous" onPress={handlePreviousStep} />}
                {step < 2 && (
                    <Button title="Next" onPress={handleNextStep} />
                )}
                {step === 2 && (
                    <Button title="Register" onPress={() => console.log(formData)} />
                )}
            </View>
        </View>
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
});

export default MultiStepRegistration;
