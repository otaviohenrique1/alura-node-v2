import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
    // res.status(400).send({
    //   message: "Um ou mais dados fornecidos estao incorretos.",
    // });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
    // const mensagensErro = Object.values(erro.errors)
    //   .map((erro) => erro.message)
    //   .join("; ");

    // res.status(400).send({
    //   message: `Os seguintes erros foram encontrados: ${mensagensErro}`,
    // });
  }
  else {
    new ErroBase().enviarResposta(res);
    // res.status(500).json({
    //   erro: "Erro interno no servidor.",
    //   message: `${erro.message}`,
    // });
  }
}

export default manipuladorDeErros;