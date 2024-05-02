import { ButtonTitle, EmailUserText, SemiBoldText, TextRegular, Title, UserNamePerfilText } from "../../components/Text/style";
import { ContainerApp, ContainerForm, ContainerPerfilPage, LoadingContainer } from "../../components/Container/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { BoxInputRow, UserContentBox } from "../../components/Box/style";
import { BoxInputField } from "../../components/Box";
import { Button, ButtonCamera } from "../../components/Button/styled";
import { useEffect, useState } from "react";
import { LinkCancel } from "../../components/Link";
import { ActivityIndicator, View } from "react-native";
import { LoadProfile, UserLogout } from "../../utils/Auth";
import { api } from "../../services/service";
import { ObjetoEstaVazio } from "../../utils/funcoesUteis";
import moment from "moment";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { ModalCamera } from "../../components/Modal";

export const PerfilDeUsuario = ({ navigation }) => {
    const [editavel, setEditavel] = useState(false)

    const [perfilUsuario, setPerfilUsuario] = useState("")
    const [idUsuario, setIdUsurio] = useState("");
    const [dadosUsuario, setDadosUsuario] = useState({});
    const [dadosAtualizarUsuario, setDadosAtualizarUsuario] = useState({});

    const [showCamera, setShowCamera] = useState(false)

    const [fotoRecebida, setFotoRecebida] = useState("")

    useEffect(() => {
        LoadProfile()
            .then(token => {
                setPerfilUsuario(token.perfil)
                setIdUsurio(token.idUsuario)
            })
            .catch(erro => {
                console.log(`Não foi possível buscar as informações do usuário`);
                console.log(`Erro: ${erro}`);
            });
    }, [idUsuario])


    const CarregarDadosUsuario = async (idUsuario, perfil) => {
        await api.get(`/${perfil}s/BuscarPorId?id=${idUsuario}`)
            .then(response => {
                setDadosUsuario(response.data)
            })
    }

    useEffect(() => {
        if (idUsuario != "") {
            CarregarDadosUsuario(idUsuario, perfilUsuario)
        }
    }, [idUsuario])

    const ModoEdicaoUsuario = () => {
        setDadosAtualizarUsuario(dadosUsuario)
        setEditavel(true)
    }

    const AbortarEdicaoUsuario = () => {
        setDadosAtualizarUsuario({})
        setEditavel(false)
    }

    const AtualizarUsuario = async (idUsuario, dadosUsuario) => {
        const idTipoUsuario = "edbdd738-c3af-4a4e-a396-340cfbdd1bd7"

        await api.put(`/Pacientes?idUsuario=${idUsuario}`, {
            rg: dadosUsuario.rg,
            cpf: dadosUsuario.cpf,
            dataNascimento: moment(dadosUsuario.dataNascimento).format("YYYY-MM-DD"),
            cep: dadosUsuario.endereco.cep,
            logradouro: dadosUsuario.endereco.logradouro,
            numero: dadosUsuario.endereco.numero,
            cidade: dadosUsuario.endereco.cidade,
            nome: dadosUsuario.idNavigation.nome,
            idTipoUsuario
        }).then(() => {
            CarregarDadosUsuario(idUsuario, perfilUsuario).then(() => {
                setEditavel(false)
            })
        }).catch(error => {
            alert(error)
        })
    }

    const requestGaleria = async () => {
        await MediaLibrary.requestPermissionsAsync()

        await ImagePicker.requestMediaLibraryPermissionsAsync()
    }

    //função para alterar foto do uauário
    const AlterarFotoPerfil = async () => {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: fotoRecebida,
            name: `image.${fotoRecebida.split(".").pop()}`,
            type: `image/${fotoRecebida.split(".").pop()}`
        })

        await api.put(`/Usuario/AlterarFotoPerfil?idUsuario=${idUsuario}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response);
        }).catch(erro => {
            console.log(erro);
        })
    }

    useEffect(() => {
        if (fotoRecebida !== null) {
            AlterarFotoPerfil()
            ProfileLoad()
        }
    }, [fotoRecebida])

    return (!(ObjetoEstaVazio(dadosUsuario)) ?
        (
            <>
                <ContainerPerfilPage>
                    <UserImagePerfil
                        source={{uri: (fotoRecebida === "") ? dadosUsuario.idNavigation.foto : fotoRecebida}}
                    />

                    <ButtonCamera onPress={() => setShowCamera(true)}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={"#FBFBFB"} />
                    </ButtonCamera>
                    {!editavel ? (<>
                        <UserContentBox
                            editavel={editavel}
                        >
                            <UserNamePerfilText editavel={editavel}>{dadosUsuario.idNavigation.nome}</UserNamePerfilText>
                            <EmailUserText editavel={editavel}>{dadosUsuario.idNavigation.email}</EmailUserText>
                        </UserContentBox>
                    </>) : null}

                    <ContainerForm marginTop={editavel ? 20 : 75}>
                        {editavel ? (<>
                            <BoxInputField
                                labelText={"Nome:"}
                                placeholderText={"Nome Completo"}
                                inputPerfil
                                fieldValue={dadosUsuario.idNavigation.nome}
                            />
                        </>)
                            : null}
                        {perfilUsuario == "Medico" ? (
                            <>
                                <BoxInputField
                                    labelText={"CRM:"}
                                    placeholderText={"874204"}
                                    editable={editavel}
                                    inputPerfil
                                    fieldValue={editavel ? dadosAtualizarUsuario.crm : dadosUsuario.crm}
                                    onChangeText={text => setDadosAtualizarUsuario({
                                        ...dadosAtualizarUsuario,
                                        crm: text
                                    })}
                                />
                            </>
                        ) : (
                            <>
                                <BoxInputField
                                    labelText={"RG:"}
                                    placeholderText={"00.000.000-0"}
                                    editable={editavel}
                                    inputPerfil
                                    fieldValue={editavel ? dadosAtualizarUsuario.rg : dadosUsuario.rg}
                                    onChangeText={text => setDadosAtualizarUsuario({
                                        ...dadosAtualizarUsuario,
                                        rg: text
                                    })}
                                />

                                <BoxInputField
                                    labelText={"Data De Nascimento:"}
                                    placeholderText={"12/11/2005"}
                                    editable={editavel}
                                    inputPerfil
                                    fieldValue={editable ? moment(dadosAtualizarUsuario.dataNascimento).format("DD/MM/YYYY") : moment(dadosUsuario.dataNascimento).format("DD/MM/YYYY")}
                                    onChangeText={text => setDadosAtualizarUsuario({
                                        ...dadosAtualizarUsuario,
                                        dataNascimento: text
                                    })}
                                />
                                <BoxInputField
                                    labelText={"CPF:"}
                                    placeholderText={"470.150.038/05"}
                                    editable={editavel}
                                    inputPerfil
                                    fieldValue={editable ? dadosAtualizarUsuario.cpf : dadosUsuario.cpf}
                                    onChangeText={text => setDadosAtualizarUsuario({
                                        ...dadosAtualizarUsuario,
                                        cpf: text
                                    })}
                                />
                            </>
                        )}

                        <BoxInputRow>
                            <BoxInputField
                                labelText={"Endereço:"}
                                placeholderText={"Rua Das Goiabeiras"}
                                fieldValue={editavel ? dadosAtualizarUsuario.endereco.logradouro : dadosUsuario.endereco.logradouro}
                                editable
                                inputPerfil
                                fieldWidth={47}
                                onChangeText={text => setDadosAtualizarUsuario({
                                    ...dadosAtualizarUsuario,
                                    endereco: {
                                        ...dadosAtualizarUsuario.endereco,
                                        logradouro: text
                                    }
                                })}
                            />
                            <BoxInputField
                                labelText={"Número:"}
                                placeholderText={"XX"}
                                fieldValue={editavel ? dadosAtualizarUsuario.endereco.numero.toString() : dadosUsuario.endereco.numero.toString()}
                                editable
                                inputPerfil
                                fieldWidth={47}
                                onChangeText={text => setDadosAtualizarUsuario({
                                    ...dadosAtualizarUsuario,
                                    endereco: {
                                        ...dadosAtualizarUsuario.endereco,
                                        numero: parseInt(text)
                                    }
                                })}
                            />
                        </BoxInputRow>
                        <BoxInputRow>
                            <BoxInputField
                                labelText={"CEP:"}
                                placeholderText={"09432-530"}
                                fieldWidth={47}
                                editable={editavel}
                                inputPerfil
                                fieldValue={editavel ? dadosAtualizarUsuario.endereco.cep : dadosUsuario.endereco.cep}
                                onChangeText={text => setDadosAtualizarUsuario({
                                    ...dadosAtualizarUsuario,
                                    endereco: {
                                        ...dadosAtualizarUsuario.endereco,
                                        cep: parseInt(text)
                                    }
                                })}
                            />
                            <BoxInputField
                                labelText={"Cidade:"}
                                placeholderText={"Ribeirão Pires"}
                                fieldWidth={47}
                                editable
                                fieldValue={editavel ? dadosAtualizarUsuario.endereco.cidade : dadosUsuario.endereco.cidade}
                                inputPerfil
                                onChangeText={text => setDadosAtualizarUsuario({
                                    ...dadosAtualizarUsuario,
                                    endereco: {
                                        ...dadosAtualizarUsuario.endereco,
                                        cidade: text
                                    }
                                })}
                            />
                        </BoxInputRow>
                        {perfilUsuario === "Paciente" ? (editavel ?
                            <>
                                <Button onPress={() => AtualizarUsuario()}>
                                    <ButtonTitle>Salvar Edições</ButtonTitle>
                                </Button>
                            </>
                            : <Button onPress={() => ModoEdicaoUsuario()}>
                                <ButtonTitle>Editar</ButtonTitle>
                            </Button>
                        ) : null}

                    </ContainerForm>
                    {editavel ?
                        <LinkCancel onPress={() => AbortarEdicaoUsuario()}>Cancelar</LinkCancel>
                        : <LinkCancel onPress={() => UserLogout(navigation)}>Deslogar</LinkCancel>}

                    <View style={{ height: 30 }}></View>
                </ContainerPerfilPage>

                <ModalCamera
                    visible={showCamera}
                    setShowModal={setShowCamera}
                    enviarFoto={setFotoRecebida}
                    getMediaLibrary
                />
            </>
        ) : (<>
            <LoadingIndicator />
        </>)
    )
}