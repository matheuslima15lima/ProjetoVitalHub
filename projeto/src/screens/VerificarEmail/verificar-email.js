import { TouchableOpacity } from "react-native";
import { BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerApp } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkReenviarEmail, LinkVerifyEmail } from "../../components/Link";
import { LogoVitalHub } from "../../components/Logo";
import { ButtonTitle, TextRegular, TitleVerificarEmail } from "../../components/Text/style"
import { IconCntainer, IconImage } from "../../components/NavigationIcons/style";
import { IconContainer } from "../../components/NavigationIcons/style";

export const VerificarEmail = ({ navigation }) =>
    <ContainerApp>
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
        <LinkVerifyEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>username@email.com</LinkVerifyEmail>
        <BoxInputRow>
            <Input
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"
            />
            <Input
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"
            />
            <Input
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"
            />
            <Input
                placeholderText={"0"}
                fieldWidth={"20"}
                verifyEmail={true}
                maxLength={1}
                keyType="numeric"
            />
        </BoxInputRow>
        <Button onPress={() => navigation.navigate("RedefinirSenha")}>
            <ButtonTitle onPress={() => navigation.navigate("RedefinirSenha")}>Confirmar</ButtonTitle>
        </Button>
        <LinkReenviarEmail url={"https://www.google.com/intl/pt-BR/gmail/about/"}>Reenviar Código</LinkReenviarEmail>
    </ContainerApp>