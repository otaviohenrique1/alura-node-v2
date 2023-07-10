// import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({erro: "Erro interno no servidor."});
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).json(autorResultado);
      } else {
        res.status(404).send({
          message: "Id do autor não localizado."
        });
      }
    } catch (error) {
      next(error);
      // if (error instanceof mongoose.Error.CastError) {
      //   res.status(400).send({
      //     message: "Um ou mais dados fornecidos estao incorretos."
      //   });
      // } else {
      //   console.error(error);
      //   res.status(500).json({
      //     erro: "Erro interno no servidor.",
      //     message: `${error.message}`,
      //   });
      // }
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao cadastrar autor.",
      //   message: `${error.message}`,
      // });
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao atualizar autor.",
      //   message: `${error.message}`,
      // });
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({
      //   erro: "Falha ao remover autor.",
      //   message: `${error.message}`,
      // });
    }
  };
}

export default AutorController;