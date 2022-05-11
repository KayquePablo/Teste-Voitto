import { Router } from 'express';

import AlunosController from '../app/controllers/AlunoController';

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/aluno/:id', AlunosController.read);

export default routes;
