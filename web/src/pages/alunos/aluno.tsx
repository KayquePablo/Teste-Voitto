import StudentTable from '@/components/Organisms/Tables/StudentTable';
import Dashboard from '@/components/Templates/Layouts/Dashboard';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { List } from '@/components/Molecules/Containers/ListCourses/styles';
import Link from 'next/link';

const Courses: React.FC = () => {
  const { query } = useRouter();

  const [student, setStudent] = useState<Student>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resStudent = await api.get(`/alunos/${query.id}`);
        const resCourses = await api.get('/cursos');
        setStudent(resStudent.data);
        setCourses(resCourses.data);
      } catch {
        () => {
          toast('Confira a API', {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        };
      }
    }
    fetchData();
  }, [query.id]);

  const toastSuccess = (message: string) => {
    toast.success(message, {
      autoClose: 2000
    });
  };

  const handleSubmitCourse = async (course: Course) => {
    setStudentCourses([...studentCourses, course]);
    setCourses(courses.filter(c => c.id !== course.id));
    toastSuccess('Aluno matriculado com sucesso!');
    await api.post('/cursos/aluno', {
      id_pessoa: student.id,
      id_curso: course.id
    });
  };

  const handleDeleteCourse = (stCourse: Course) => {
    setStudentCourses(studentCourses.filter(stc => stc.id !== stCourse.id));
    setCourses([...courses, stCourse]);
    toastSuccess('Aluno desmatriculado com sucesso!');
  };

  const renderStudentName = () => {
    if (student !== undefined) {
      return student.nome;
    } else {
      return '';
    }
  };

  return (
    <>
      <Dashboard
        title={`Cursos do ${renderStudentName()}`}
        description={<p>Aqui você verá todos os cursos deste Aluno</p>}
      >
        <Link href="/alunos">
          <button background-Color="#dddddd" color="black" >
            Voltar
          </button>
        </Link>

        <h2 color="#02db20">Cursos disponíveis</h2>

        {courses.length === 0 ? (
          <p>Não há mais nenhum curso disponível.</p>
        ) : (
          <List>
            {courses.map(course => (
              <li key={course.id}>
                {course.nome}
                <button
                  background-Color="#4d5bf9"
                  color="#fff"
                  onClick={() => handleSubmitCourse(course)}
                >
                  Matricular
                </button>
              </li>
            ))}
          </List>
        )}

        <h2 color="#02db20">Cursos Matriculados</h2>

        {studentCourses.length === 0 ? (
          <p>Aluno não está matriculado em nenhum curso.</p>
        ) : (
          <List>
            {studentCourses.map(stCourse => (
              <li key={stCourse.id}>
                {stCourse.nome}
                <button
                  onClick={() => handleDeleteCourse(stCourse)}
                  background-Color="#ee4747"
                  color="#fff"
                >
                  Desmatricular
                </button>
              </li>
            ))}
          </List>
        )}
      </Dashboard>
    </>
  );
};

export default Courses;