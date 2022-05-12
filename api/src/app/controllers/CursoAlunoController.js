import CursoAluno from '../models/CursoAluno';

class CursoAlunoController {
  async create(req, res) {
    const novoCursoAluno = req.body;
    try {
      const cursoAtribuido = await CursoAluno.create(novoCursoAluno);
      return res.json(cursoAtribuido);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new CursoAlunoController();
