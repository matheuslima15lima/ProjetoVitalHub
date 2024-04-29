import {
  ApointmentInputField,
  InputField,
  InputVirifyEmail,
  PerfilInputField,
} from "./style";

import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useEffect } from "react";

export const Input = ({
  placeholderText,
  keyType = "default",
  onChangeText = null,
  maxLength,
  fieldvalue = null,
  verifyEmail = false,
  inputPerfil = false,
  editable = false,
  fieldHeight = "16",
  apointment = false,
  center = false,
  secure = false,
  inputError = false,
  autoFocus = false,
  fieldWidth = 100,
}) => {
  if (verifyEmail) {
    return (
      <InputVirifyEmail
        placeholder={placeholderText}
        keyboardType={keyType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={fieldvalue}
        editable={editable}
        secureTextEntry={secure}
        fieldWidth={fieldWidth}
      />
    );
  } else if (inputPerfil) {
    return (
      <PerfilInputField
        placeholder={placeholderText}
        keyboardType={keyType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={fieldvalue}
        editable={editable}
        fieldHeight={fieldHeight}
        secureTextEntry={secure}
        fieldWidth={fieldWidth}
      />
    );
  } else if (apointment) {
    return (
      <ApointmentInputField
        placeholder={placeholderText}
        keyboardType={keyType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={fieldvalue}
        editable={editable}
        fieldHeight={fieldHeight}
        center={center}
        secureTextEntry={secure}
        fieldWidth={fieldWidth}
      />
    );
  } else {
    return (
      <InputField
        placeholder={placeholderText}
        keyboardType={keyType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={fieldvalue}
        editable={editable}
        center={center}
        secureTextEntry={secure}
        inputError={inputError}
        autoFocus={autoFocus}
        fieldWidth={fieldWidth}
      />
    );
  }
};

export const InputSelect = ({ selecionarHora }) => {
  const dataAtual = moment().format("YYYY-MM-DD");
  const [arrayOptions, setArrayOptions] = useState(null);

  async function loadOptions() {
    //capturar a quantidade de horas que faltam para as 24h
    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");
    console.log(horasRestantes);
    //criar um laco que rode a quantidade de horas
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      //pra cada hora sera uma nova option
      return {
        label: `${valor}:00`,
        valor: valor,
      };
    });

    setArrayOptions(options);
  }

  useEffect(() => {
    loadOptions();
  });
  return (
    <View
      style={{
        width: 316,
        borderWidth: 2,
        marginBottom: 75,
        borderStyle: "solid",
        borderColor: "#34898F",
        borderRadius: 5,
      }}
    >
      {arrayOptions ? (
        <RNPickerSelect
          style={style}
          Icon={() => {
            return (
              <FontAwesomeIcon
                style={{ marginLeft: "1%" }}
                icon={faCaretDown}
                color="#34898F"
                size={22}
              />
            );
          }}
          placeholder={{
            label: "Selecione um valor",
            value: null,
            color: "#34898F",
          }}
          onValueChange={(value) => selecionarHora(value)}
          items={arrayOptions}
        //     { label: "JavaScript", value: "JavaScript" },
        //     { label: "TypeScript", value: "TypeScript" },
        //     { label: "Python", value: "Python" },
        //     { label: "Java", value: "Java" },
        //     { label: "C++", value: "C++" },
        //     { label: "C", value: "C" },
        //   ]}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "MontserratAlternates_600SemiBold",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "MontserratAlternates_600SemiBold",
  },
  iconContainer: {
    top: "25%",
    marginRight: 10,
  },
  placeholder: {
    color: "#34898F",
  },
});
