import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import OtpInput from './components/OtpInput';


interface ScreenProps extends NativeStackScreenProps<any> {

}

const OtpInputDemo: React.FC<ScreenProps> = () => {

    const [otp, setOtp] = useState('')
    const onChangeOtp = (text: string) => setOtp(text)


    const [generatedOtp, setGeneratedOtp] = useState('')
    const generateOtp = () => {
        let newOtp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOtp(newOtp.toString())
    }
    useEffect(() => {
        generateOtp()
    }, [])


    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>
                Otp Inputs Demo
            </Text>

            <View style={styles.flexRow}>
                <Button
                    title='Generate New Otp'
                    onPress={generateOtp}
                />
                <Text style={styles.genratedOtpText}>
                    {` Current OTP :  ${generatedOtp}`}
                </Text>
            </View>

            <OtpInput
                value={otp}
                numberOfInputs={4}
                onChangeText={onChangeOtp}
                inputsContainerStyle={styles.otpInputsContainer}
            />

            <Text style={generatedOtp === otp ? styles.successText : styles.errorText}>
                {
                    generatedOtp === otp
                        ? "Otp is matching ✅ "
                        : "Otp is not matching ❌ "
                }
            </Text>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginTop: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flexRow: {
        marginTop: 50,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    otpInputsContainer: {
        marginTop: 80
    },
    genratedOtpText: {
        fontSize: 17,
        marginLeft: 10,
        textDecorationLine: 'underline'
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginTop: 30,
        textAlign: 'center',
    },
    successText: {
        fontSize: 16,
        color: 'green',
        marginTop: 30,
        textAlign: 'center',
    },
});

export default OtpInputDemo;