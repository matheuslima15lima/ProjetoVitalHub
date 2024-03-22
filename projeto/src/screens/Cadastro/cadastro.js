import { BoxInput } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerApp, ContainerCenter } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkCancel } from "../../components/Link";
import { LinkSemiBold } from "../../components/Link/style";
import { LogoVitalHub } from "../../components/Logo";
import { ButtonTitle, TextRegular, TitleCadastro } from "../../components/Text/style";

export const Cadastro = ({navigation}) =>
    <ContainerCenter>
        <LogoVitalHub />
        <TitleCadastro>Criar conta</TitleCadastro>
        <TextRegular>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextRegular>
        <BoxInput>
            <Input
                placeholderText={"Usuário ou email"}
            />
            <Input
                placeholderText={"Senha"}
            />
            <Input
                placeholderText={"Confirmar senha"}
            />
        </BoxInput>
        <Button onPress={() => navigation.replace("Login")}>
            <ButtonTitle onPress={() => navigation.replace("Login")}>Cadastrar</ButtonTitle>
        </Button>
        <LinkCancel onPress={() => navigation.replace("Login")} >Cancelar</LinkCancel>
    </ContainerCenter>