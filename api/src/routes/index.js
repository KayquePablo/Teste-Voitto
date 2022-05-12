import { Router } from 'express';

import AlunosController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoContoller';
import CursoAlunoController from '../app/controllers/CursoAlunoController';

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/alunos/:id', AlunosController.read);

routes.post('/alunos', AlunosController.create);

routes.put('/alunos/:id', AlunosController.update);

routes.delete('/alunos/:id', AlunosController.delete);

routes.get('/cursos', CursoController.index);

routes.post('/cursos/aluno', CursoAlunoController.create);

export default routes;
