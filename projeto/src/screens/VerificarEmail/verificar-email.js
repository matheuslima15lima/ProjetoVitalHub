import { TouchableOpacity } from "react-native";
import { BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerCenter } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkReenviarEmail, LinkVerifyEmail } from "../../components/Link";
import { LogoVitalHub } from "../../components/Logo";
import { ButtonTitle, TextRegular, TitleVerificarEmail } from "../../components/Text/style"
import { IconCntainer, IconImage } from "../../components/NavigationIcons/style";
import { IconContainer } from "../../components/NavigationIcons/style";
import { useState , useRef} from "react";
import api from "../../services/service";

export const VerificarEmail = ({ navigation, route }) =>{
    const [load , setLoad] = useState(false);
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const [codigo, setCodigo] = useState("")
    function focusNextInput(index){
        //verificar se o index e menor que a quantidade  de campos
        if (index < inputs.length - 1){
            inputs[index+1].current.focus()
        }
    }

    function focusPrevInput(index){
        if(index >0){
            inputs[index-1].current.focus()
        }
    }

    async function ValidarCodigo(){
        await api.post(`RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
        .then(()=>{
            navigation.replace("RedefinirSenha", {emailRecupecacao: route.params.emailRecupecacao})
        })
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
        <LogoVitalHub />
        <TitleVerificarEmail>
            Verifique seu email
        </TitleVerificarEmail>
        <TextRegular>Digite o código de 4 dígitos enviado para</TextRegular>
        <LinkVerifyEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>{route.params.emailRecupecacao}</LinkVerifyEmail>
        <BoxInputRow>
            <Input
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"
            />

            {
                [0, 1, 2, 3].map((index)=>(
               <Input
               key={index}
               ref={inputs[index]}
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"

                onChangeText={(txt)=>{
                    //verificar se o campo e vazio
                    if(txt == ""){
                        focusPrevInput(index)
                    }
                    //verificar se o campo foi prenchido
                    else{
                        const codigoInformado=[...codigo]
                        codigoInformado[index]= txt
                        setCodigo(codigoInformado.join(''))
                        focusNextInput(index)
                    }
                }}  
            />      
                ))
            }
        </BoxInputRow>
        <Button onPress={() => navigation.navigate("RedefinirSenha")}>
            <ButtonTitle onPress={() => ValidarCodigo()}>Confirmar</ButtonTitle>
        </Button>
        <LinkReenviarEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>Reenviar Código</LinkReenviarEmail>
    </ContainerCenter>
    )
}

  