import { useState } from "react";
import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerCenter } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";
import api from "../../services/service";



export const RedefinirSenha = ({navigation}) => {

    const[senha, setSenha] = useState("");

    const [confirmaSenha, setConfirmaSenha] = useState("");
    
    async function AlterarSenha(){
        if(senha===confirmaSenha){
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,{
                senhaNova: senha
            }).then(()=> {
                navigation.replace("Login")
            }).catch(error=>{
                console.log(error);
            })
        }
    
        else{
            alert("Senhas incopartiveis")
        }
       
    }
    


return(


    <ContainerCenter>
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

                fieldvalue= {senha}
                onChangeText={(txt)=> setSenha(txt)}
            />
            <Input
                placeholderText={"confirmar nova senha"}

                value= {confirmaSenha}
                onChangeText={(txt)=> setConfirmaSenha(txt)}
            />
        </BoxInput>
        <Button onPress={() => AlterarSenha()}>
            <ButtonTitle>Confirmar nova senha</ButtonTitle>
        </Button>
    </ContainerCenter>)}