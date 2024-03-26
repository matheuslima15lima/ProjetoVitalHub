import { ButtonTitle, EmailUserText, SemiBoldText, Title, UserNamePerfilText } from "../../components/Text/style";
import { ContainerApp, ContainerForm, ContainerPerfilPage } from "../../components/Container/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { BoxInputRow, UserContentBox } from "../../components/Box/style";
import { BoxInputField } from "../../components/Box";
import { Button } from "../../components/Button/styled";
import { useEffect, useState } from "react";
import { LinkCancel } from "../../components/Link";
import { View } from "react-native";
import { UserDecodeToken, UserLogout } from "../../utils/Auth";
import { BoxCancelPerfil } from "./style";

export const PerfilDeUsuario = ({ navigation }) => {
    const [editavel, setEditavel] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()

        if (token) {
            console.log(token);
            setNome(token.nome)
            setEmail(token.email)
        }
    }

    useEffect(() => {
        ProfileLoad()
    }, [])
    return (
        <ContainerPerfilPage>
            <UserImagePerfil
                source={require("../../assets/images/user1-image.png")}
            />
            <UserContentBox
                editavel={editavel}
            >
                <UserNamePerfilText editavel={editavel}>{nome}</UserNamePerfilText>
                <EmailUserText editavel={editavel}>{email}</EmailUserText>
            </UserContentBox>




            <ContainerForm>
                <BoxInputField
                    labelText={"Data De Nascimento:"}
                    placeholderText={"12/11/2005"}
                    editable={editavel}
                    inputPerfil
                />
                <BoxInputField
                    labelText={"CPF:"}
                    placeholderText={"470.150.038/05"}
                    editable={editavel}
                    inputPerfil
                />
                <BoxInputField
                    labelText={"Endereço:"}
                    placeholderText={"Rua Das Goiabeiras, n16 - Pilar Velho"}
                    inputPerfil
                />
                <BoxInputRow>
                    <BoxInputField
                        labelText={"CEP:"}
                        placeholderText={"09432-530"}
                        fieldWidth={47}
                        editable={editavel}
                        inputPerfil
                    />
                    <BoxInputField
                        labelText={"Cidade:"}
                        placeholderText={"Ribeirão Pires"}
                        fieldWidth={47}
                        inputPerfil
                    />
                </BoxInputRow>
                {editavel ?
                    <>
                        <Button onPress={() => setEditavel(false)}>
                            <ButtonTitle>Salvar Edições</ButtonTitle>
                        </Button>
                    </>
                    : <Button onPress={() => setEditavel(true)}>
                        <ButtonTitle>Editar</ButtonTitle>
                    </Button>}

            </ContainerForm>
            <BoxCancelPerfil>
                {editavel ?
                    (
                        <LinkCancel perfil onPress={() => setEditavel(false)}>Cancelar</LinkCancel>
                    ) : <LinkCancel perfil onPress={() => UserLogout(navigation)}>Deslogar</LinkCancel>
                }
            </BoxCancelPerfil>
        </ContainerPerfilPage>
    )
}