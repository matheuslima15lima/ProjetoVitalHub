import styled, { css } from "styled-components";

export const InputField = styled.TextInput.attrs({
    placeholderTextColor: props => props.inputError ? '#F54A45' : "#49B3BA",
    multiline: true,
    secureTextEntry: props => props.secure ? true : false
})`
    border: 2px solid #49B3BA;
    border-radius: 5px;
    width: 100%;
    padding: 16px;
    ${props => props.center && css`
        justify-content: center;
        align-items: center;
    `}
    ${props => props.inputError && css`
        border-color: #F54A45;
    `}
`

export const InputVirifyEmail = styled(InputField)`
    align-items: center;
    justify-content: center;
    padding: 5px 20px;
    text-align: center;
    font-size: 40px;
    font-family: "Quicksand_600SemiBold";
    color: #34898F;
    width: 20%;
    margin-bottom: 30px;
`

export const PerfilInputField = styled(InputField).attrs({
    placeholderTextColor: "#33303E"
})
`
    border-color: #F5F3F3;
    background-color: #F5F3F3;
    padding-bottom: ${props => `${props.fieldHeight}px`};
    color: #4E4B59;
    font-size: 14px;
    font-family: "MontserratAlternates_500Medium";
`

export const ApointmentInputField = styled(InputField).attrs({
    placeholderTextColor: "#34898F"
})
`
    background-color: transparent;
    border-color: #49B3BA;
    padding-bottom: ${props => `${props.fieldHeight}px`};
    ${props => props.center && css`
        justify-content: center;
        align-items: center;
    `}
`