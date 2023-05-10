<?php

    require '../classes/Model.php';

    $api = new Model();

    if($_POST['action']) {

        $action = filter_input(INPUT_POST, 'action', FILTER_DEFAULT);        
        $table = filter_input(INPUT_POST, 'table', FILTER_DEFAULT);
        $data = filter_input(INPUT_POST, 'data', FILTER_DEFAULT);
        $data = json_decode($data);

        switch ($action) {
            case 'insert':
                $api->insertEcho($table, $data);
                break;

            case 'echoAll':
                $api->echoAll($table);
                break;

            case 'echoDataById':
                $api->echoDataById($data->table, $data->id);
                break;

            case 'echoTurmasFromProfessor':
                //$data = json_decode($data);
                $api->echoTurmasFromProfessor($data->id);
                break;

            case 'vincularProfessorTurma':
                $api->vincularProfessorTurma($data->id_professor, $data->id_turma);
                break;

            case 'desvincularProfessorTurma':
                $api->desvincularProfessorTurma($data->id_professor, $data->id_turma);
                break;
                        
            default:
                # code...
                break;
        }
        
    }

?>