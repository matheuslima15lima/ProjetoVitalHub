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
import { BoxCancelPerfil, ButtonCamera } from "./style";
import { api } from "../../services/service";
import moment from "moment";

//Solicitar acesso à galeria
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalCamera } from "../../components/Modal";

export const PerfilDeUsuario = ({ navigation }) => {
    const [editavel, setEditavel] = useState(false)

    const [idUsuario, setIdUsuario] = useState("");
    const [perfilUsuario, setPerfilUsuario] = useState("")

    const [dadosUsuario, setDadosUsuario] = useState({});

    const [showCamera, setShowCamera] = useState(false)

    const [fotoRecebida, setFotoRecebida] = useState("")


    const ProfileLoad = async () => {
        await UserDecodeToken()
            .then(token => {
                if (token !== null) {
                    setIdUsuario(token.idUsuario)
                    setPerfilUsuario(token.perfil)
                }
            })
    }

    const BuscarDadosUsuario = async () => {
        return await api.get(`/${perfilUsuario == "Paciente" ? "Pacientes" : "Medicos"}/BuscarPorId?id=${idUsuario}`)
    }

    //solicitar o acesso à galeria
    const requestGaleria = async () => {
        await MediaLibrary.requestPermissionsAsync()

        await ImagePicker.requestMediaLibraryPermissionsAsync()
    }

    useEffect(() => {
        ProfileLoad()
            .then(() => {
                console.log(`Log da linha 45 com o id do usuário: ${idUsuario}`);
                // if (idUsuario !== "") {
                //     BuscarDadosUsuario()
                //         .then(dadosApi => {
                //             setDadosUsuario(dadosApi) 
                //         })
                // }
            })
        

            requestGaleria()
    }, [idUsuario])

    //função para alterar foto do uauário
    const AlterarFotoPerfil = async ()  => {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: fotoRecebida,
            name: `image.${fotoRecebida.split(".")[1]}`,
            type: `image/${fotoRecebida.split(".")[1]}`
        })

        await api.put(`/Usuario/AlterarFotoPerfil?id=${idUsuario}`, formData, {
            headers: {
                "content-type": "multpart/form-data"
            }
        }).then(response => {
            console.log(response);
        }).catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        if(fotoRecebida === null){
            AlterarFotoPerfil()
        }
    }, [fotoRecebida])
    return (
        <>
            <ContainerPerfilPage>
                <View>
                    {fotoRecebida !== "" ? 
                    <UserImagePerfil
                        source={{uri: fotoRecebida}}
                    /> : 
                    <UserImagePerfil
                        source={{uri: "https://blobvitalhubmurilosouza.blob.core.windows.net/containervitalhubmurilosouza/profilePattern.png"}}
                    />
                    }
                    <ButtonCamera onPress={() => setShowCamera(true)}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={"#FBFBFB"} />
                    </ButtonCamera>
                </View>

                {!(editavel) ? (
                    <UserContentBox
                        editavel={false}
                    >
                        <UserNamePerfilText editavel={false}>AAAAAAAAA</UserNamePerfilText>
                        <EmailUserText editavel={false}>AAAAAAAAAAAAAA</EmailUserText>
                    </UserContentBox>
                ) : null}

                <ContainerForm>
                    {editavel ? (
                        <>
                            <BoxInputField
                                labelText={"Nome:"}
                                placeholderText={"Nome completo"}
                                editable={editavel}
                                inputPerfil
                            // fieldValue={dadosUsuario.idNavigation.nome}
                            />
                            <BoxInputField
                                labelText={"Email:"}
                                placeholderText={"Email do usuário"}
                                editable={editavel}
                                inputPerfil
                            // fieldValue={dadosUsuario.idNavigation.email}
                            />
                        </>

                    ) : null}
                    <BoxInputField
                        labelText={"Data De Nascimento:"}
                        placeholderText={"12/11/2005"}
                        editable={editavel}
                        inputPerfil
                    // fieldValue={moment(dadosUsuario.dataNascimento).format("DD/MM/YYYY")}
                    />
                    <BoxInputField
                        labelText={"CPF:"}
                        placeholderText={"470.150.038/05"}
                        editable={editavel}
                        inputPerfil
                    // fieldValue={dadosUsuario.cpf}
                    />
                    <BoxInputField
                        labelText={"Endereço:"}
                        placeholderText={"Rua Das Goiabeiras, n16 - Pilar Velho"}
                        inputPerfil
                    // fieldValue={dadosUsuario.endereco.logradouro}
                    />
                    <BoxInputRow>
                        <BoxInputField
                            labelText={"CEP:"}
                            placeholderText={"09432-530"}
                            fieldWidth={47}
                            editable={editavel}
                            inputPerfil
                        // fieldValue={dadosUsuario.endereco.cep}
                        />
                        <BoxInputField
                            labelText={"Cidade:"}
                            placeholderText={"Ribeirão Pires"}
                            fieldWidth={47}
                            inputPerfil
                        // fieldValue={dadosUsuario.endereco.numero.toString()}
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

            <ModalCamera
                visible={showCamera}
                setShowModal={setShowCamera}
                enviarFoto={setFotoRecebida}
                getMediaLibrary
            />
        </>
    )
}