import { Modal, StyleSheet, View, TouchableOpacity } from "react-native"
import { BoxInputConsulta, CameraContent, ConsultaModal, DadosConsultaBox, DadosConsultaText, DadosConsultaTitle, LinhaDadosConsulta, ModalConsultaForm, ModalContent, ModalSubtitle, ModalText, ModalTextRow, PatientModal, ResumoConsultaBox, LastPhoto, ImageContent, ImagemRecebida } from "./style"
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

import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

import { Camera, CameraType } from 'expo-camera'
import api from "../../services/service"
import { ActivityIndicator } from "react-native-web"

export const CancelattionModal = ({ visible, setShowModalCancel, ...rest }) => {
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



                    <ButtonModal onPress={() => setShowModalCancel(false)}>
                        <ButtonTitle onPress={() => setShowModalCancel(false)}>Confirmar</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModalCancel(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}

export const ApointmentModal = ({ visible, setShowModalApointment, informacoes, navigation, perfilUsuario, ...resto }) => {

    const AbrirPaginaProntuario = () => {
        if(perfilUsuario === "Paciente"){
            navigation.navigate("VisualizarPrescricao", {consultaId: informacoes.id})
        }else{
            navigation.navigate("PaginaDeProntuario")
        }
    }

    const HandlePront = (rota) =>{
    // navigation.replace(rota,{pacienteId: informacoes.consulta.pacienteId})
    navigation.navigate(rota ,{consulta: informacoes})
    setShowModalApointment(false)
    }

    return informacoes !== null ?
         (
            <Modal {...resto}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <UserImageModal
                        source={require("../../assets/images/nicolle_image_modal.png")}
                    />
                       
                                    
                                    
                                   
                                    {/* <Title>{informacoes.paciente.idNavigation.nome}</Title> */}

                                    <ModalTextRow>
                                        <ModalText>22 anos</ModalText>
                                        {/* <ModalText>{informacoes.paciente.idNavigation.email}</ModalText> */}
                                    </ModalTextRow>
                
                                    <ButtonModal onPress={() => {
                                       HandlePront("PaginaDeProntuario")
                                    }}>
                                        <ButtonTitle onPress={() => {
                                           HandlePront("PaginaDeProntuario")
                                        }}>Inserir Prontuário</ButtonTitle>
                                    </ButtonModal>
                
                                    <LinkCancel onPress={() => setShowModalApointment(false)}>Cancelar</LinkCancel>
                                    
                                {/* // ): */}

                    <ModalTextRow>
                        <ModalText>{informacoes.idade} anos</ModalText>
                        <ModalText>{informacoes.email}</ModalText>
                    </ModalTextRow>

                    <ButtonModal onPress={() => {
                        AbrirPaginaProntuario()
                        setShowModalApointment(false)
                    }}>
                        <ButtonTitle onPress={() => {
                            AbrirPaginaProntuario()
                            setShowModalApointment(false)
                        }}>Inserir Prontuário</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModalApointment(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
         ):(
                
                                   <>
                                   <Text>Carregando...</Text>
                                    {/* <ActivityIndicator/> */}
                            </>
                                
    )
}
      

export const AgendarConsultaModal = ({ visible, setShowModal, navigation, ...resto }) => {

    // state para o nível de consulta
    const [nivelConsulta, setNivelConsulta] = useState("")

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
                                />
                                <ButtonModalConsulta
                                    buttonText={"Exame"}
                                    situacao={"exame"}
                                    actived={nivelConsulta === "exame"}
                                    manipulationFunction={setNivelConsulta}
                                />
                                <ButtonModalConsulta
                                    buttonText={"Urgência"}
                                    situacao={"urgencia"}
                                    actived={nivelConsulta === "urgencia"}
                                    manipulationFunction={setNivelConsulta}
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
                            />
                        </BoxInputConsulta>
                    </ModalConsultaForm>
                    <ButtonModal onPress={() => {
                        setShowModal(false)
                        navigation.replace("SelecionarClinica")
                    }}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </ButtonModal>
                    <LinkCancel onPress={() => setShowModal(false)}>Cancelar</LinkCancel>
                </ConsultaModal>
            </PatientModal>
        </Modal>
    )
}

export const ConfirmarConsultaModal = ({ visible, setShowModal = null, navigation, ...resto }) => {
    return (
        <Modal
            {...resto}
            visible={visible}
            transparent
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <Title>Agendar consulta</Title>
                    <ResumoConsultaBox>
                        <TextRegular>Consulte os dados selecionados para a sua consulta</TextRegular>
                        <DadosConsultaBox>
                            <LinhaDadosConsulta>
                                <DadosConsultaTitle>Data da consulta</DadosConsultaTitle>
                                <DadosConsultaText>1 de Novembro de 2023</DadosConsultaText>
                            </LinhaDadosConsulta>
                            <LinhaDadosConsulta>
                                <DadosConsultaTitle>Médico(a) da consulta</DadosConsultaTitle>
                                <DadosConsultaText>Dra Alessandra</DadosConsultaText>
                                <DadosConsultaText>Demartologa, Esteticista</DadosConsultaText>
                            </LinhaDadosConsulta>
                            <LinhaDadosConsulta>
                                <DadosConsultaTitle>Local da consulta</DadosConsultaTitle>
                                <DadosConsultaText>São Paulo, SP</DadosConsultaText>
                            </LinhaDadosConsulta>
                            <LinhaDadosConsulta>
                                <DadosConsultaTitle>Tipo da consulta</DadosConsultaTitle>
                                <DadosConsultaText>Rotina</DadosConsultaText>
                            </LinhaDadosConsulta>
                        </DadosConsultaBox>
                    </ResumoConsultaBox>
                    <ButtonContinuarBox
                        manipulationFunction={() => navigation.replace("Main")}
                        functionCancel={() => setShowModal(false)}
                        buttonText="Confirmar"
                    />
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}

export const MedicoModal = ({ visible, setShowModal = null, informacoes, perfilUsuario, navigation, ...resto }) => {

    function handleClose() {
        navigation.navigate("LocalConsulta", { clinicaId: informacoes.medicoClinica.clinicaId })
    }

    return (
        <Modal
            {...resto}
            visible={visible}
            transparent
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <UserImageModal
                        source={require("../../assets/images/doctor_image_modal.png")}
                    />

                    <Title>Dr. Fulano</Title>

                    <ModalTextRow>
                        <ModalText>Clínico Geral</ModalText>
                        <ModalText>CRM-11204</ModalText>
                    </ModalTextRow>

                    <ButtonModal onPress={() => handleClose("LocalConsulta")}>
                        <ButtonTitle onPress={() => handleClose("LocalConsulta")}>Ver Local da Consulta</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModal(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
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
                            <Camera
                                ref={cameraRef}
                                ratio='15:9'
                                type={CameraType.back}
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


export const ErrorModal = ({ visible, setShowModalError, ...rest }) => {
    return (
        <Modal {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal>
                <ModalContent>
                    <Title>Email ou senha incorretos</Title>
                    <ModalText>email ou senha icorretos, digite novamente</ModalText>



                    <ButtonModal onPress={() => setShowModalError(false)}>
                        <ButtonTitle onPress={() => setShowModalError(false)}>Tentar novamente</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => {

                        setShowModalError(false)
                    }}>fechar </LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
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

