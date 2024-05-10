import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { BoxInputConsulta, CameraContent, ConsultaModal, DadosConsultaBox, DadosConsultaText, DadosConsultaTitle, ImageContent, ImagemRecebida, LastPhoto, LinhaDadosConsulta, ModalConsultaForm, ModalContent, ModalSubtitle, ModalText, ModalTextRow, PatientModal, ResumoConsultaBox } from "./style"
import { ButtonTitle, SemiBoldText, TextRegular, Title } from "../Text/style"
import { Button, ButtonCamera, ButtonModal } from "../Button/styled"
import { LinkCancel } from "../Link"
import { UserImageModal } from "../UserImage/styled"
import { useEffect, useRef, useState } from "react"
import { ButtonModalConsulta } from "../Button"
import { BoxButtonRow } from "../Box/style"
import { ButtonContinuarBox } from "../Box"
import { ApointmentInputField } from "../Input/style"
import { Input } from "../Input"
import { AntDesign } from '@expo/vector-icons';
import { TextAge } from "../Card/style"
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

import { Camera, CameraType, CameraView } from 'expo-camera'
import moment from "moment"
import { api } from "../../services/service"
import { LoadProfile, UserDecodeToken } from "../../utils/Auth"

export const CancelattionModal = ({ infoConsulta, visible, setShowModalCancel, ListarConsultas = null, ...rest }) => {
    const CancelarConsulta = async () => {
        await api.put(`/Consultas/Status?idConsulta=${infoConsulta.id}&status=Cancelada`)
            .then(() => {

                ListarConsultas()
                setShowModalCancel(false)
            }).catch(error => {
                alert(`Erro ao cancelar consult. Erro: ${error}`)
                console.log(`/Consultas/Status?idConsulta=${infoConsulta.id}&status=Cancelada`);
            })
    }

    return (
        <Modal {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <Title>Cancelar Consulta</Title>
                    <ModalText>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</ModalText>



                    <ButtonModal onPress={() => CancelarConsulta()}>
                        <ButtonTitle onPress={() => CancelarConsulta()}>Confirmar</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModalCancel(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}

export const ApointmentModal = ({
    visible,
    setShowModalApointment,
    informacoes,
    navigation,
    idUsuario,
    ...resto
}) => {
    
    const NavegarPaginaDeProntuario = () => {
        navigation.replace("PaginaDeProntuario", { consulta: informacoes, idUsuario: idUsuario });
        setShowModalApointment(false);
    };

    const [idadePaciente, setIdadePaciente] = useState( moment.duration(moment().diff(moment(informacoes.paciente.dataNascimento))).asYears());

    return (
        <Modal {...resto} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                <ModalContent>
                    <UserImageModal
                        source={{uri: informacoes.paciente.idNavigation.foto}}
                    />

                    <Title>
                        {informacoes.paciente.idNavigation.nome}
                    </Title>

                    <ModalTextRow>
                        <ModalText>
                            {Math.round(idadePaciente)} anos
                        </ModalText>
                        <ModalText>
                            {informacoes.paciente.idNavigation.email}
                        </ModalText>
                    </ModalTextRow>

                    <ButtonModal
                        onPress={() => NavegarPaginaDeProntuario()}
                    >
                        <ButtonTitle
                            onPress={() => NavegarPaginaDeProntuario()}
                        >
                            Inserir Prontuário
                        </ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModalApointment(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
    );
};
export const AgendarConsultaModal = ({ visible, setShowModal, navigation, ...resto }) => {

    // state para o nível de consulta
    const [nivelConsulta, setNivelConsulta] = useState("")
    const [agendamento, setAgendamento] = useState(null);

    const handleContinue = async () => {
        await setShowModal(false)
        navigation.replace("SelecionarClinica", { agendamento: agendamento })
    }

    const IncluirNivelPrioridade = (id, label) => {
        setAgendamento({
            ...agendamento,
            prioridadeId: id,
            prioridadeLabel: label
        })
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            {...resto}
        >
            <PatientModal>
                <ConsultaModal>
                    <Title>Agendar Consulta</Title>
                    <ModalConsultaForm>
                        <BoxInputConsulta>
                            <ModalSubtitle>Qual o nível da consulta</ModalSubtitle>
                            <BoxButtonRow>
                                <ButtonModalConsulta
                                    buttonText={"Rotina"}
                                    situacao={"rotina"}
                                    actived={nivelConsulta === "rotina"}
                                    manipulationFunction={setNivelConsulta}
                                    idPrioridade="6D4C5F95-E9F9-4ADD-982C-A84FD47BBE22"
                                    labelPrioridade="Rotina"
                                    manipularAgendamento={IncluirNivelPrioridade}
                                />
                                <ButtonModalConsulta
                                    buttonText={"Exame"}
                                    situacao={"exame"}
                                    actived={nivelConsulta === "exame"}
                                    manipulationFunction={setNivelConsulta}
                                    idPrioridade="DDC1888D-3D72-44A1-810B-B85E5796615E"
                                    labelPrioridade="Exame"
                                    manipularAgendamento={IncluirNivelPrioridade}
                                />
                                <ButtonModalConsulta
                                    buttonText={"Urgência"}
                                    situacao={"urgencia"}
                                    actived={nivelConsulta === "urgencia"}
                                    manipulationFunction={setNivelConsulta}
                                    idPrioridade="3155EBF9-5619-4627-BE07-3813C950956F"
                                    labelPrioridade="Urgência"
                                    manipularAgendamento={IncluirNivelPrioridade}
                                />
                            </BoxButtonRow>
                        </BoxInputConsulta>
                        <BoxInputConsulta>
                            <ModalSubtitle>Informe a localizaçào desejada</ModalSubtitle>
                            <Input
                                placeholderText={"Informe a localização"}
                                apointment
                                editable
                                center
                                onChangeText={text => setAgendamento({
                                    ...agendamento,
                                    localizacao: text
                                })}
                                fieldvalue={agendamento ? agendamento.localizacao : null}
                            />
                        </BoxInputConsulta>
                    </ModalConsultaForm>
                    <ButtonModal onPress={() => handleContinue()}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </ButtonModal>
                    <LinkCancel onPress={() => setShowModal(false)}>Cancelar</LinkCancel>
                </ConsultaModal>
            </PatientModal>
        </Modal>
    )
}

export const ConfirmarConsultaModal = ({ agendamento, visible, setShowModal = null, navigation, ...resto }) => {
    const [idUsuario, setIdUsuario] = useState(null)

    const HandleConfirm = async () => {
        await api.post(`/Consultas/Cadastrar`, {
            situacaoId: "2C3F1E2C-3232-45EB-B341-DEBFE8AF5DBB",
            pacienteId: idUsuario,
            medicoClinicaId: agendamento.medicoClinicaId,
            prioridadeId: agendamento.prioridadeId,
            dataConsulta: agendamento.dataConsulta
        }).then(() => {
            setShowModal(false)

            navigation.replace("Main")
        }).catch(erro => {
            console.log(erro);
            console.log(idUsuario);
        })
    }

    useEffect(() => {
        LoadProfile()
            .then(token => {
                setIdUsuario(token.idUsuario)
            })
    }, [])

    return (
        <Modal
            {...resto}
            visible={visible}
            transparent
            animationType="fade"
        >
            <PatientModal>
                {agendamento ?
                    <ModalContent>
                        <Title>Agendar consulta</Title>
                        <ResumoConsultaBox>
                            <TextRegular>Consulte os dados selecionados para a sua consulta</TextRegular>
                            <DadosConsultaBox>
                                <LinhaDadosConsulta>
                                    <DadosConsultaTitle>Data da consulta</DadosConsultaTitle>
                                    <DadosConsultaText>{moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm")}</DadosConsultaText>
                                </LinhaDadosConsulta>
                                <LinhaDadosConsulta>
                                    <DadosConsultaTitle>Médico(a) da consulta</DadosConsultaTitle>
                                    <DadosConsultaText>{agendamento.medicoNome}</DadosConsultaText>
                                    <DadosConsultaText>{agendamento.medicoEspecialidade}</DadosConsultaText>
                                </LinhaDadosConsulta>
                                <LinhaDadosConsulta>
                                    <DadosConsultaTitle>Clínica da consulta</DadosConsultaTitle>
                                    <DadosConsultaText>{agendamento.nomeFantasia}</DadosConsultaText>
                                </LinhaDadosConsulta>
                                <LinhaDadosConsulta>
                                    <DadosConsultaTitle>Local da consulta</DadosConsultaTitle>
                                    <DadosConsultaText>{agendamento.localizacao}</DadosConsultaText>
                                </LinhaDadosConsulta>
                                <LinhaDadosConsulta>
                                    <DadosConsultaTitle>Tipo da consulta</DadosConsultaTitle>
                                    <DadosConsultaText>{agendamento.prioridadeLabel}</DadosConsultaText>
                                </LinhaDadosConsulta>
                            </DadosConsultaBox>
                        </ResumoConsultaBox>
                        <ButtonContinuarBox
                            manipulationFunction={() => HandleConfirm()}
                            functionCancel={() => setShowModal(false)}
                            buttonText="Confirmar"
                        />
                    </ModalContent>
                    : null}
            </PatientModal>
        </Modal>
    )
}

export const ConsultaModalCard = ({ perfilUsuario, consulta, visible, setShowModal = null, navigation, ...resto }) => {

    const [idadePaciente, setIdadePaciente] = useState(null)

    const HandlePress = () => {
        setShowModal(false)
        navigation.replace("LocalConsulta", { clinicaId: consulta.medicoClinica.clinicaId });
    }

    useEffect(() => {

        if (perfilUsuario === "Medico") {
            const diferenca = moment().diff(moment(consulta.paciente.dataNascimento))
            setIdadePaciente(moment.duration(diferenca).asYears());
        }

    }, [])

    return (consulta !== null ?
        <Modal
            {...resto}
            visible={visible}
            transparent
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <UserImageModal
                        source={{
                            uri: perfilUsuario === "Paciente" ? consulta.medicoClinica.medico.idNavigation.foto
                                : consulta.paciente.idNavigation.foto
                        }}
                    />

                    <Title>{perfilUsuario === "Paciente" ? consulta.medicoClinica.medico.idNavigation.nome
                        : consulta.paciente.idNavigation.nome}</Title>

                    <ModalTextRow>
                        {perfilUsuario === "Paciente" ? (
                            <>
                                <ModalText>{consulta.medicoClinica.medico.especialidade.especialidade1}</ModalText>
                                <ModalText>CRM-{consulta.medicoClinica.medico.crm}</ModalText>
                            </>
                        ) : (
                            <>
                                <TextAge>{idadePaciente} anos</TextAge>
                                <ModalText>{consulta.paciente.idNavigation.email}</ModalText>
                            </>
                        )
                        }
                    </ModalTextRow>

                    <ButtonModal onPress={HandlePress}>
                        <ButtonTitle onPress={HandlePress}>Ver Local da Consulta</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModal(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
        : null)
}

export const ModalCamera = ({ visible, setShowModal = null, enviarFoto, getMediaLibrary = false, ...resto }) => {
    const cameraRef = useRef(null)

    const [lastPhoto, setLastPhoto] = useState(null)
    const [photo, setPhoto] = useState(null)

    const [showModalImage, setShowModalImage] = useState(false)

    const GetLatestPhoto = async () => {
        //ordena a lista de fotos da galeria do maior ao menor e pega o primeiro item
        const { assets } = await MediaLibrary.getAssetsAsync({ sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 })


        console.log(assets);

        if (assets.length > 0) {
            setLastPhoto(assets[0].uri)
        }
    }

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = Camera.requestCameraPermissionsAsync()
            const { status: mediaStatus } = MediaLibrary.requestPermissionsAsync()
        })()

        //verificar se tem a necessidade de mostrar a galeria
        if (getMediaLibrary) {
            GetLatestPhoto()
        }
    }, [])

    const CapturarFoto = async () => {
        if (cameraRef) {
            const captura = await cameraRef.current.takePictureAsync()

            setPhoto(captura.uri)
            setShowModalImage(true)
        }
    }

    const SelectImageGalery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
            setShowModalImage(true)
        }
    }

    return (
        <>
            <Modal {...resto}
                visible={visible}
                transparent
                animationType="fade"

            >
                <PatientModal>

                    <CameraContent>
                        <View style={{ height: "90%", width: "100%", borderRadius: 15 }}>
                            <CameraView
                                ref={cameraRef}
                                ratio='15:9'
                                facing={'back'}
                                style={styles.camera}
                            />
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 30 }}>
                            <ButtonCamera onPress={() => CapturarFoto()}>
                                <AntDesign name="camera" size={24} color="white" />
                            </ButtonCamera>
                            <ButtonCamera
                                onPress={() => setShowModal(false)}
                                close
                            >
                                <AntDesign name="close" size={24} color="white" />
                            </ButtonCamera>

                            <TouchableOpacity onPress={() => SelectImageGalery()}>
                                {
                                    lastPhoto !== null ?
                                        <LastPhoto
                                            source={{ uri: lastPhoto }}
                                        />
                                        : (
                                            null
                                        )
                                }
                            </TouchableOpacity>
                        </View>
                    </CameraContent>

                </PatientModal>
            </Modal>

            <ModalImageCamera
                visible={showModalImage}
                setShowModalImage={setShowModalImage}
                setShowModalCamera={setShowModal}
                setFotoFinal={enviarFoto}
                image={photo}

            />
        </>
    )
}


export const ModalImageCamera = ({ visible, setShowModalImage, setShowModalCamera, image, setFotoFinal, ...resto }) => {
    const RetornarFoto = (foto) => {
        setFotoFinal(foto)
        setShowModalImage(false)
        setShowModalCamera(false)
    }

    return (
        <Modal {...resto}
            visible={visible}
            transparent
            animationType="fade"

        >
            <PatientModal>
                <ImageContent>
                    <ImagemRecebida
                        source={{ uri: image }}
                    />
                    <Button onPress={() => RetornarFoto(image)}>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </Button>
                    {/* <TextRegular>{image}</TextRegular> */}
                    <LinkCancel onPress={() => setShowModalImage(false)}>Voltar</LinkCancel>
                </ImageContent>

            </PatientModal>
        </Modal>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%"
    }
})