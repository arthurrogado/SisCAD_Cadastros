<?php

    $nome = filter_input(INPUT_POST, 'nome');

    if(empty($nome)) {
        $status = 'Failed';
    } else {
        require('../../db/db.php');

        $carga_horaria = filter_input(INPUT_POST, 'carga_horaria');
        $ementa = filter_input(INPUT_POST, 'ementa');
        $bibliografia = filter_input(INPUT_POST, 'bibliografia');
        $pre_requisito = filter_input(INPUT_POST, 'pre_requisito');

        $reg = $conn->prepare("INSERT INTO disciplinas (nome, carga_horaria, ementa, bibliografia, pre_requisito) VALUES (:nome, :carga_horaria, :ementa, :bibliografia, :pre_requisito);");
        $reg->bindValue(':nome', $nome);
        $reg->bindValue(':carga_horaria', $carga_horaria);
        $reg->bindValue(':ementa', $ementa);
        $reg->bindValue(':bibliografia', $bibliografia);
        $reg->bindValue(':pre_requisito', $pre_requisito);
        if($reg->execute()) {
            $status = '201';
            $message = 'Cadastro relizado com sucesso!';
        } else {
            $status = 'Failed';
            $message = 'Houve alguma falha com o banco de dados!';
        }
    }
    
    
    $response = array('status' => $status, 'message' => $message);
    echo json_encode($response);
    
?>