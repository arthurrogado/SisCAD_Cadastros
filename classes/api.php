<?php

    require '../classes/Model.php';

    $api = new Model();
    
    $data = filter_input(INPUT_POST, 'data', FILTER_DEFAULT);
    if($data) {

        /* $action = filter_input(INPUT_POST, 'action', FILTER_DEFAULT);        
        $table = filter_input(INPUT_POST, 'table', FILTER_DEFAULT); */
        $data = json_decode($data);

        switch ($data->action) {

            case 'verifyLogin':
                $api->echoVerifyLogin();
                break;

            case 'login':
                $api->echoLogin($data->user, $data->password, $data->type);
                break;

            case 'logout':
                $api->echoLogout();
                break;

            case 'getCurrentUser':
                $api->echoCurrentUser();
                break;

            case 'insert':
                $api->insertEcho($data->table, $data->data);
                break;

            case 'lancarNotaAluno':
                $api->echoLancarNotaAluno($data->id_aluno, $data->id_turma, $data->avaliacao1, $data->avaliacao2, $data->avaliacao3, $data->frequencia);
                break;

            case 'getNotasAluno':
                $api->echoGetNotasAluno($data->id_aluno, $data->id_turma);
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

            case 'getDataByQuery':
                $api->echoExecuteQuery($data->query);
                break;
            
            case 'getDataFromRelation':
                $otherTable = $data->otherTable;
                $relationTable = $data->relationTable;
                $relationTableMainColumn = $data->relationTableMainColumn;
                $mainId = $data->mainId;
                $relationTableOtherColumn = $data->relationTableOtherColumn;

                $api->echoDataFromRelation($otherTable, $relationTable, $relationTableMainColumn, $mainId, $relationTableOtherColumn);
                break;
            
            case 'getDataNotLinked':
                $otherTable = $data->otherTable;
                $relationTable = $data->relationTable;
                $relationTableMainColumn = $data->relationTableMainColumn;
                $relationTableOtherColumn = $data->relationTableOtherColumn;
                $mainId = $data->mainId;

                $api->echoDataNotLinked($otherTable, $relationTable, $relationTableMainColumn, $relationTableOtherColumn, $mainId);
                break;
            
            case 'deleteDataById':
                $api->echoDeleteDataById($data->table, $data->id);
                break;

            /*case 'updateRelationData':
                $otherTable = $data->otherTable;
                $relationTable = $data->relationTable;
                $relationTableMainColumn = $data->relationTableMainColumn;
                $relationTableOtherColumn = $data->relationTableOtherColumn;
                $mainId = $data->mainId;
                $otherId = $data->otherId;

                $api->echoUpdateRelationData($otherTable, $relationTable, $relationTableMainColumn, $relationTableOtherColumn, $mainId, $otherId);
                break; */

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