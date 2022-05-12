import React, {
    ChangeEvent,
    FormEvent,
    SetStateAction,
    useEffect,
    useState
} from 'react';

import { api } from '@/services/api';

import {
    CepInput,
    Close,
    Container,
    Form,
    Input,
    Label,
    ModalTitle,
    Register,
    UserModal
} from './styles';

import { toast } from 'react-toastify';

interface ModalProps {
    edit: boolean;
    currentEdit: Student;
    attStudents: (student: Student, isEditing: boolean) => void;
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    setModal: React.Dispatch<SetStateAction<boolean>>;
    students: Student[];
}

const Modal = ({
    edit,
    currentEdit,
    attStudents,
    setModal,
    setEdit,
    students
}: ModalProps) => {
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cep, setCep] = useState<string>('');

    useEffect(() => {
        if (!edit) {
            setNome('');
            setEmail('');
            setCep('');
        } else {
            setNome(currentEdit.nome);
            setEmail(currentEdit.email);
            setCep(currentEdit.cep);
        }
    }, [edit, currentEdit]);

    const toastError = (message: string) => {
        toast.error(message, {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
        });
    };

    const toastSuccess = (message: string) => {
        toast.success(message, {
            autoClose: 2000
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cepFormatted = cep.replace(/[^0-9]/g, '');
        if (nome === '' || email === '' || cepFormatted.length !== 8) {
            return toastError('Peencha todos os campos!');
        }

        let cidade: string;
        let estado: string;
        await fetch(`https://viacep.com.br/ws/${cepFormatted}/json/`)
            .then(res => res.json())
            .then(data => {
                (cidade = data.localidade), (estado = data.uf);
            });
        if (!estado && !cidade) {
            return toastError('CEP Inválido');
        }

        const values = { nome, email, cep, estado, cidade };

        if (!edit) {
            if (students.some(st => st.email === email)) {
                return toastError('Email já cadastrado!');
            }
            await api.post('/alunos', values).then(res => {
                attStudents(res.data, false);
            });
        } else {
            await api.put(`/alunos/${currentEdit.id}`, values).then(res => {
                attStudents(res.data, true);
            });
        }

        toastSuccess(`Aluno ${!edit ? 'cadastrado' : 'editado'} com sucesso!`);
        setModal(false);
        setEdit(false);
    };

    return (
        <UserModal>
            <Container>
                <Close
                    onClick={() => {
                        setModal(false), setEdit(false);
                    }}
                >
                    ❌
                </Close>
                <ModalTitle>{!edit ? 'Adicionar aluno' : 'Editar aluno'}</ModalTitle>
                <Form onSubmit={handleSubmit}>
                    <Label>
                        Nome:
                        <Input
                            type="text"
                            placeholder="xxxxxx"
                            value={nome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setNome(e.target.value)
                            }
                        />
                    </Label>
                    <Label>
                        Email:
                        <Input
                            type="email"
                            placeholder="exemplo@gmail.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />
                    </Label>

                    <Label>
                        CEP:
                        <CepInput
                            mask="99999-999"
                            type="text"
                            placeholder="00000-000"
                            value={cep}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCep(e.target.value)
                            }
                        />
                    </Label>
                    <Register>{!edit ? 'Cadastrar' : 'Atualizar'}</Register>
                </Form>
            </Container>
        </UserModal>
    );
};

export default Modal;