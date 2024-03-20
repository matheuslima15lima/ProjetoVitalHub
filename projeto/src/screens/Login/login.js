import { ButtonTitle, ButtonTitleGoogle, ButtonTitleLight, TextAccount, TitleLogin } from "../../components/Text/style";
import { LogoVitalHub } from "../../components/Logo";
import { BoxButton, BoxInput, ContentAccount } from "../../components/Box/style";
import { Input } from "../../components/Input";
import { LinkAccount, LinkRedefinirSenha } from "../../components/Link";
import { AntDesign } from '@expo/vector-icons';
import { ContainerApp } from "../../components/Container/style";
import { Button, ButtonGoogle } from "../../components/Button/styled";
import { LinkSemiBold } from "../../components/Link/style";

export const Login = ({ navigation }) => {
    const Login = async () => {
        navigation.replace("Main")
    }

    return (
        <ContainerApp>
            <LogoVitalHub />
            <TitleLogin>Entrar ou criar conta</TitleLogin>
            <BoxInput>
                <Input
                    placeholderText={"Usuário ou email"}

                />
                <Input
                    placeholderText={"Senha"}

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
        </ContainerApp>
    )
}
