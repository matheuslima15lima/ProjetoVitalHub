import { ButtonTitle, ButtonTitleGoogle, ButtonTitleLight, TextAccount, TitleLogin } from "../../components/Text/style";
import { LogoVitalHub } from "../../components/Logo";
import { BoxButton, BoxInput, ContentAccount } from "../../components/Box/style";
import { Input } from "../../components/Input";
import { LinkAccount, LinkRedefinirSenha } from "../../components/Link";
import { AntDesign } from '@expo/vector-icons';
import { ContainerProfile } from "../../components/Container/style";
import { Button, ButtonGoogle } from "../../components/Button/styled";
import { LinkSemiBold } from "../../components/Link/style";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/service";
import { ActivityIndicator } from "react-native";
import { verificarCamposFormulario } from "../../utils/funcoesUteis";

export const Login = ({ navigation }) => {
    const [dadosLogin, setDadosLogin] = useState({
        email: "",
        senha: ""
    });

    const [mostrarLoading, setMostrarLoading] = useState(false)
    const [enableButton, setEnableButton] = useState(true)

    const Login = async () => {
        setEnableButton(false)
        setMostrarLoading(true)
        await api.post("/Login", {
            email: dadosLogin.email,
            senha: dadosLogin.senha
        }).then(async response => {
            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            navigation.replace("Main")
        }).catch(error => {
            alert(error)
        })
        setEnableButton(true)
        setMostrarLoading(false)
    }

    useEffect(() => {
        setEnableButton(verificarCamposFormulario(dadosLogin))
    }, [dadosLogin])

    return (
        <ContainerProfile>
            <LogoVitalHub />
            <TitleLogin>Entrar ou criar conta</TitleLogin>
            <BoxInput>
                <Input
                    placeholderText={"Usuário ou email"}
                    fieldvalue={dadosLogin.email}
                    onChangeText={(text) => setDadosLogin({...dadosLogin, email: text})}
                    editable
                />
                <Input
                    placeholderText={"Senha"}
                    fieldvalue={dadosLogin.senha}
                    multiline={false}
                    secure={true}
                    onChangeText={(text) => setDadosLogin({...dadosLogin, senha: text})}
                    editable
                />
                <LinkRedefinirSenha onPress={() => navigation.navigate("ReceberEmail")}>Esqueceu sua senha?</LinkRedefinirSenha>
            </BoxInput>
            <BoxButton>
                <Button 
                    onPress={enableButton ? () => Login() : (!mostrarLoading ? () => alert("Preencha todos os campos") : null)}
                    // onPress={() => Login()}
                    disable={!enableButton}
                >
                    {mostrarLoading ?
                    <ActivityIndicator color={"#FBFBFB"} />
                    : 
                    <ButtonTitle>Entrar</ButtonTitle>
                    }
                </Button>
                <ButtonGoogle onPress={() => Login()}>
                    <AntDesign name="google" size={20} color={"#496BBA"} />
                    <ButtonTitleLight>Entrar com Google</ButtonTitleLight>
                </ButtonGoogle>
            </BoxButton>
            <ContentAccount>
                <TextAccount>Não tem conta?</TextAccount>
                <LinkSemiBold onPress={() => navigation.replace("Cadastro")} > Crie sua conta aqui</LinkSemiBold>
            </ContentAccount>
        </ContainerProfile>
    )
}
