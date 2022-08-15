import React, { FC, useRef, useState } from 'react'
import { Keyboard, Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'


interface Props {
    value: string,
    numberOfInputs: number,
    onChangeText: Function,
    inputStyle?: StyleProp<ViewStyle>,
    inputViewStyle?: StyleProp<ViewStyle>,
    inputsContainerStyle?: StyleProp<ViewStyle>,
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    let newChar = chr === '' ? "_" : chr
    return str.substring(0, index) + newChar + str.substring(index + 1);
}


const OtpInputs: FC<Props> = (props) => {

    const { numberOfInputs } = props

    const [pins, setPins] = useState('_'.repeat(numberOfInputs))

    let inputs = Array<number>(numberOfInputs).fill(0)
    let pinsRef = useRef<Array<TextInput | null>>([])

    const onChangeText = (char: string, index: number) => {
        let newPins = setCharAt(pins, index, char)
        props.onChangeText(newPins)
        setPins(newPins)
        if (char !== "") {
            if (index == numberOfInputs - 1) Keyboard.dismiss();
            else pinsRef.current[index + 1]?.focus();
        }
        else if (index > 0) pinsRef.current[index - 1]?.focus();
    }

    return (
        <View style={[styles.inputsContainer, props.inputsContainerStyle]}>
            {inputs.map((item, index) =>
                <View style={[styles.inputView, props.inputViewStyle]} key={index}>
                    <TextInput
                        maxLength={1}
                        selectTextOnFocus
                        keyboardType='number-pad'
                        placeholderTextColor={"grey"}
                        /** Refer this issue for multiline prop https://stackoverflow.com/questions/60276121/textinput-cursor-jump-to-right-end-when-the-input-is-empty */
                        multiline={Platform.OS === 'android'}
                        style={[styles.input, props.inputStyle]}
                        ref={ref => (pinsRef.current[index] = ref)}
                        onChangeText={(char) => onChangeText(char, index)}
                        placeholder={Platform.OS === "ios" ? "__" : "__"}
                        value={pins.charAt(index) === '_' ? '' : pins.charAt(index)}
                    />
                </View>
            )}
        </View>
    )
}

export default OtpInputs

const styles = StyleSheet.create({
    inputsContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputView: {
        flex: 1,
        maxWidth: 50,
        height: 50,
        borderWidth: 1,
        elevation: 5,
        shadowRadius: 2,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        borderRadius: (5),
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        justifyContent: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
    },
    input: {
        color: 'black',
        width: '100%',
        height: '100%',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    }
})