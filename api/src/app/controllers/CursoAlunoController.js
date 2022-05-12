import CursoAluno from '../models/CursoAluno';
import AtribuirCursoAlunoService from '../services/AtribuirCursoAlunoService';

class CursoAlunoController {
  async assign_curso(req, res) {
    const { id } = req.params;
    try {
      await req.body.cursos.forEach(id_curso => {
        if (
          CursoAluno.findAll({
            where: {
              id_pessoa: id,
              id_curso
            }
          })
        ) {
          throw new Error('Aluno já cadastrado nesse curso!');
        }
        AtribuirCursoAlunoService.execute(id, id_curso);
      });

      res.status(200).send({
        mensagem: 'Cursos atribuídos com sucesso'
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new CursoAlunoController();
