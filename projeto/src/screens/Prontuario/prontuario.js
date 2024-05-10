import { useEffect, useState } from "react";
import { LoadProfile } from "../../utils/Auth";
import { api } from "../../services/service";
import moment from "moment";
import { ContainerImagePerfil, ContainerProntuario, LoadingContainer } from "../../components/Container/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { ApointmentFormBox, ButtonImageSubmit, ButtonImageSubmitContent, ButtonImageSubmitText, CancelImageSubmit, ImageInputBox, ImageInputBoxField, ImageInputBoxText, ImageSubmitBox, ProntuarioBox, SendImageOCRBox, UserDataApointment } from "./style";
import { AgeUserText, ButtonTitle, EmailUserText, InputLabel, TextRegular, UserNamePerfilText } from "../../components/Text/style";
import { BoxInputField } from "../../components/Box";
import { Button } from "../../components/Button/styled";
import { LinkCancel } from "../../components/Link";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, View } from "react-native";
import { Input } from "../../components/Input";
import { ModalCamera } from "../../components/Modal";
import { ObjetoEstaVazio } from "../../utils/funcoesUteis";

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

  const [medicamento, setMedicamento] = useState(null);

  const [idadePaciente, setIdadePaciente] = useState(null);

  const [crm, setCrm] = useState("")

  const [especialidade, setEspecialidade] = useState("")

  const [fotoProntuario, setFotoProntuario] = useState("")

  const [listaDeExames, setListaDeExames] = useState([])

  useEffect(() => {
    setConsulta(route.params.consulta);

    if (route.params.consulta.receita !== undefined) {
      setMedicamento(route.params.consulta.receita.medicamento);
    }

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
      setFotoProntuario(retornoGet.data.idNavigation.foto)

      if (perfil === "Paciente") {
        setCrm(retornoGet.data.crm)
        setEspecialidade(retornoGet.data.especialidade.especialidade1)
      }
      else {
        setEmail(retornoGet.data.idNavigation.email)
        setIdadePaciente(
          moment
            .duration(moment().diff(moment(retornoGet.data.dataNascimento)))
            .asYears()
        );
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
        medicamento: medicamento,
      });
    } catch (error) {
      console.log(error);
    }
    setEditavel(false);
  };

  useEffect(() => {
    setFrmEditData(route.params.consulta);
    if (route.params) {
      ProntuarioInfo(perfilUsuario);
    }
  }, [route.params]);

  const InserirExame = async () => {
    const formData = new FormData();
    formData.append("Imagem", {
      uri: foto,
      name: `image.${foto.split(".").pop()}`,
      type: `image/${foto.split(".").pop()}`,
    });

    await api.post(`/Exame`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((retornoApi) => {
      //vai somando todos os arquivos enviados
      setDescricaoExame(
        descricaoExame + "\n" + retornoApi.data
      )
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

  useEffect(() => {
    ProntuarioInfo(perfilUsuario);

    if(!ObjetoEstaVazio(route.params.consulta.exames)){
      setListaDeExames(route.params.consulta.exames)
      listaDeExames.forEach(exame => {
        setDescricaoExame(
          descricaoExame + "\n" + exame.descricao
        )
      })
    }

  }, [route.params])

  const CadastrarExame = async () => {
    await api.post(`/Exame?idConsulta=${route.params.consulta.id}&descricaoExame=${descricaoExame}`).then(() => {
      alert("Exame cadastrado")
    }).catch(erro => {
      console.log(erro);
    })
  }

  return consulta !== null ? (
    <>
      <ContainerProntuario>

        <ContainerImagePerfil>
          {fotoProntuario !== "" ?
            <UserImagePerfil
              source={{ uri: fotoProntuario }}
            />
            : null}

        </ContainerImagePerfil>
        <ProntuarioBox>
          <UserNamePerfilText editavel={true}>{
            perfilUsuario === "Medico" ? "Dr(a)" : "" + nome
          }</UserNamePerfilText>
          <UserDataApointment>
            <AgeUserText>{perfilUsuario == "Medico" ?
              Math.round(idadePaciente) + " anos"
              :
              especialidade
            }
            </AgeUserText>
            <EmailUserText editavel={true}>
              {
                perfilUsuario == "Medico" ?
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
              editable
              placeholderText={"Prescrição médica"}
              labelText={"Prescrição médica"}
              fieldValue={medicamento ? medicamento : null}
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
                  {foto !== "" ? 
                    <Image
                      style={{height: "100%", width: "50%"}}
                      source={{uri: foto}}
                    />
                  :
                    <>
                      <MaterialCommunityIcons
                        name="file-upload-outline"
                        size={24}
                        color="#4E4B59"
                      />
                      <ImageInputBoxText>Nenhuma foto informada</ImageInputBoxText>
                    </>
                  }
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
                <CancelImageSubmit onPress={() => setDescricaoExame("")}>Cancelar</CancelImageSubmit>
              </ImageSubmitBox>

              <View
                style={{
                  height: 2,
                  backgroundColor: "#8C8A97",
                  width: "100%",
                  borderRadius: 5,
                }}
              ></View>

              <BoxInputField
                labelText={"Resultados dos Exames"}
                inputPerfil
                placeholderText={"Resultados..."}
                fieldHeight="60"
                fieldValue={descricaoExame}
              />

              {descricaoExame != "" ? (
                <>
                  <Button>
                    <ButtonTitle>Enviar exames</ButtonTitle>
                  </Button>
                </>
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