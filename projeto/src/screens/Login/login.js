import { ButtonTitle, ButtonTitleGoogle, ButtonTitleLight, TextAccount, TitleLogin } from "../../components/Text/style";
import { LogoVitalHub } from "../../components/Logo";
import { BoxButton, BoxInput, ContentAccount } from "../../components/Box/style";
import { Input } from "../../components/Input";
import { LinkAccount, LinkRedefinirSenha } from "../../components/Link";
import { AntDesign } from '@expo/vector-icons';
import { ContainerApp, ContainerCenter } from "../../components/Container/style";
import { Button, ButtonGoogle } from "../../components/Button/styled";
import { LinkSemiBold } from "../../components/Link/style";
import { useEffect, useState } from "react";
import { api } from "../../services/service";

import AsyncStorage from "@react-native-async-storage/async-storage"
import { ErrorModal } from "../../components/Modal";
import { ActivityIndicator } from "react-native";
import { LoadIcon } from "./style";

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("carlos@email.com")
    const [senha, setSenha] = useState("carlos123")

    const [showModalError, setShowModalError]= useState(false)

    const [activity, setActivity] = useState(false)

    const [inputError, setInputError] = useState(false);

    const Login = async () => {
        setActivity(true)
        try {
            await api.post('/Login', {
                email: "marcos@email.com",
                senha: "marcos123"
            }).then( async (response) => {
                    await AsyncStorage.setItem("token", JSON.stringify(response.data))
                    
                    setInputError(false);
                    navigation.replace("Main")
                }
            )
        } catch (error) {
            console.log(error)

            setInputError(true);
            setShowModalError(true);
        } 
        setActivity(false)
    }

    const redefinirStates = () => {
        setEmail("")
        setSenha("")
        setInputError(false)
        setShowModalError(false)
    }

    useEffect(()=>{
        redefinirStates()
    },[])

    return (
        <ContainerCenter>
            <LogoVitalHub />
            <TitleLogin>Entrar ou criar conta</TitleLogin>
             <BoxInput>
                <Input
                    placeholderText={"Usuário ou email"}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    editable
                    inputError={inputError}
                    autoFocus={inputError}
                />
                <Input
                    placeholderText={"Senha"}
                    onChangeText={(txt) => setSenha(txt)}
                    value={senha}
                    editable
                    secure={true}
                    inputError={inputError}
                    autoFocus={false}
                /> 
                <LinkRedefinirSenha onPress={() => navigation.navigate("ReceberEmail")}>Esqueceu sua senha?</LinkRedefinirSenha>
            </BoxInput>
            <BoxButton>
                <Button onPress={() => Login()}>
                    <ButtonTitle>Entrar</ButtonTitle>
                    <LoadIcon
                        animating={activity}
                        color={"#FFFFFF"}
                        size={"small"}
                    />
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

            <ErrorModal
                visible={showModalError}
                setShowModalError={setShowModalError}
            />
        </ContainerCenter>
    )
}
