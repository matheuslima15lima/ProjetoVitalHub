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
import { ScrollView } from "react-native";
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

export const Cadastro = ({ navigation }) => {
  const [conta, setConta] = useState({
    email: "",
    senha: "",
    nome: "",
    rg: "",
    numero: 0,
    logradouro: "",
    cep: "",
    cidade: "",
    dataNascimento: ""
  });

  const [senhaConfirma, setSenhaConfirma] = useState("");

  const BuscarEnderecoPorCep = async () => {
    if (conta.cep.length < 8) {
      return null;
    }else{
      // alert("pronto para buscar o cep")
    await apiViaCep
      .get(`${conta.cep}/json/`)
      .then((retornoApi) => {
        setConta({
          ...conta,
          logradouro: retornoApi.data.logradouro,
          cidade: retornoApi.data.localidade
        })

        console.log(conta);
        // console.log(retornoApi.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    }
  };

  useEffect(() => {
    BuscarEnderecoPorCep();
  }, [conta.cep]);

  const CriarConta = async () => {
    if (senhaConfirma === conta.senha) {
      const arrayDataNascimento = conta.dataNascimento.split("/")

      const dataNascimentoFormatada = `${arrayDataNascimento[2]}-${arrayDataNascimento[1]}-${arrayDataNascimento[0]}`

      const form = new FormData();
      form.append("cpf", `${conta.cpf}`)
      form.append("nome", `${conta.nome}`);
      form.append("email", `${conta.email}`);
      form.append("senha", `${conta.senha}`);
      form.append("rg", `${desmascararRg(conta.rg)}`);
      form.append("numero", `${parseInt(conta.numero)}`);
      form.append("logradouro", `${conta.logradouro}`);
      form.append("cep", `${desmascararCep(conta.cep)}`);
      form.append("cidade", `${conta.cidade}`)
      form.append("dataNascimento", `${dataNascimentoFormatada}`)
      form.append("idTipoUsuario", `42EAB83A-A42C-4C0D-AE47-2C7D47468164`);

      const response = await api.post("/Pacientes", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.data.sucess) {
        console.log("cadastrado com sucesso!!!");
      }
      navigation.replace("Login");

      // return null
    } else {
      try {
        alert("Senhas não são iguais");

        // if (retornoApi.status == 201) {
        //   alert("usuário criado");
        // } else {
        //   alert("erro ao criar");
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ContainerApp>
      <LogoVitalHub />
      <TitleCadastro>Criar conta</TitleCadastro>
      <TextRegular>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </TextRegular>

      <Scroll>
        <BoxInput>
          <Input
            placeholderText={"Digite seu nome:"}
            fieldvalue={conta.nome}
            editable
            onChangeText={(text) => setConta({ ...conta, nome: text })}
          />
          <Input
            placeholderText={"Usuário ou email"}
            fieldvalue={conta.email}
            editable
            onChangeText={(text) => setConta({ ...conta, email: text })}
          />
          <Input
            editable
            placeholderText={"Senha"}
            fieldvalue={conta.senha}
            onChangeText={(text) => setConta({ ...conta, senha: text })}
          />
          <Input
            editable
            placeholderText={"Confirmar Senha"}
            fieldvalue={senhaConfirma}
            onChangeText={(text) => setSenhaConfirma(text)}
          />
          <Input
            editable
            placeholderText={"Rg"}
            fieldvalue={mascararRg(conta.rg)}
            onChangeText={(text) =>
              setConta({ ...conta, rg: text})
            }
          />
          <Input
            editable
            placeholderText={"Cpf"}
            fieldvalue={mascararCpf(conta.cpf)}
            onChangeText={(text) =>
              setConta({ ...conta, cpf: text})
            }
          />

          <BoxInputRow>
            <Input
              inputWidth={47}
              editable
              keyType="numeric"
              placeholderText={"Cep"}
              fieldvalue={conta.cep}
              onChangeText={(text) => setConta({ ...conta, cep: text })}
            />

            <Input
              inputWidth={47}
              placeholderText={"Cidade"}
              fieldvalue={conta.cidade}
            />
          </BoxInputRow>

          <BoxInputRow>
            <Input
              inputWidth={47}
              editable
              placeholderText={"Numero"}
              fieldValue={conta.senha}
              onChangeText={(text) => setConta({
                ...conta,
                numero: text
                })}
            />
            <Input
              inputWidth={47}
              editable
              placeholderText={"Data de nascimento"}
              fieldvalue={mascararData(conta.dataNascimento)}
              onChangeText={(text) => setConta({
                ...conta,
                dataNascimento: text
              })}
            />
          </BoxInputRow>

          <Input 
            placeholderText={`${conta.logradouro}`} 
            fieldvalue={conta.logradouro} 
          />
        </BoxInput>
        <Button //</ContainerApp>onPress={() => navigation.replace("Login")}
          onPress={() => CriarConta()}
        >
          <ButtonTitle //onPress={() => navigation.replace("Login")}
          >
            Cadastrar
          </ButtonTitle>
        </Button>
      </Scroll>
      <LinkCancel onPress={() => navigation.replace("Login")}>
        Cancelar
      </LinkCancel>
    </ContainerApp>
  );
};
