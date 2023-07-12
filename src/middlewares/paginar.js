import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

// eslint-disable-next-line no-unused-vars
async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);
    
    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem }) // -1 => Decrescente / 1 => Crescente
        .skip((pagina - 1) * limite) // Quantos livros vao ser pulados
        .limit(limite) // Quantos livros vao ser exibidos
        .populate("autor")
        .exec();
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (error) {
    next(error);
  }
}
export default paginar;
