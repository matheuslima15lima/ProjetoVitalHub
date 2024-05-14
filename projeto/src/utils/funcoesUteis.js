export const ObjetoEstaVazio = (objeto) => {
    //retorna o número de chaves/propriedades que o objeto possui e verifica seu tamanho
    return (Object.keys(objeto).length === 0) ? true : false
}

export const GerarNotaClinica = () => {
    numeroAleatorio = Math.random()

    while (numeroAleatorio > 0.5 || numeroAleatorio < 0.3) {
        numeroAleatorio = Math.random()
    }

    numeroGerado = numeroAleatorio * 10

    return numeroGerado.toFixed(1)
}

export const verificarCamposFormulario = (objetoForm) => {
    let formValido = true
    const arrayForm = Object.values(objetoForm)
    arrayForm.forEach(item => {
        if (item === "") {
            formValido = false
        }
    })

    return formValido
}