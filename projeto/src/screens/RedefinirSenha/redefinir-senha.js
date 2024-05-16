import { useEffect, useState } from "react";
import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerProfile } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";
import { api } from "../../services/service";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { ActivityIndicator } from "react-native";

export const RedefinirSenha = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    const [enableButton, setEnableButton] = useState(true)

    const [mostrarLoading, setMostrarLoading] = useState(false)

    useEffect(() => {
        setEmail(route.params.userEmail)
    }, [route])

    const HandlePress = async () => {
        if (senha === confirmaSenha) {
            setEnableButton(false)
            setMostrarLoading(true)
            await api.put(`/Usuario/AlterarSenha?email=${email}`, {
                senhaNova: senha
            }).then(() => {
                console.log("senha atualizada");
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
                alert(error)
            })
            setMostrarLoading(false)
            setEnableButton(true)
        } else {
            alert("As senhas não coincidem")
        }
    }

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
            <TitleRedefinirSenha>Redefinir senha</TitleRedefinirSenha>
            <TextRegular>Insira e confirme a sua nova senha</TextRegular>
            <BoxInput>
                <Input
                    placeholderText={"Nova senha"}
                    editable
                    fieldvalue={senha}
                    onChangeText={text => setSenha(text)}
                    multiline={false}
                    secure
                />
                <Input
                    placeholderText={"confirmar nova senha"}
                    editable
                    fieldvalue={confirmaSenha}
                    onChangeText={text => setConfirmaSenha(text)}
                    multiline={false}
                    secure
                />
            </BoxInput>
            <Button disable={!enableButton} onPress={enableButton ? () => HandlePress() : null}>
                {mostrarLoading ?
                    <ActivityIndicator color={"#FBFBFB"} />
                    :
                    <ButtonTitle>Confirmar nova senha</ButtonTitle>
                }

            </Button>
        </ContainerProfile>
    )
}
