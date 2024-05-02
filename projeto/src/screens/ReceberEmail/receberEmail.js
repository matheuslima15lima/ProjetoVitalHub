import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerProfile } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoVitalHub } from "../../components/Logo";
import { IconContainer, IconImage } from "../../components/NavigationIcons/style";
import { ButtonTitle, TextRegular, TitleRedefinirSenha } from "../../components/Text/style";

export const ReceberEmail = ({ navigation }) =>
    <ContainerProfile>
        <IconContainer
            onPress={() => navigation.replace("Login")}
        >
            <IconImage
                source={require("../../assets/images/voltar_icon.png")}
            />
        </IconContainer>
        <LogoVitalHub />
        <TitleRedefinirSenha>Recuperar senha</TitleRedefinirSenha>
        <TextRegular>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextRegular>
        <BoxInput>
            <Input
                placeholderText={"Insira seu email aqui"}
                editable
            />
        </BoxInput>
        <Button onPress={() => navigation.navigate("VerificarEmail")}>
            <ButtonTitle>Confirmar</ButtonTitle>
        </Button>
    </ContainerProfile>