<?php

    $registrar = filter_input(INPUT_POST, 'registrar');

    $nome = filter_input(INPUT_POST, 'nome');
    $descricao = filter_input(INPUT_POST, 'descricao');
    $coordenador = filter_input(INPUT_POST, 'coordenador');
    
    if(empty($nome) || empty($descricao) || empty($coordenador)) {
        $status = 'Failed';
    } else {
        require('../db.php');
        $reg = $conn->prepare("INSERT INTO cursos (nome, descricao, coordenador) VALUES (:nome, :descricao, :coordenador);");
        $reg->bindValue(':nome', $nome);
        $reg->bindValue(':descricao', $descricao);
        $reg->bindValue(':coordenador', $coordenador);
        if($reg->execute()) {
            $status = 'Success';
        } else {
            $status = 'Failed';
        }
    }
    
    
    $response = array('status' => $status);
    echo json_encode($response);
    
?>