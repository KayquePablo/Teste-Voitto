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
          id: Number(id)
        }
      });
      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async create(req, res) {
    const create_aluno = req.body;
    try {
      const created_aluno = await Aluno.create(create_aluno);
      return res.json(created_aluno);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const up_Aluno = req.body;
    try {
      await Aluno.update(up_Aluno, {
        where: {
          id: Number(id)
        }
      });
      const updated_aluno = await Aluno.findOne({
        where: {
          id: Number(id)
        }
      });
      return res.json(updated_aluno);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Aluno.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.json({ mensagem: `Aluno foi deletado com sucesso!` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new AlunoController();
