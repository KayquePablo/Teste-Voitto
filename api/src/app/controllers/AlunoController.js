import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async read(req, res) {
    const { id } = req.params;
    try {
      const aluno = await Aluno.findOne({
        where: {
          id
        }
      });
      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async create(req, res) {
    try {
      await Aluno.create({
        nome: req.body.nome,
        email: req.body.email,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
      });
      res.status(201).send({ mensagem: 'Cadastro Realizado com sucesso!' });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const aluno = await Aluno.findAll({
        where: {
          id
        }
      });

      if (aluno.length === 0) {
        throw new Error('Aluno não encontrado!');
      }

      await Aluno.update(
        {
          nome: req.body.nome,
          email: req.body.email,
          cep: req.body.cep,
          cidade: req.body.cidade,
          estado: req.body.estado
        },
        { where: { id } }
      );

      res.status(200).send({ mensagem: 'Dados do Aluno Atualizados.' });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const aluno = await Aluno.findAll({
        where: {
          id
        }
      });

      if (aluno.length === 0) {
        throw new Error('Aluno não encontrado!');
      }
      await Aluno.destroy({
        where: {
          id
        }
      });

      res.status(200).send({ mensagem: 'Aluno deletado.' });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new AlunoController();
