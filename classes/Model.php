<?php

    class Model
    {
        protected $conn;

        //Construtor database
        public function __construct() {
            require(dirname(__DIR__).'/db/db.php');
            $this->conn = $conn;
        }

        // INSERÇÃO NO BANCO: qual tabela e o array de dados para inserir
        public function insert($table, $data) {
            $data = json_decode($data, true); // tranform json em array
            $keys = array_keys($data); // captura as chaves do array
            // faz o campo fields em string para query do banco de dados
            $fields = implode(',', $keys);

            // para fazer o ':teste' do bindValues
            $binders = ':' . implode(',:', $keys); // coloca o 1º ':' e depois no meio

            $sql = "INSERT INTO $table ($fields) VALUES ($binders);";
            $query = $this->conn->prepare($sql);
            foreach ($data as $key => $value) {
                if(is_array($value)) {
                    $value = implode(',', $value);
                }
                $query->bindValue(":$key", $value);
            }
            if($query->execute()){
                $status = '201';
                $message = 'Cadastro relizado com sucesso!';
                $idFromInsert = $this->conn->lastInsertId();
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }

            return array('status' => $status, 'message' => $message);
        }

        public function insertEcho($table, $data) {
            echo json_encode($this->insert($table, $data));
        }

        public function insertAndLinkToNxNTable($mainTable, $mainData, array $otherLinks){
            $this->conn->beginTransaction();
            $mainInsert = $this->insert($mainTable, $mainData);
            
            // Check if the main insert was successful
            if($mainInsert['status'] == '201'){
                $idMainInsert = $this->conn->lastInsertId();
                
                // Exemples of other links data
                /* $otherLink1 = array(
                    'otherTable' => $otherTable,
                    'idsOtherTable' => $idsOtherTable,
                    'otherTableMainColumn' => $otherTableMainColumn,
                    'otherTableOtherColumn' => $otherTableOtherColumn
                );
                $otherLink2 = array(
                    'otherTable' => $otherTable,
                    'idsOtherTable' => $idsOtherTable,
                    'otherTableMainColumn' => $otherTableMainColumn,
                    'otherTableOtherColumn' => $otherTableOtherColumn
                );
                $otherLinks = [$otherLink1, $otherLink2]; */

                foreach($otherLinks as $otherLink) {

                    $otherTable = $otherLink['otherTable'];
                    $idsOtherTable = $otherLink['idsOtherTable'];
                    $otherTableMainColumn = $otherLink['otherTableMainColumn'];
                    $otherTableOtherColumn = $otherLink['otherTableOtherColumn'];
                    
                    foreach ($idsOtherTable as $idOtherTable) {
                        // Data to insert in the other table
                        // Exemple: professor(main) and professores_cursos(other)
                        $otherData = array(
                            $otherTableMainColumn => $idMainInsert,
                            $otherTableOtherColumn => $idOtherTable
                        );
                        $otherInsert = $this->insert($otherTable, $otherData);
                        if($otherInsert['status'] != '201') {
                            $this->conn->rollBack();
                            return array('status' => 'Failed', 'message' => 'Houve alguma falha com o banco de dados!');
                        } // if there is an error, do a rollback (don't insert anything in the database)
                    }
                    
                }
                

                $this->conn->commit();
                return array('status' => '201', 'message' => 'Cadastro relizado com sucesso!');
            }
            else {
                $this->conn->rollBack();
                return array('status' => 'Failed', 'message' => 'Houve alguma falha com o banco de dados!');
            }

        }

        public function echoError($message) {
            echo json_encode(array('status' => 'Failed', 'message' => $message));
        }

        public function getAll($table) {
            $sql = "SELECT * FROM $table;";
            $query = $this->conn->prepare($sql);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }

        public function echoAll($table) {
            echo json_encode($this->getAll($table));
        }

        public function getDataById($table, $id) {
            $sql = "SELECT * FROM $table WHERE id = :id;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':id', $id);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_OBJ);
            return $result;
        }
        public function echoDataById($table, $id) {
            echo json_encode($this->getDataById($table, $id));
        }

        /* 'otherTable': otherTable,
                'relationTable': relationTable,
                'relationTableMainColumn': relationTableMainColumn,
                'mainId': mainId,
                'relationTableOtherColumn': relationTableOtherColumn */
        public function getDataFromRelation($otherTable, $relationTable, $relationTableMainColumn, $mainId, $relationTableOtherColumn) {
            $sql = "SELECT * FROM $otherTable WHERE id IN (SELECT $relationTableOtherColumn FROM $relationTable WHERE $relationTableMainColumn = :mainId);";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':mainId', $mainId);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }
        public function echoDataFromRelation($otherTable, $relationTable, $relationTableMainColumn, $mainId, $relationTableOtherColumn) {
            echo json_encode($this->getDataFromRelation($otherTable, $relationTable, $relationTableMainColumn, $mainId, $relationTableOtherColumn));
        }

        public function getDataNotLinked($otherTable, $relationTable, $relationTableMainColumn, $relationTableOtherColumn, $mainId) {
            $sql = "SELECT * FROM $otherTable WHERE id NOT IN (SELECT $relationTableOtherColumn FROM $relationTable WHERE $relationTableMainColumn = :mainId);";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':mainId', $mainId);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }
        public function echoDataNotLinked($otherTable, $relationTable, $relationTableMainColumn, $relationTableOtherColumn, $mainId) {
            echo json_encode($this->getDataNotLinked($otherTable, $relationTable, $relationTableMainColumn, $relationTableOtherColumn, $mainId));
        }

        public function deleteDataById($table, $id) {
            $sql = "DELETE FROM $table WHERE id = :id;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':id', $id);
            if($query->execute()){
                $status = '201';
                $message = 'Cadastro deletado com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }

            return array('status' => $status, 'message' => $message);
        }
        public function echoDeleteDataById($table, $id) {
            echo json_encode($this->deleteDataById($table, $id));
        }

        public function deleteDataFromRelation($table, $mainColumn, $otherColumn, $mainId, $otherId) {
            $sql = "DELETE FROM $table WHERE $mainColumn = :mainId AND $otherColumn = :otherId;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':mainId', $mainId);
            $query->bindValue(':otherId', $otherId);
            if($query->execute()){
                $status = '201';
                $message = 'Registro deletado com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }

            return array('status' => $status, 'message' => $message);
        }

        public function getDataByTable($table) {
            $sql = "SELECT * FROM $table;";
            $query = $this->conn->prepare($sql);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }
        public function echoDataByTable($table) {
            echo json_encode($this->getDataByTable($table));
        }

        public function executeQuery($query) {
            $query = $this->conn->prepare($query);
            if($query->execute()){
                $status = '201';
                $message = 'Query com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }

            return array('status' => $status, 'message' => $message);
        }
        public function echoExecuteQuery($query) {
            echo json_encode($this->executeQuery($query));
        }

        public function getTurmasFromProfessor($idProfessor) {
            $sql = "SELECT turmas.* FROM turmas INNER JOIN professores_turmas ON turmas.id = professores_turmas.id_turma WHERE professores_turmas.id_professor = :idProfessor;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':idProfessor', $idProfessor);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }
        public function echoTurmasFromProfessor($idProfessor) {
            echo json_encode($this->getTurmasFromProfessor($idProfessor));
        }

        public function vincularProfessorTurma($idProfessor, $idTurma) {
            $sql = "INSERT INTO professores_turmas (id_professor, id_turma) VALUES (:idProfessor, :idTurma);";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':idProfessor', $idProfessor);
            $query->bindValue(':idTurma', $idTurma);
            if($query->execute()){
                $status = '201';
                $message = 'Cadastro relizado com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }
            echo json_encode( array('status' => $status, 'message' => $message) );
        }

        public function desvincularProfessorTurma($idProfessor, $idTurma) {
            $sql = "DELETE FROM professores_turmas WHERE id_professor = :idProfessor AND id_turma = :idTurma;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':idProfessor', $idProfessor);
            $query->bindValue(':idTurma', $idTurma);
            if($query->execute()){
                $status = '201';
                $message = 'Desvínculo ocorrido com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }
            echo json_encode( array('status' => $status, 'message' => $message) );
        }

    }

?>