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
    if(senhaConfirma === conta.senha){

      const form = new FormData();
      form.append("nome", `${conta.nome}`)
      form.append("email", `${conta.email}`);
      form.append("senha", `${conta.senha}`);
      form.append("idTipoUsuario", `42EAB83A-A42C-4C0D-AE47-2C7D47468164`)

      const response = await api.post("/Pacientes", form, {
            headers:{
              "Content-Type":"multipart/form-data"
            }

      });
        console.log(response);
        if(response.data.sucess){
          console.log("cadastrado com sucesso!!!");
        }
      navigation.replace("Login")
    
      // return null
    }else{
    try {
        alert("Senhas não são iguais")
   
      
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
