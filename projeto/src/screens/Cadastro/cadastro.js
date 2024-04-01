import { useState } from "react";
import { BoxInput, BoxInputRow } from "../../components/Box/style";
import { Button } from "../../components/Button/styled";
import {
  ContainerApp,
  ContainerCenter,
} from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LinkCancel } from "../../components/Link";
import { LinkSemiBold } from "../../components/Link/style";
import { LogoVitalHub } from "../../components/Logo";
import {
  ButtonTitle,
  TextRegular,
  TitleCadastro,
} from "../../components/Text/style";
import api from "../../services/service";
export const Cadastro = ({ navigation }) => {
  const [conta, setConta] = useState([]);

  const CriarConta = async () => {
    try {
      const retornoApi = await api.post("Pacientes", {
        rg,
        cpf,
        dataNascimento,
        cep,
        logradouro,
        numero,
        cidade,
        nome,
        email,
        senha,
      });

      setConta(retornoApi.data);

      if (retornoApi.status == 201) {
        alert("usuário criado");
      } else {
        alert("erro ao criar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerCenter>
      <LogoVitalHub />
      <TitleCadastro>Criar conta</TitleCadastro>
      <TextRegular>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </TextRegular>
      <BoxInput>
        <Input
          placeholderText={"Usuário ou email"}
          value={conta.email}
          editable
          onChangeText={(text) => setConta({ ...conta, email: text })}
        />
        <Input
          editable
          placeholderText={"Senha"}
          value={conta.senha}
          onChangeText={(text) => setConta({ ...conta, senha: text })}
        />
        <Input
          editable
          placeholderText={"Confirmar senha"}
          value={conta.senha}
          onChangeText={(text) => setConta({ ...conta, senha: text })}
        />
          <Input
            editable
            placeholderText={"Nome"}
            value={conta.nome}
            onChangeText={(text) => setConta({ ...conta, nome: text })}
            />
            <Input
            editable
            placeholderText={"RG"}
            value={conta.nome}
            onChangeText={(text) => setConta({ ...conta, rg: text })}
          />
        <Input
          editable
          placeholderText={"CPF"}
          value={conta.cpf}
          onChangeText={(text) => setConta({ ...conta, cpf: text })}
        />
        <BoxInputRow>
          <Input
            editable
            placeholderText={"CEP"}
            value={conta.cep}
            onChangeText={(text) => setConta({ ...conta, cep: text })}
            fieldWidth={60}
          />
          <Input
            editable
            placeholderText={"Nº"}
            value={conta.numero}
            onChangeText={(text) => setConta({ ...conta, numero: text })}
            fieldWidth={30}
          />
        </BoxInputRow>
      </BoxInput>
      <Button //</ContainerCenter>onPress={() => navigation.replace("Login")}
        onPress={()=> CriarConta()}
      >
        <ButtonTitle //onPress={() => navigation.replace("Login")} 
             
        >
          Cadastrar
        </ButtonTitle>
      </Button>
      <LinkCancel onPress={() => navigation.replace("Login")}

           
      >
        Cancelar
      </LinkCancel>
    </ContainerCenter>
  );
};
