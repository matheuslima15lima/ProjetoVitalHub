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

    const [email, setEmail] = useState("")

    const [mostrarLoading, setMostrarLoading] = useState(false)

    const HandlePress = async () => {
        const codigoCompleto = `${primeiroCodigo}${segndoCodigo}${terceiroCodigo}${quartoCodigo}`

        if (codigoCompleto.trim().length < 4) {
            alert("Preencha todos os campos!")
            return null
        } else {
            setMostrarLoading(true)
            await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${email}&codigo=${codigoCompleto}`)
                .then(retoronApi => {
                    navigation.replace("RedefinirSenha", { userEmail: email })
                }).catch(erro => {
                    alert(erro)
                })
            setMostrarLoading(false)
        }
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
                    fieldvalue={primeiroCodigo}
                    editable
                    onChangeText={text => setPrimeiroCodigo(text)}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={segndoCodigo}
                    editable
                    onChangeText={text => setSegundoCodigo(text)}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={terceiroCodigo}
                    editable
                    onChangeText={text => setTerceiroCodigo(text)}
                />
                <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail
                    maxLength={1}
                    fieldvalue={quartoCodigo}
                    editable
                    onChangeText={text => setQuartoCodigo(text)}
                />
            </BoxInputRow>
            <Button onPress={() => HandlePress()}>
                {mostrarLoading ?
                    <ActivityIndicator color={"#FBFBFB"} />
                    :
                    <ButtonTitle onPress={() => HandlePress()}>Confirmar</ButtonTitle>
                }

            </Button>
            <LinkReenviarEmail onPress={() => ReenviarEmail(route.params.userEmail)}>Reenviar Código</LinkReenviarEmail>
        </ContainerProfile>
    )
}