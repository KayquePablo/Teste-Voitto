import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async read(req, res) {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    return res.json(aluno);
  }

  async create(req, res) {
    // TODO
  }

  async update(req, res) {
    // TODO
  }

  async delete(req, res) {
    // TODO
  }
}

export default new AlunoController();
