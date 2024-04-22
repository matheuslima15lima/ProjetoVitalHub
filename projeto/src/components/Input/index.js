import { ApointmentInputField, InputField, InputVirifyEmail, PerfilInputField } from "./style";

import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Input = ({
    placeholderText, keyType = "default", onChangeText = null, maxLength, fieldvalue = null, verifyEmail = false, inputPerfil = false, editable = false, fieldHeight = "16", apointment = false, center = false, secure = false, inputError = false, autoFocus = false, fieldWidth = 100, ref
}) => {
    if (verifyEmail) {
        return (
            <InputVirifyEmail
                ref={ref}
                placeholder={placeholderText}
                keyboardType={keyType}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={fieldvalue}
                editable={editable}
                secureTextEntry={secure}
                fieldWidth={fieldWidth}

            />
        )
    } else if (inputPerfil) {
        return (
            <PerfilInputField
                placeholder={placeholderText}
                keyboardType={keyType}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={fieldvalue}
                editable={editable}
                fieldHeight={fieldHeight}
                secureTextEntry={secure}
                fieldWidth={fieldWidth}
            />
        )
    } else if (apointment) {
        return (
            <ApointmentInputField
                placeholder={placeholderText}
                keyboardType={keyType}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={fieldvalue}
                editable={editable}
                fieldHeight={fieldHeight}
                center={center}
                secureTextEntry={secure}
                fieldWidth={fieldWidth}
            />
        )
    } else {
        return (
            <InputField
                placeholder={placeholderText}
                keyboardType={keyType}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={fieldvalue}
                editable={editable}
                center={center}
                secureTextEntry={secure}
                inputError={inputError}
                autoFocus={autoFocus}
                fieldWidth={fieldWidth}
            />
        )
    }

}

export const InputSelect = () => {
    return (
        <View style={{ width: 316, borderWidth: 2, marginBottom: 75, borderStyle: "solid", borderColor: "#34898F", borderRadius: 5 }}>
            <RNPickerSelect
                style={style}
                Icon={() => {
                    return <FontAwesomeIcon style={{marginLeft: "1%"}} icon={faCaretDown} color='#34898F' size={22} />
                }}
                placeholder={{
                    label: 'Selecione um valor',
                    value: null,
                    color: '#34898F'
                }}
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "TypeScript", value: "TypeScript" },
                    { label: "Python", value: "Python" },
                    { label: "Java", value: "Java" },
                    { label: "C++", value: "C++" },
                    { label: "C", value: "C" },
                ]}
            />
        </View>
    )
}

const style = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    inputAndroid: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    iconContainer: {
        top: '25%',
        marginRight: 10
    },
    placeholder: {
        color: '#34898F',
    }
})