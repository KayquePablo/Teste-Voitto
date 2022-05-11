import CursoAluno from '../../models/CursoAluno';

class AtribuirCursoAlunoService {
  async execute({ id_aluno, id_curso }) {
    await CursoAluno.create({
      id_pessoa: id_aluno,
      id_curso
    });
    return true;
  }
}

export default new AtribuirCursoAlunoService();
