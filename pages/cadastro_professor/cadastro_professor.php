<?php

    require '../../classes/Model.php';
    
    class modelProfessor extends Model {
        public function __construct() {
            parent::__construct();
        }

        public function insertProfessorAndLinkToCurso($dataProfessor, $ids_cursos){
            $this->conn->beginTransaction();
            $insertProfessor = $this->insert('professores', $dataProfessor);

            if($insertProfessor['status'] == '201'){

                $id_professor = $this->conn->lastInsertId();
                // ids_cursos é um array, então tem vários ids de curso, e todos tem que ser registrados na tabela professor_curso com o id do professor
                foreach($ids_cursos as $id_curso) {
                    $insertProfessorCurso = $this->insert('professores_cursos', array('id_professor' => $id_professor, 'id_curso' => $id_curso));
                    if($insertProfessorCurso['status'] != 201){
                        $this->conn->rollBack();
                        return array('status' => 'Failed', 'message' => 'Houve alguma falha com o banco de dados!');
                    } // se houver algum erro, para o foreach e faz o rollback (não insere nada no banco)
                }
                $this->conn->commit();
                return array('status' => '201', 'message' => 'Cadastro relizado com sucesso!');

            } else {
                $this->conn->rollBack();
                return array('status' => 'Failed', 'message' => 'Houve alguma falha com o banco de dados!');
            }
        }

    }

    $model = new modelProfessor();
    $cursos = $_POST['cursos'];
    unset($_POST['cursos']);
    echo json_encode( $model->insertProfessorAndLinkToCurso($_POST, $cursos) );

?>