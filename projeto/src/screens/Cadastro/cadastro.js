import { useEffect, useState } from "react";
import { BoxInput, BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import { ContainerApp } from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkCancel } from "../../components/Link";
import { LinkSemiBold } from "../../components/Link/style";
import { LogoVitalHub } from "../../components/Logo";
import {
  ButtonTitle,
  TextRegular,
  TitleCadastro,
} from "../../components/Text/style";
import { api, apiViaCep } from "../../services/service";
import { ActivityIndicator, ScrollView } from "react-native";
import { Scroll } from "../../components/Scroll/style";
import {
  desmascararCep,
  desmascararCpf,
  desmascararRg,
  mascararCep,
  mascararCpf,
  mascararData,
  mascararRg,
} from "../../utils/StringMask";
import { verificarCamposFormulario } from "../../utils/funcoesUteis";

export const Cadastro = ({ navigation }) => {
  const [conta, setConta] = useState({
    email: "",
    senha: "",
    nome: "",
    rg: "",
    numero: "",
    logradouro: "",
    cep: "",
    cidade: "",
    dataNascimento: ""
  });

  const [mostrarLoading, setMostrarLoading] = useState(false)

  const [senhaConfirma, setSenhaConfirma] = useState("");

  const [enableButton, setEnableButton] = useState(true)

  const BuscarEnderecoPorCep = async () => {
    if (conta.cep.length < 9) {
      return null;
    } else {
      // alert("pronto para buscar o cep")
      await apiViaCep
        .get(`${desmascararCep(conta.cep)}/json/`)
        .then((retornoApi) => {
          setConta({
            ...conta,
            logradouro: retornoApi.data.logradouro,
            cidade: retornoApi.data.localidade
          })
          // console.log(retornoApi.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  useEffect(() => {
    setEnableButton(verificarCamposFormulario(conta))
  }, [conta])

  useEffect(() => {
    BuscarEnderecoPorCep();
  }, [conta.cep]);

  const CriarConta = async () => {    
    setEnableButton(false)

    if (senhaConfirma === conta.senha) {
      const arrayDataNascimento = conta.dataNascimento.split("/")

      const dataNascimentoFormatada = `${arrayDataNascimento[2]}-${arrayDataNascimento[1]}-${arrayDataNascimento[0]}`

      const idTipoPaciente = "EDBDD738-C3AF-4A4E-A396-340CFBDD1BD7";

      const form = new FormData();
      form.append("cpf", `${desmascararCpf(conta.cpf)}`)
      form.append("nome", `${conta.nome}`);
      form.append("email", `${conta.email}`);
      form.append("senha", `${conta.senha}`);
      form.append("rg", `${desmascararRg(conta.rg)}`);
      form.append("numero", `${parseInt(conta.numero)}`);
      form.append("logradouro", `${conta.logradouro}`);
      form.append("cep", `${desmascararCep(conta.cep)}`);
      form.append("cidade", `${conta.cidade}`)
      form.append("dataNascimento", `${dataNascimentoFormatada}`)
      form.append("idTipoUsuario", `${idTipoPaciente}`);

      setMostrarLoading(true)
      await api.post("/Pacientes", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        console.log("cadastrado com sucesso!!!");
        navigation.replace("Login");
      }).catch(error => {
        alert(error)
      })
      setMostrarLoading(false)
      setEnableButton(true)

      // return null
    } else {
      alert("Senhas não são iguais");

      // if (retornoApi.status == 201) {
      //   alert("usuário criado");
      // } else {
      //   alert("erro ao criar");
      // }
    }
  };

  return (
    <ContainerApp>
      <LogoVitalHub />
        <TitleCadastro>Criar conta</TitleCadastro>
        <TextRegular>
          Insira suas informações de cadastro para criar seu perfil na plataforma.
        </TextRegular>
        <Scroll>
        <BoxInput>
          <Input
            placeholderText={"Digite seu nome:"}
            fieldvalue={conta.nome}
            editable
            multiline={false}
            onChangeText={(text) => setConta({ ...conta, nome: text })}
          />
          <Input
            placeholderText={"Usuário ou email"}
            fieldvalue={conta.email}
            multiline={false}
            editable
            onChangeText={(text) => setConta({ ...conta, email: text })}
          />
          <Input
            editable
            placeholderText={"Senha"}
            fieldvalue={conta.senha}
            multiline={false}
            secure
            onChangeText={(text) => setConta({ ...conta, senha: text })}
          />
          <Input
            editable
            placeholderText={"Confirmar Senha"}
            fieldvalue={senhaConfirma}
            multiline={false}
            secure
            onChangeText={(text) => setSenhaConfirma(text)}
          />
          <Input
            editable
            placeholderText={"Rg"}
            keyType="numeric"
            fieldvalue={mascararRg(conta.rg)}
            onChangeText={(text) =>
              setConta({ ...conta, rg: text })
            }
          />
          <Input
            editable
            placeholderText={"Cpf"}
            keyType="numeric"
            fieldvalue={mascararCpf(conta.cpf)}
            onChangeText={(text) =>
              setConta({ ...conta, cpf: text })
            }
          />

          <BoxInputRow>
            <Input
              inputWidth={47}
              editable
              keyType="numeric"
              placeholderText={"Cep"}
              fieldvalue={mascararCep(conta.cep)}
              onChangeText={(text) => setConta({ ...conta, cep: text })}
            />
            <Input
              inputWidth={47}
              editable
              keyType="numeric"
              placeholderText={"Data de nascimento"}
              fieldvalue={mascararData(conta.dataNascimento)}
              onChangeText={(text) => setConta({
                ...conta,
                dataNascimento: text
              })}
            />
          </BoxInputRow>

          <Input
            placeholderText={`Logradouro`}
            fieldvalue={conta.logradouro}
          />

          <BoxInputRow>
            <Input
              inputWidth={47}
              editable
              placeholderText={"Nº da Residência"}
              keyType="numeric"
              fieldValue={conta.senha}
              onChangeText={(text) => setConta({
                ...conta,
                numero: text
              })}
            />
            <Input
              inputWidth={47}
              placeholderText={"Cidade"}
              fieldvalue={conta.cidade}
            />
          </BoxInputRow>


        </BoxInput>
        <Button //</ContainerApp>onPress={() => navigation.replace("Login")}
          onPress={enableButton ? () => CriarConta() : (!mostrarLoading ? () => alert("Preencha todos os campos para continuar") : null)}
          disable={!enableButton}
        >
          {mostrarLoading ?
            <ActivityIndicator color={"#FBFBFB"} />
            :
            <ButtonTitle>Cadastrar</ButtonTitle>
          }
        </Button>
      </Scroll>
      <LinkCancel onPress={() => navigation.replace("Login")}>
        Cancelar
      </LinkCancel>
    </ContainerApp>
  );
};