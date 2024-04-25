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
import api from "../../services/service";
import { ActivityIndicator } from "react-native";

export const PaginaDeProntuario = ({ navigation, route }) => {
  const [editavel, setEditavel] = useState(false);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [consulta, setConsulta] = useState(null);

  const ProfileLoad = async () => {
    const token = await UserDecodeToken();

    if (token) {
      setNome(token.nome);
      setEmail(token.email);
    }
  };

  // const [prontuario, setProntuario] = useState({
  //     descricao:"",
  //     diagnostico:"",

  // })
  // const EditProntuario = async ()=>{
  //         const retronoApi = await api.put("/Consultas/Prontuario",{

  //         })
  // }

  useEffect(() => {
    setConsulta(route.params.consulta);

    ProfileLoad();
  }, []);

  useEffect(() => {
    if (route.params != undefined) {
      ProntuarioInfo();
    }

    console.log("route");
    console.log(route);
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
          {console.log(consulta)}
          <EmailUserText editavel={true}>{email}</EmailUserText>
        </UserDataApointment>
        <ApointmentFormBox>
          <BoxInputField
            apointment
            fieldHeight="84"
            placeholderText={"Descrição"}
            labelText={"Descrição da consulta"}
            fieldValue={consulta.descricao}
            editable
          />
          <BoxInputField
            apointment
            placeholderText={"Diagnóstico"}
            labelText={"Diagnóstico do paciente"}
            fieldValue={consulta.diagnostico}
            editable
          />
          {/* <BoxInputField
                        apointment 
                        fieldHeight="84"
                        placeholderText={"Prescrição médica"}
                        labelText={"Prescrição médica"}
                        fieldValue={consulta.receita.medicamento}
                        editable
                    /> */}
        </ApointmentFormBox>
        {editavel ? (
          <>
            <Button onPress={() => setEditavel(false)}>
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
