import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const listaDeAutores = await autores.find();
      res.status(200).json(listaDeAutores);
    } catch (error) {
      console.error(error);
      res.status(500).json({erro: "Ocorreu um erro ao buscar os autores."});
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const dadosAutor = await autores.findById(id);
      res.status(200).json(dadosAutor);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Id do autor não localizado.",
        message: `${error.message}`,
      });
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao cadastrar autor.",
        message: `${error.message}`,
      });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao atualizar autor.",
        message: `${error.message}`,
      });
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao remover autor.",
        message: `${error.message}`,
      });
    }
  };
}

export default AutorController;