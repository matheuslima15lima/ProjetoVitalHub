import { Alert, TouchableOpacity } from "react-native";
import { BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerCenter } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkReenviarEmail, LinkVerifyEmail } from "../../components/Link";
import { LogoVitalHub } from "../../components/Logo";
import { ButtonTitle, TextRegular, TitleVerificarEmail } from "../../components/Text/style"
import { IconCntainer, IconImage } from "../../components/NavigationIcons/style";
import { IconContainer } from "../../components/NavigationIcons/style";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/service";

export const VerificarEmail = ({ navigation, route }) => {

    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");

    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    // const focusNextInput = index => {
    //     //Verifica se o index é menor que o máximo, se não não passa
    //     if(index < (inputs.length) - 1){
    //         inputs[index + 1 ].current.focus()
    //     }
    // }

    // const focusPrevInput = index => {
    //     if(index > 0){
    //         inputs[index - 1 ].current.focus()
    //     }
    // }

    const ValidarCodigo = async () => {
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${email}&codigo=${codigo}`)
        .then(() => {
            navigation.navigate("RedefinirSenha", {emailRecuperacao: email})
        }).catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        setEmail(route.params.emailRecuperacao)
        console.log(`Log página de verificar email com o email de recuperação: ${email}`);
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
            <TitleVerificarEmail>
                Verifique seu email
            </TitleVerificarEmail>
            <TextRegular>Digite o código de 4 dígitos enviado para</TextRegular>
            <LinkVerifyEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>{email}</LinkVerifyEmail>
            <BoxInputRow>
                {/* <Input
                    placeholderText={"0"}
                    fieldWidth={"20"}
                    verifyEmail={true}
                    maxLength={1}
                    keyType="numeric"
                    editable
                /> */}
                {
                    [0, 1, 2, 3].map((index) => (
                        <Input
                            key={index}

                            // ref={inputs[index]}

                            placeholderText={"0"}
                            fieldWidth={"20"}
                            verifyEmail={true}
                            maxLength={1}
                            keyType="numeric"
                            editable

                            onChangeText={txt => {
                                //Verificra se o campo é vazio
                                if(txt !== ""){
                                    // focusPrevInput(index)
                                    const codigoInformado = [...codigo]
                                    codigoInformado[index] = txt

                                    setCodigo(codigoInformado.join(''))
                                }
                            }}
                        />
                    ))
                }
            </BoxInputRow>
            <Button onPress={ValidarCodigo}>
                <ButtonTitle onPress={ValidarCodigo}>Confirmar</ButtonTitle>
            </Button>
            <LinkReenviarEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>Reenviar Código</LinkReenviarEmail>
        </ContainerCenter>
    )
}