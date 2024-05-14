import { TouchableOpacity } from "react-native";
import { BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerProfile } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkReenviarEmail, LinkVerifyEmail } from "../../components/Link";
import { LogoVitalHub } from "../../components/Logo";
import { ButtonTitle, TextRegular, TitleVerificarEmail } from "../../components/Text/style"
import { IconCntainer, IconImage } from "../../components/NavigationIcons/style";
import { IconContainer } from "../../components/NavigationIcons/style";
import { useEffect, useState } from "react";
import { api } from "../../services/service";

export const VerificarEmail = ({ navigation, route }) => {

    const [primeiroCodigo, setPrimeiroCodigo] = useState("")
    const [segndoCodigo, setSegundoCodigo] = useState("")
    const [terceiroCodigo, setTerceiroCodigo] = useState("")
    const [quartoCodigo, setQuartoCodigo] = useState("")

    const codigoCompleto = ["", "", "", ""]

    const [email, setEmail] = useState("")

    const [mostrarLoading, setMostrarLoading] = useState(false)

    const [enableButton, setEnableButton] = useState(false)

    const HandlePress = async (codigo) => {
        setEnableButton(false)
        setMostrarLoading(true)
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${email}&codigo=${codigo}`)
            .then(() => {
                navigation.replace("RedefinirSenha", { userEmail: email })
            }).catch(erro => {
                alert(erro)
            })
        setMostrarLoading(false)
        setEnableButton(true)
    }

    const ReenviarEmail = async (email) => {
        await api.post(`/RecuperarSenha?email=${email}`)
            .then(() => {
                alert("Email reenviado!")
            }).catch(error => {
                alert(error)
            })
    }

    useEffect(() => {
        setEmail(route.params.userEmail)
    }, [route])

    useEffect(() => {
        codigoValido = true

        codigoCompleto.forEach(codigo => {
            if (codigo == "") {
                codigoValido = false
            }
        });

        if (codigoValido) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }, [codigoCompleto])

    useEffect(() => {

    })

    return (
        <ContainerProfile>
            <IconContainer
                onPress={() => navigation.replace("Login")}
            >
                <IconImage
                    source={require("../../assets/images/fechar_icon.png")}
                />
            </IconContainer>
            <LogoVitalHub />
            <TitleVerificarEmail>
                Verifique seu email
            </TitleVerificarEmail>
            <TextRegular>Digite o código de 4 dígitos enviado para</TextRegular>
            <LinkVerifyEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>{route.params.userEmail}</LinkVerifyEmail>
            <BoxInputRow>
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={codigoCompleto[0]}
                    editable
                    onChangeText={text => { codigoCompleto[0] = text }}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={codigoCompleto[1]}
                    editable
                    onChangeText={text => { codigoCompleto[1] = text }}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={codigoCompleto[2]}
                    editable
                    onChangeText={text => { codigoCompleto[2] = text }}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={codigoCompleto[3]}
                    editable
                    onChangeText={text => { codigoCompleto[3] = text }}
                />
            </BoxInputRow>
            <Button disable={!enableButton} onPress={enableButton ? () => HandlePress() : null}>
                {mostrarLoading ?
                    <ActivityIndicator color={"#FBFBFB"} />
                    :
                    <ButtonTitle onPress={enableButton ? () => HandlePress() : null}>Confirmar</ButtonTitle>
                }

            </Button>
            <LinkReenviarEmail onPress={() => ReenviarEmail(route.params.userEmail)}>Reenviar Código</LinkReenviarEmail>
        </ContainerProfile>
    )
}