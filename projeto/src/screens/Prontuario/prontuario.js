import { useEffect, useState } from "react";
import { ContainerApp } from "../../components/Container/style/";
import {
  AgeUserText,
  ButtonTitle,
  EmailUserText,
  InputLabel,
  Title,
  UserNamePerfilText,
} from "../../components/Text/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { UserContentBox } from "../../components/Box/style";
import {
  ContainerProntuario,
  LoadingContainer,
} from "../../components/Container/style";
import { ApointmentFormBox, ProntuarioBox, UserDataApointment } from "./style";
import { BoxInputField } from "../../components/Box";
import { Button } from "../../components/Button/styled";
import { LinkCancel } from "../../components/Link";
import { LoadProfile } from "../../utils/Auth";
import {
  ButtonImageSubmit,
  ButtonImageSubmitContent,
  ButtonImageSubmitText,
  CancelImageSubmit,
  ImageInputBox,
  ImageInputBoxField,
  ImageInputBoxText,
  ImageSubmitBox,
  SendImageOCRBox,
} from "../VisualizarPrescricao/style";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Input } from "../../components/Input";
import moment from "moment";
import { ModalCamera } from "../../components/Modal";
import { api } from "../../services/service";

export const PaginaDeProntuario = ({ navigation, route }) => {
  const [openModalCamera, setOpenModalCamera] = useState(false);

  const [descricaoExame, setDescricaoExame] = useState("");

  const [foto, setFoto] = useState("");

  const [editavel, setEditavel] = useState(false);

  const [perfilUsuario, setPerfilUsuario] = useState("");

  const [frmEditData, setFrmEditData] = useState({});

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [consulta, setConsulta] = useState(null);

  const [medicamento, setMedicamento] = useState("");

  const [idadePaciente, setIdadePaciente] = useState(null);

  const [crm, setCrm] = useState("")

  const [especialidade, setEspecialidade] = useState("")

  useEffect(() => {
    setConsulta(route.params.consulta);
    setMedicamento(route.params.consulta.receita.medicamento);

    LoadProfile().then((token) => {
      setPerfilUsuario(token.perfil);
      ProntuarioInfo(token.perfil)
    });
  }, []);

  const ProntuarioInfo = async (perfil) => {
    try {
      // const id = "8E942765-8128-4948-966B-45550C15962E"
      const retornoGet = await api.get(
        `/${perfil === "Paciente" ? "Medicos" : "Pacientes"}/BuscarPorId?id=${route.params.idUsuario}`
      );   
      setNome(retornoGet.data.idNavigation.nome);
      console.log(nome);
      
      if(perfil === "Paciente"){
        setCrm(retornoGet.data.crm)
        console.log(crm);
        setEspecialidade(retornoGet.data.especialidade.especialidade1)
        console.log(especialidade);
      } 
      else{
        setEmail(retornoGet.data.idNavigation.email)
        setIdadePaciente(
            moment
              .duration(moment().diff(moment(retornoGet.data.dataNascimento)))
              .asYears()
          );
          console.log(email);
          console.log(idadePaciente);
      } 
    
      

    } catch (error) {
      console.log(error);
    }
  };

  function showUpdateForm(consulta) {
    setFrmEditData(consulta);
    setEditavel(true);
    // setFrmEdit(true);
  }

  const AbortarEdicaoProntuario = () => {
    setFrmEditData({});
    setEditavel(false);
  };

  // const [descricao, setDescricao] = useState({})
  // const [diagnostico, setDiagnostico] = useState({})
  const EditProntuario = async () => {
    try {
      await api.put("/Consultas/Prontuario", {
        consultaId: route.params.consulta.id,
        descricao: frmEditData.descricao,
        diagnostico: frmEditData.diagnostico,
        medicamento: route.params.consulta.receita.medicamento,
      });
    } catch (error) {
      console.log(error);
    }
    setEditavel(false);
  };

  useEffect(() => {
    setFrmEditData(route.params.consulta);
    console.log(route.params.idUsuario);
    if (route.params != undefined) {
      ProntuarioInfo(perfilUsuario);
    }
  }, [route.params]);

  const InserirExame = async () => {
    const formData = new FormData();
    formData.append("ConsultaId", route.params.consulta.id);
    formData.append("Imagem", {
      uri: foto,
      name: `image.${foto.split(".").pop()}`,
      type: `image/${foto.split(".").pop()}`,
    });

    await api
      .post(`/Exame`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((retornoApi) => {
        //vai somando todos os arquivos enviados
        setDescricaoExame(
          descricaoExame + "\n" + retornoApi.data.descricao
        ).then(() => {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (foto !== "") {
      InserirExame();
    }
  }, [foto]);

//   const  CadastroExame =  async()=>{
//   try {
//       retornoGet = await api.post(`/Exame`,{
//           ConsultaId: route.params.consulta.id,
//           Imagem:

//       })

//   } catch (error) {

//   }
//   }

    useEffect(()=>{
        ProntuarioInfo(perfilUsuario);

    },[route.params])

  return consulta !== null ? (
    <>
      <ContainerProntuario>

        <UserImagePerfil
          source={require("../../assets/images/user1-image.png")}
        />

        <ProntuarioBox>


          <UserNamePerfilText editavel={true}>{nome}</UserNamePerfilText>
          <UserDataApointment>
            <AgeUserText>{ perfilUsuario == "Medico" ?
            Math.round(idadePaciente) + " anos"
            :
            especialidade
            } 
            </AgeUserText> 
            <EmailUserText editavel={true}>
                {
                perfilUsuario == "Medico"?
                email
                :
                "CRM-" + crm
                
                }
            </EmailUserText>
          </UserDataApointment>

          <ApointmentFormBox>
            <BoxInputField
              apointment={perfilUsuario === "Medico" && editavel ? true : false}
              inputPerfil={!editavel ? true : false}
              fieldHeight="84"
              placeholderText={"Descrição"}
              labelText={"Descrição da consulta"}
              fieldValue={editavel ? frmEditData.descricao : consulta.descricao}
              onChangeText={(txt) =>
                setFrmEditData({ ...frmEditData, descricao: txt })
              }
              editable={editavel}
            />
            <BoxInputField
              apointment={perfilUsuario === "Medico" && editavel ? true : false}
              inputPerfil={!editavel ? true : false}
              placeholderText={"Diagnóstico"}
              labelText={"Diagnóstico do paciente"}
              fieldValue={
                editavel ? frmEditData.diagnostico : consulta.diagnostico
              }
              onChangeText={(txt) =>
                setFrmEditData({ ...frmEditData, diagnostico: txt })
              }
              editable={editavel}
            />
            <BoxInputField
              apointment={perfilUsuario === "Medico" && editavel ? true : false}
              inputPerfil={!editavel ? true : false}
              fieldHeight="84"
              placeholderText={"Prescrição médica"}
              labelText={"Prescrição médica"}
              fieldValue={medicamento}
              editable={false}
            />
          </ApointmentFormBox>

          {/* Botões para alterar o usuário (só para médicos) */}
          {perfilUsuario === "Medico" ? (
            editavel ? (
              <>
                <Button onPress={() => EditProntuario()}>
                  <ButtonTitle>Salvar Edições</ButtonTitle>
                </Button>
                <LinkCancel onPress={() => AbortarEdicaoProntuario()}>
                  Cancelar
                </LinkCancel>
              </>
            ) : (
              <>
                <Button onPress={() => showUpdateForm(consulta)}>
                  <ButtonTitle>Editar</ButtonTitle>
                </Button>
              </>
            )
          ) : null}

          {perfilUsuario === "Paciente" ? (
            <SendImageOCRBox>
              <ImageInputBox>
                <InputLabel>Exames médicos:</InputLabel>
                <ImageInputBoxField>
                  <MaterialCommunityIcons
                    name="file-upload-outline"
                    size={24}
                    color="#4E4B59"
                  />
                  <ImageInputBoxText>Nenhuma foto informada</ImageInputBoxText>
                </ImageInputBoxField>
              </ImageInputBox>
              <ImageSubmitBox>
                <ButtonImageSubmit
                  underlayColor={"#496BBA"}
                  activeOpacity={1}
                  onPress={() => setOpenModalCamera(true)}
                >
                  <ButtonImageSubmitContent>
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={24}
                      color="white"
                    />
                    <ButtonImageSubmitText>Enviar</ButtonImageSubmitText>
                  </ButtonImageSubmitContent>
                </ButtonImageSubmit>
                <CancelImageSubmit>Cancelar</CancelImageSubmit>
              </ImageSubmitBox>

              <View
                style={{
                  height: 2,
                  backgroundColor: "#8C8A97",
                  width: "100%",
                  borderRadius: 5,
                }}
              ></View>

              <Input
                inputPerfil
                placeholderText={"Resultados..."}
                fieldHeight="60"
                fieldvalue={descricaoExame}
              />

              {descricaoExame != "" ? (
                <Button>
                  <ButtonTitle>ENVIAR EXAMES</ButtonTitle>
                </Button>
              ) : null}
            </SendImageOCRBox>
          ) : null}
          {/* Campos Para envio de Exames (só para pacientes) */}

          {/* Link Para voltar para a Home */}
          <LinkCancel onPress={() => navigation.replace("Main")}>
            Voltar Para a Home
          </LinkCancel>
        </ProntuarioBox>
      </ContainerProntuario>

      {/* Modal Para abrir a câmera (só para paciente) */}
      {perfilUsuario === "Paciente" ? (
        <ModalCamera
          visible={openModalCamera}
          setShowModal={setOpenModalCamera}
          enviarFoto={setFoto}
          getMediaLibrary
        />
      ) : null}
    </>
  ) : (
    <LoadingContainer />
  );
};
