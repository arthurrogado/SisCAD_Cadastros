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
            $keys = array_keys($data); // captura as chaves do array
            // faz o campo fields em string para query do banco de dados
            $fields = implode(',', $keys);

            // para fazer o ':teste' do bindValues
            $binders = ':' . implode(',:', $keys); // coloca o 1º ':' e depois no meio

            $sql = "INSERT INTO $table ($fields) VALUES ($binders);";
            $query = $this->conn->prepare($sql);
            foreach ($data as $key => $value) {
                $query->bindValue(":$key", $value);
            }
            if($query->execute()){
                $status = '201';
                $message = 'Cadastro relizado com sucesso!';
            } else {
                $status = 'Failed';
                $message = 'Houve alguma falha com o banco de dados!';
            }

            return array('status' => $status, 'message' => $message);
        }

        public function insertEcho($table, $data) {
            echo json_encode($this->insert($table, $data));
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

    }

?>