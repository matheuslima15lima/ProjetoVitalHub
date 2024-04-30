import { useEffect, useState } from "react";
import { ContainerApp } from "../../components/Container/style/";
import {
  AgeUserText,
  ButtonTitle,
  EmailUserText,
  Title,
  UserNamePerfilText,
} from "../../components/Text/style";
import { UserImagePerfil } from "../../components/UserImage/styled";
import { UserContentBox } from "../../components/Box/style";
import { ContainerProntuario } from "../../components/Container/style";
import { ApointmentFormBox, ProntuarioBox, UserDataApointment } from "./style";
import { BoxInputField } from "../../components/Box";
import { Button } from "../../components/Button/styled";
import { LinkCancel } from "../../components/Link";
import { UserDecodeToken } from "../../utils/Auth";
import { ActivityIndicator } from "react-native";
import { api } from "../../services/service";

export const PaginaDeProntuario = ({ navigation, route }) => {

  const [frmEditData, setFrmEditData] = useState({})
  // const [frmEdit, setFrmEdit] = useState(false)
  const [editavel, setEditavel] = useState(false);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [consulta, setConsulta] = useState(null);

  const [medicamento, setMedicamento]= useState("");

  const ProfileLoad = async () => {
    const token = await UserDecodeToken();

    if (token) {
      setNome(token.nome);
      setEmail(token.email);
    }
  };



    //Exibe os dados na tela com o formulário de edição
    async function showUpdateForm(consulta) {
      setFrmEditData(consulta);
      // setFrmEdit(true);
    }
  
  // const [descricao, setDescricao] = useState({})
  // const [diagnostico, setDiagnostico] = useState({})
  const EditProntuario = async ()=>{
          try {
            
            await api.put("/Consultas/Prontuario", {
              consultaId: route.params.consulta.id,
              descricao: frmEditData.descricao,
              diagnostico:frmEditData.diagnostico,
              medicamento: route.params.consulta.receita.medicamento
            })

        
          } catch (error) {
            console.log(error);
          }
          setEditavel(false)
  }

  useEffect(() => {
    setConsulta(route.params.consulta);
    setMedicamento(route.params.consulta.receita.medicamento)
    console.log('MEDICAMENTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    console.log(medicamento);

    ProfileLoad();
  }, []);

  useEffect(() => {
    setFrmEditData(route.params.consulta)
    if (route.params != undefined) {
      ProntuarioInfo();
    }

    console.log("route");
    console.log(route);
    setEditavel(false);
  }, [route.params]);



  const ProntuarioInfo = async () => {
    try {
      console.log(`/Pacientes/BuscarPorId?id=${consulta.pacienteId}`);
      console.log(consulta);

      // const id = "8E942765-8128-4948-966B-45550C15962E"
      const retornoGet = await api.get(
        `/Pacientes/BuscarPorId?id=${route.params.pacienteId}`
      );
      
      console.log(retornoGet.data);
      setNome(retornoGet.data.idNavigation.nome);
      setEmail(retornoGet.data.idNavigation.email);
    } catch (error) {
      console.log(error);
    }
  };


  return consulta != null ? (
    <ContainerProntuario>
      <UserImagePerfil
        source={require("../../assets/images/user1-image.png")}
      />
      <ProntuarioBox>
        <UserNamePerfilText editavel={true}>{nome}</UserNamePerfilText>
        <UserDataApointment>
          <AgeUserText>18 anos</AgeUserText>
          {console.log(frmEditData)}
          <EmailUserText editavel={true}>{email}</EmailUserText>
        </UserDataApointment>
        <ApointmentFormBox>
          <BoxInputField
            apointment
            fieldHeight="84"
            placeholderText={"Descrição"}
            labelText={"Descrição da consulta"}
            fieldValue={frmEditData.descricao}
            onChangeText={txt=>setFrmEditData({...frmEditData, descricao:txt})}
            editable={editavel}
          />
          <BoxInputField
            apointment
            placeholderText={"Diagnóstico"}
            labelText={"Diagnóstico do paciente"}
            fieldValue={frmEditData.diagnostico}
            onChangeText={txt=>setFrmEditData({...frmEditData, diagnostico:txt})}
            editable={editavel}
          />
          <BoxInputField
                        apointment 
                        fieldHeight="84"
                        placeholderText={"Prescrição médica"}
                        labelText={"Prescrição médica"}
                        
                        fieldValue={medicamento}
                        editable={false}
                    />
        </ApointmentFormBox>
        {editavel ? (
          <>
            <Button onPress={() => EditProntuario()}>
              <ButtonTitle>Salvar Edições</ButtonTitle>
            </Button>
          </>
        ) : (
          <Button onPress={() => setEditavel(true)}>
            <ButtonTitle>Editar</ButtonTitle>
          </Button>
        )}

        <LinkCancel
          onPress={
            editavel
              ? () => setEditavel(false)
              : () => navigation.replace("Main")
          }
        >
          Cancelar
        </LinkCancel>
      </ProntuarioBox>
    </ContainerProntuario>
  ) : null;
};
