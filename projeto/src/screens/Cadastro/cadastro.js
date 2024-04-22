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
import { api } from "../../services/service";
export const Cadastro = ({ navigation }) => {
  const [conta, setConta] = useState({
    email: "",
    senha: "",
    nome:""
  });

  const [senhaConfirma, setSenhaConfirma] = useState("")

  const CriarConta = async () => {
    if(senhaConfirma != conta.senha){
      alert("Senhas não são iguais")
      return null
    }else{
    try {
      await api.post("/Pacientes", {
        nome: conta.nome,
        email: conta.email,
        senha: conta.senha,
        idTipoUsuario:"42EAB83A-A42C-4C0D-AE47-2C7D47468164"
      });

      navigation.replace("Login")
      
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
    <ContainerCenter>
      <LogoVitalHub />
      <TitleCadastro>Criar conta</TitleCadastro>
      <TextRegular>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </TextRegular>
      <BoxInput>
        <Input
          placeholderText={"Digite seu nome:"}
          value={conta.email}
          editable
          onChangeText={(text) => setConta({ ...conta, nome: text })}
        />
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
          placeholderText={"Confirmar Senha"}
          value={conta.senha}
          onChangeText={(text) => setSenhaConfirma(text)}
        />
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
