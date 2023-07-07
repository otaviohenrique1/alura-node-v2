import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .exec()
      .then((livros) => {
        res.status(200).json(livros);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ erro: "Ocorreu um erro ao buscar os livros." });
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
    livros
      .findById(id)
      .populate("autor", "nome")
      .exec()
      .then((livro) => {
        res.status(200).json(livro);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          erro: "Id do livro não localizado.",
          message: `${error.message}`,
        });
      });
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao cadastrar livro.",
        message: `${error.message}`,
      });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao atualizar livro.",
        message: `${error.message}`,
      });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao remover livro.",
        message: `${error.message}`,
      });
    }
  };

  static listarLivroPorEditora = (req, res) => {
    const edirora = req.query.editora;
    livros.find({ "editora": edirora })
      .then((livro) => {
        res.status(200).json(livro);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          erro: "Editora do livro não localizada.",
          message: `${error.message}`,
        });
      });
  };
}

export default LivroController;

/*
import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const listaDeLivros = await livros.find();
      res.status(200).json(listaDeLivros);
    } catch (error) {
      console.error(error);
      res.status(500).json({erro: "Ocorreu um erro ao buscar os livros."});
    }
  }

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const dadosLivro = await livros.findById(id);
      res.status(200).json(dadosLivro);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Id do livro não localizado.",
        message: `${error.message}`,
      });
    }
  }

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao cadastrar livro.",
        message: `${error.message}`,
      });
    }
  }

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body })
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao atualizar livro.",
        message: `${error.message}`,
      });
    }
  }

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Falha ao remover livro.",
        message: `${error.message}`,
      });
    }
  }
}

export default LivroController;
*/