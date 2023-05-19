<?php

    require '../classes/Model.php';

    $api = new Model();
    
    $data = filter_input(INPUT_POST, 'data', FILTER_DEFAULT);
    if($data) {

        /* $action = filter_input(INPUT_POST, 'action', FILTER_DEFAULT);        
        $table = filter_input(INPUT_POST, 'table', FILTER_DEFAULT); */
        $data = json_decode($data);

        switch ($data->action) {
            case 'insert':
                $api->insertEcho($table, $data);
                break;

            case 'echoAll':
                $api->echoAll($data->table);
                break;

            case 'getDataById':
                $api->echoDataById($data->table, $data->id);
                break;

            case 'getDataByTable':
                $api->echoDataByTable($data->table);
                break;
            
            case 'getDataFromRelation':
                $otherTable = $data->otherTable;
                $relationTable = $data->relationTable;
                $relationTableMainColumn = $data->relationTableMainColumn;
                $mainId = $data->mainId;
                $relationTableOtherColumn = $data->relationTableOtherColumn;

                $api->echoDataFromRelation($otherTable, $relationTable, $relationTableMainColumn, $mainId, $relationTableOtherColumn);
                break;
            
            case 'deleteById':
                $api->echoDeleteDataById($data->table, $data->id);
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
                echo json_encode(array('status' => 'Failed', 'message' => "Acao '$data->action' nao encontrada!"));
                break;
        }
        
    }

?>