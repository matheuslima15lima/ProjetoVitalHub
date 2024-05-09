import { useEffect, useState } from "react";
import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerProfile } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";
import { api } from "../../services/service";

export const RedefinirSenha = ({navigation, route}) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    useEffect(() => {
        setEmail(route.params.userEmail)
    }, [route])

    const HandlePress = async () => {
        if(senha === confirmaSenha){
            await api.put(`/Usuario/AlterarSenha?email=${email}`, {
                senhaNova: senha
            }).then(() => {
                console.log("senha atualizada");
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
                alert(error)
            })
        }else{
            alert("As senhas não coincidem")
        }
    }

    return(
        <ContainerProfile>
        <IconContainer
            onPress={() => navigation.replace("Login")}
        >
            <IconImage
                source={require("../../assets/images/fechar_icon.png")}
            />
        </IconContainer>
        <LogoVitalHub/>
        <TitleRedefinirSenha>Redefinir senha</TitleRedefinirSenha>
        <TextRegular>Insira e confirme a sua nova senha</TextRegular>
        <BoxInput>
            <Input
                placeholderText={"Nova senha"}
                editable
                fieldvalue={senha}
                multiline={false}
                secure={true}
                onChangeText={text => setSenha(text)}
            />
            <Input
                placeholderText={"confirmar nova senha"}
                editable
                fieldvalue={confirmaSenha}
                multiline={false}
                secure={true}
                onChangeText={text => setConfirmaSenha(text)}
            />
        </BoxInput>
        <Button onPress={() => HandlePress()}>
            <ButtonTitle>Confirmar nova senha</ButtonTitle>
        </Button>
    </ContainerProfile>
    )
} 
    