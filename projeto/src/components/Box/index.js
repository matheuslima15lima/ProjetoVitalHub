import { ButtonModal } from "../Button/styled";
import { Input, InputSelect } from "../Input";
import { InputField, PerfilInputField } from "../Input/style";
import { LinkCancel } from "../Link";
import { ButtonTitle, InputLabel } from "../Text/style";
import { InputContentBox } from "./style";

export const BoxInputField = ({
    labelText, placeholderText, fieldWidth = "100",
    keyType = "default", onChangeText = null, maxLength, fieldValue = null, editable = false, fieldHeight = "16", apointment = false, inputPerfil, center = false
}) =>
    <InputContentBox fieldWidth={fieldWidth}>
        <InputLabel>{labelText}</InputLabel>

        <Input
            placeholderText={placeholderText}
            keyboardType={keyType}
            maxLength={maxLength}
            onChangeText={onChangeText}
            fieldvalue={fieldValue}
            inputPerfil={inputPerfil}
            editable={editable}
            fieldHeight={fieldHeight}
            apointment={apointment}
            center={center}
        />
    </InputContentBox>

export const ButtonContinuarBox = ({manipulationFunction = null, openModalFunction = null, functionCancel = null, buttonText = "Continuar"}) => 
    <>
        <ButtonModal onPress={manipulationFunction}>
            <ButtonTitle>{buttonText}</ButtonTitle>
        </ButtonModal>

        <LinkCancel onPress={functionCancel}>Cancelar</LinkCancel>
    </>

export const BoxInputSelect = ({labelText}) => {
    return(
        <InputContentBox
            fieldWidth={"90"}
        >
            <InputLabel>{labelText}</InputLabel>
            <InputSelect/>
        </InputContentBox>
    )
}