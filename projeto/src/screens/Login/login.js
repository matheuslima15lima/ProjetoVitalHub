import { ButtonTitle, ButtonTitleGoogle, ButtonTitleLight, TextAccount, TitleLogin } from "../../components/Text/style";
import { LogoVitalHub } from "../../components/Logo";
import { BoxButton, BoxInput, ContentAccount } from "../../components/Box/style";
import { Input } from "../../components/Input";
import { LinkAccount, LinkRedefinirSenha } from "../../components/Link";
import { AntDesign } from '@expo/vector-icons';
import { ContainerApp, ContainerCenter } from "../../components/Container/style";
import { Button, ButtonGoogle } from "../../components/Button/styled";
import { LinkSemiBold } from "../../components/Link/style";
import { useState } from "react";
import api from "../../services/service";

import AsyncStorage from "@react-native-async-storage/async-storage"

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const Login = async () => {
        try {
            await api.post('/Login', {
                email: email,
                senha: senha
            }).then( async (response) => {
                    await AsyncStorage.setItem("token", JSON.stringify(response.data))
                    
                    navigation.replace("Main")
                }
            )
        } catch (error) {
            console.log(error)
            console.warn(error.status);
        } 
    }

    return (
        <ContainerCenter>
            <LogoVitalHub />
            <TitleLogin>Entrar ou criar conta</TitleLogin>
            <BoxInput>
                <Input
                    placeholderText={"Usuário ou email"}
                    onChangeText={(text) => setEmail(text)}
                    editable
                />
                <Input
                    placeholderText={"Senha"}
                    onChangeText={(txt) => setSenha(txt)}
                    editable
                    secure={true}
                />
                <LinkRedefinirSenha onPress={() => navigation.navigate("ReceberEmail")}>Esqueceu sua senha?</LinkRedefinirSenha>
            </BoxInput>
            <BoxButton>
                <Button onPress={() => Login()}>
                    <ButtonTitle>Entrar</ButtonTitle>
                </Button>
                <ButtonGoogle onPress={() => navigation.navigate("LocalConsulta")}>
                    <AntDesign name="google" size={20} color={"#496BBA"} />
                    <ButtonTitleLight>Entrar com Google</ButtonTitleLight>
                </ButtonGoogle>
            </BoxButton>
            <ContentAccount>
                <TextAccount>Não tem conta?</TextAccount>
                <LinkSemiBold onPress={() => navigation.replace("Cadastro")} > Crie sua conta aqui</LinkSemiBold>
            </ContentAccount>
        </ContainerCenter>
    )
}
