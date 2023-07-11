import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";
// import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosLista = await livros
        .find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosLista);
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({ erro: "Ocorreu um erro ao buscar os livros." });
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }

    // livros
    //   .findById(id)
    //   .populate("autor", "nome")
    //   .exec()
    //   .then((livro) => {
    //     res.status(200).json(livro);
    //   })
    //   .catch((error) => {
    //     next(error);
    //     // console.error(error);
    //     // res.status(500).json({
    //     //   erro: "Id do livro não localizado.",
    //     //   message: `${error.message}`,
    //     // });
    //   });
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao cadastrar livro.",
      //   message: `${error.message}`,
      // });
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao atualizar livro.",
      //   message: `${error.message}`,
      // });
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao remover livro.",
      //   message: `${error.message}`,
      // });
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = processaBusca(req.query);

      const livroResultado = await livros.find(busca);

      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
    }
  };

  // static listarLivroPorFiltro = async (req, res, next) => {
  //   try {
  //     const { editora, titulo } = req.query;

  //     // const regex = new RegExp(titulo, "i"); // "i" => nao diferencia letras maiusculas de minusculas

  //     const busca = {};

  //     if (editora) busca.editora = editora;
  //     if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; // operador de mongodb
  //     // if (titulo) busca.titulo = regex;
  //     // if (titulo) busca.titulo = titulo;

  //     const livroResultado = await livros.find(busca);

  //     res.status(200).send(livroResultado);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // static listarLivroPorEditora = (req, res, next) => {
  //   const edirora = req.query.editora;
  //   livros.find({ "editora": edirora })
  //     .then((livro) => {
  //       res.status(200).json(livro);
  //     })
  //     .catch((error) => {
  //       next(error);
  //       // console.error(error);
  //       // res.status(500).json({
  //       //   erro: "Editora do livro não localizada.",
  //       //   message: `${error.message}`,
  //       // });
  //     });
  // };
}

function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas } = parametros;

  // "i" => nao diferencia letras maiusculas de minusculas
  // const regex = new RegExp(titulo, "i");

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; // operador de mongodb
  // if (titulo) busca.titulo = regex;
  // if (titulo) busca.titulo = titulo;

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // $gte => Greater Than or Equal => Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;

  // $lte => Less Than or Equal => Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;

/*
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
*/

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