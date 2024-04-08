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
import api from "../../services/service";
import moment from "moment";

export const PerfilDeUsuario = ({ navigation }) => {
    const [editavel, setEditavel] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [idUsuario, setIdUsuario] = useState("");
    const [perfilUsuario, setPerfilUsuario] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [cpf, setCpf] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()

        if (token) {
            setNome(token.nome)
            setEmail(token.email)
            setIdUsuario(token.idUsuario)
            setPerfilUsuario(token.perfil)
        }
    }

    const BuscarDadosUsuario = async () => {
        try {
            const retornoApi = await api.get(`/${perfilUsuario == "Paciente" ? "Pacientes" : "Medicos"}/BuscarPorId?id=${idUsuario}`);

            setDataNascimento(retornoApi.data.dataNascimento);
            setCpf(retornoApi.data.cpf);
            setEndereco(retornoApi.data.endereco.logradouro)
            setCep(retornoApi.data.endereco.cep);
            setCidade(retornoApi.data.endereco.cidade);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        ProfileLoad()
        console.log(idUsuario)
        BuscarDadosUsuario()


        console.log(dataNascimento);
        console.log(cpf);
    }, [idUsuario]) 


    
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
                    fieldValue={moment(dataNascimento).format("DD/MM/YYYY")}
                />
                <BoxInputField
                    labelText={"CPF:"}
                    placeholderText={"470.150.038/05"}
                    editable={editavel}
                    inputPerfil
                    fieldValue={cpf}
                />
                <BoxInputField
                    labelText={"Endereço:"}
                    placeholderText={"Rua Das Goiabeiras, n16 - Pilar Velho"}
                    inputPerfil
                    fieldValue={endereco}
                />
                <BoxInputRow>
                    <BoxInputField
                        labelText={"CEP:"}
                        placeholderText={"09432-530"}
                        fieldWidth={47}
                        editable={editavel}
                        inputPerfil
                        fieldValue={cep}
                    />
                    <BoxInputField
                        labelText={"Cidade:"}
                        placeholderText={"Ribeirão Pires"}
                        fieldWidth={47}
                        inputPerfil
                        fieldValue={cidade}
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