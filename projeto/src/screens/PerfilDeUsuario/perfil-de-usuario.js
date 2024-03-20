import { ButtonTitle, EmailUserText, SemiBoldText, Title, UserNamePerfilText } from "../../components/Text/style";
import { ContainerApp, ContainerForm, ContainerPerfilPage } from "../../components/Container/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { BoxInputRow, UserContentBox } from "../../components/Box/style";
import { BoxInputField } from "../../components/Box";
import { Button } from "../../components/Button/styled";
import { useState } from "react";
import { LinkCancel } from "../../components/Link";
import { View } from "react-native";

export const PerfilDeUsuario = () => {
    const [editavel, setEditavel] = useState(false) 

    return (
        <ContainerPerfilPage>
            <UserImagePerfil
                source={require("../../assets/images/user1-image.png")}
            />
            <UserContentBox
                editavel={editavel}
            >
                <UserNamePerfilText editavel={editavel}>Nome do Usuário</UserNamePerfilText>
                <EmailUserText editavel={editavel}>exemplo.email@gmail.com</EmailUserText>
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
            {editavel ? <LinkCancel manipulationFunction={setEditavel}>Cancelar</LinkCancel> : null}
            
            <View style={{height: 30}}></View>
        </ContainerPerfilPage>
    )
}