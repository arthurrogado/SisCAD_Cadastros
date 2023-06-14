<?php

    session_start();
    
    class Model
    {
        protected $conn;

        //Construtor database
        public function __construct() {
            require(dirname(__DIR__).'/db/db.php');
            $this->conn = $conn;
        }

        // get user id from table
        public function getIdFromUser($table, $user) {
            $query = "SELECT id FROM $table WHERE usuario = '$user'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['id'];
        }

        //Verifica se o usuário está logado
        public function verifyLogin() {
            if(!isset($_SESSION['user'])) {
                $status = 'Failed';
                $ok = false;
                $message = 'Você não está logado!';
            } else {
                $status = '200';
                $ok = true;
                $message = 'Você está logado!';
            }
            return array('status' => $status, 'ok' => $ok, 'message' => $message);
        }
        public function echoVerifyLogin() {
            echo json_encode($this->verifyLogin());
        }

        // Do login
        public function oldLogin($user, $password, $type = 'admin') {
            // $type can be: aluno, professor, rh, secretaria, admin
            if($user == 'admin' && $password == 'admin') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
            } else if ($user == 'lynwood' && $password == 'professor') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
                $_SESSION['user_id'] = $this->getIdFromUser('professores', $user);
            } else if ($user == 'aluno' && $password == 'aluno') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
            } else if($user == 'secretaria' && $password == 'secretaria') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
            } else if($user == 'rh' && $password == 'rh') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
            } else {
                $status = 'Failed';
                $ok = false;
                $message = 'Usuário ou senha incorretos!';
            }
            return array('status' => $status, 'ok' => $ok, 'message' => $message);
        }
        public function login($user, $password, $type) {
            if(in_array($type, ['professores', 'alunos', 'secretaria', 'rh']) ) {
                // get password hash from database by user
                $sql = "SELECT senha FROM $type WHERE usuario = '$user'";
                $query = $this->conn->prepare($sql);
                if($query->execute()) {
                    $result = $query->fetch(PDO::FETCH_OBJ);
                    $hash = $result->senha;
                    // verify password
                    if(password_verify($password, $hash)) {
                        $status = '200';
                        $ok = true;
                        $message = 'Login realizado com sucesso!';
                        $_SESSION['user'] = $user;
                        $_SESSION['type'] = $type;
                        $_SESSION['user_id'] = $this->getIdFromUser($type, $user);
                    } else {
                        $status = 'Failed';
                        $ok = false;
                        $message = 'Usuário ou senha incorretos!';
                    }
                    return array('status' => $status, 'ok' => $ok, 'message' => $message);
                } else {
                    $status = 'Failed';
                    $ok = false;
                    $message = 'Erro ao executar a query!';
                    return array('status' => $status, 'ok' => $ok, 'message' => $message);
                }
            }


            if($user == 'admin' && $password == 'admin') {
                $status = '200';
                $ok = true;
                $message = 'Login realizado com sucesso!';
                $_SESSION['user'] = $user;
                $_SESSION['type'] = $type;
                $_SESSION['user_id'] = 1;
                return array('status' => $status, 'ok' => $ok, 'message' => $message);
            }
        }
        public function echoLogin($user, $password, $type = 'admin') {
            echo json_encode($this->login($user, $password, $type));
        }

        // Do logout
        public function logout() {
            session_destroy();
            $status = '200';
            $ok = true;
            $message = 'Logout realizado com sucesso!';
            return array('status' => $status, 'ok' => $ok, 'message' => $message);
        }
        public function echoLogout() {
            echo json_encode($this->logout());
        }

        // Get type of user
        public function getCurrentUser() {
            if(isset($_SESSION['user'])) {
                $status = '200';
                $ok = true;
                $message = 'Tipo de usuário encontrado!';
                $user = array(
                    'user' => $_SESSION['user'],
                    'type' => $_SESSION['type'],
                    'user_id' => $_SESSION['user_id']
                );
            } else {
                $status = 'Failed';
                $ok = false;
                $message = 'Tipo de usuário não encontrado!';
                $type = '';
            }
            return array('status' => $status, 'ok' => $ok, 'message' => $message, 'user' => $user);
        }
        public function echoCurrentUser() {
            echo json_encode($this->getCurrentUser());
        }

        public function lancarNotaAluno($id_aluno, $id_turma, $avaliacao1, $avaliacao2, $avaliacao3, $frequencia) {
            $sql = "UPDATE alunos_turmas SET avaliacao1 = :avaliacao1, avaliacao2 = :avaliacao2, avaliacao3 = :avaliacao3, frequencia = :frequencia WHERE id_aluno = :id_aluno AND id_turma = :turma;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':id_aluno', $id_aluno);
            $query->bindValue(':turma', $id_turma);
            $query->bindValue(':avaliacao1', $avaliacao1);
            $query->bindValue(':avaliacao2', $avaliacao2);
            $query->bindValue(':avaliacao3', $avaliacao3);
            $query->bindValue(':frequencia', $frequencia);
            if($query->execute()) {
                $status = '201';
                $ok = true;
                $message = 'Nota lançada com sucesso!';
            } else {
                $status = 'Failed';
                $ok = false;
                $message = 'Houve algum erro ao lançar a nota!';
            }
            return array('status' => $status, 'ok' => $ok, 'message' => $message);
        }
        public function echoLancarNotaAluno($id_aluno, $id_turma, $avaliacao1, $avaliacao2, $avaliacao3, $frequencia) {
            echo json_encode($this->lancarNotaAluno($id_aluno, $id_turma, $avaliacao1, $avaliacao2, $avaliacao3, $frequencia));
        }

        // Get the grades and frequency of a student
        public function getNotasAluno($id_aluno, $id_turma) {
            $sql = "SELECT * FROM alunos_turmas WHERE id_aluno = :id_aluno AND id_turma = :id_turma;";
            $query = $this->conn->prepare($sql);
            $query->bindValue(':id_aluno', $id_aluno);
            $query->bindValue(':id_turma', $id_turma);
            if($query->execute()) {
                $status = '200';
                $ok = true;
                $message = 'Notas encontradas!';
                $notas = $query->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $status = 'Failed';
                $ok = false;
                $message = 'Houve algum erro ao buscar as notas!';
                $notas = array();
            }
            return array('status' => $status, 'ok' => $ok, 'message' => $message, 'notas' => $notas);
        }
        public function echoGetNotasAluno($id_aluno, $id_turma) {
            echo json_encode($this->getNotasAluno($id_aluno, $id_turma));
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

        public function updateAvaliacoesEFrequencias($id_aluno, $id_turma, $data){
            
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