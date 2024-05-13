import { useState } from "react";
import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerProfile } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";
import { api } from "../../services/service";
import { ActivityIndicator } from "react-native";

export const ReceberEmail = ({ navigation }) => {

    const [mostrarLoading, setMostrarLoading] = useState(false)

    const [email, setEmail] = useState("")

    const HandlePrees = async () => {
        setMostrarLoading(true)
        await api.post(`/RecuperarSenha?email=${email}`)
            .then(() => {
                navigation.replace("VerificarEmail", { userEmail: email })
            }).catch(error => {
                alert(error)
            })
        setMostrarLoading(false)
    }

    return (
        <ContainerProfile>
            <IconContainer
                onPress={() => navigation.replace("Login")}
            >
                <IconImage
                    source={require("../../assets/images/voltar_icon.png")}
                />
            </IconContainer>
            <LogoVitalHub />
            <TitleRedefinirSenha>Recuperar senha</TitleRedefinirSenha>
            <TextRegular>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextRegular>
            <BoxInput>
                <Input
                    placeholderText={"Insira seu email aqui"}
                    editable
                    fieldvalue={email}
                    onChangeText={text => setEmail(text)}
                />
            </BoxInput>
            <Button onPress={() => HandlePrees()}>
                {mostrarLoading ?
                    <ActivityIndicator color={"#FBFBFB"} />
                    :
                    <ButtonTitle>Confirmar</ButtonTitle>
                }
            </Button>
        </ContainerProfile>
    )
}