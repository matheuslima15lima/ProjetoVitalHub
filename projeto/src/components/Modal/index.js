import { Modal, StyleSheet, View } from "react-native"
import { BoxInputConsulta, CameraContent, ConsultaModal, DadosConsultaBox, DadosConsultaText, DadosConsultaTitle, LinhaDadosConsulta, ModalConsultaForm, ModalContent, ModalSubtitle, ModalText, ModalTextRow, PatientModal, ResumoConsultaBox } from "./style"
import { ButtonTitle, SemiBoldText, TextRegular, Title } from "../Text/style"
import { ButtonCamera, ButtonModal } from "../Button/styled"
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

import { Camera, CameraType } from 'expo-camera'

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

export const ApointmentModal = ({ visible, setShowModalApointment, informacoes, navigation, ...resto }) => {


    return (
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

                    <Title>{informacoes.nome}</Title>

                    <ModalTextRow>
                        <ModalText>{informacoes.idade} anos</ModalText>
                        <ModalText>{informacoes.email}</ModalText>
                    </ModalTextRow>

                    <ButtonModal onPress={() => {
                        navigation.navigate("PaginaDeProntuario")
                        setShowModalApointment(false)
                    }}>
                        <ButtonTitle onPress={() => {
                            navigation.navigate("PaginaDeProntuario")
                            setShowModalApointment(false)
                        }}>Inserir Prontuário</ButtonTitle>
                    </ButtonModal>

                    <LinkCancel onPress={() => setShowModalApointment(false)}>Cancelar</LinkCancel>
                </ModalContent>
            </PatientModal>
        </Modal>
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

export const MedicoModal = ({ visible, setShowModal = null, ...resto }) => (
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

                <ButtonModal>
                    <ButtonTitle>Ver Local da Consulta</ButtonTitle>
                </ButtonModal>

                <LinkCancel manipulationFunction={() => setShowModal(false)}>Cancelar</LinkCancel>
            </ModalContent>
        </PatientModal>
    </Modal>
)

export const ModalCamera = ({ visible, setShowModal = null, enviarFoto, ...resto  }) => {
    const cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = Camera.requestCameraPermissionsAsync()
            const { status: mediaStatus } = MediaLibrary.requestPermissionsAsync()
        })()
    }, [])

    const CapturarFoto = async () => {
        if(cameraRef){
            const captura = await cameraRef.current.takePictureAsync()

            enviarFoto(captura.uri)

            .then(() => {
                console.warn("Foto capturada com sucesso")
            }).catch( erro => {
                console.warn(erro)
            })
        }
    }

    return (
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
                    <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 30}}>
                        <ButtonCamera onPress={() => CapturarFoto()}>
                            <AntDesign name="camera" size={24} color="white" />
                        </ButtonCamera>
                        <ButtonCamera 
                            onPress={() => setShowModal(false)}
                            close
                        >
                            <AntDesign name="close" size={24} color="white" />
                        </ButtonCamera>
                    </View>
                </CameraContent>
            </PatientModal>
        </Modal>
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

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%"
    }
})

