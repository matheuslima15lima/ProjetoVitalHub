import { useEffect, useState } from "react";
import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerCenter } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";
import { api } from "../../services/service";

export const RedefinirSenha = ({ navigation, route }) => {

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const [email, setEmail] = useState("")

    const AltererSenha = async () => {
        if (senha === confirmarSenha) {
            await api.put(`/Usuario/AlterarSenha?email=${email}`, {
                senhaNova: senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(erro => {
                console.log(erro);
            })
        } else {
            alert("As senhas digitadas não condizem")
        }
    }

    useEffect(() => {
        setEmail(route.params.emailRecuperacao)
    }, [route.params])

    return (
        <ContainerCenter>
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
                />
                <Input
                    placeholderText={"confirmar nova senha"}
                    editable
                    fieldvalue={confirmarSenha}
                    onChangeText={text => setConfirmarSenha(text)}
                />
            </BoxInput>
            <Button onPress={() => AltererSenha()}>
                <ButtonTitle>Confirmar nova senha</ButtonTitle>
            </Button>
        </ContainerCenter>
    )
}