<?php

    $registrar = filter_input(INPUT_POST, 'registrar');

    $nome = filter_input(INPUT_POST, 'nome');
    $descricao = filter_input(INPUT_POST, 'descricao');
    $coordenador = filter_input(INPUT_POST, 'coordenador');
    
    if(empty($nome) || empty($descricao) || empty($coordenador)) {
        $status = 'Failed';
    } else {
        try {
            //code...
            require('../../db/db.php');
            $reg = $conn->prepare("INSERT INTO cursos (nome, descricao, coordenador) VALUES (:nome, :descricao, :coordenador);");
            $reg->bindValue(':nome', $nome);
            $reg->bindValue(':descricao', $descricao);
            $reg->bindValue(':coordenador', $coordenador);
            if($reg->execute()) {
                $status = 'Success';
            } else {
                $status = 'Failed';
            }
        } catch (Error $error) {
            //throw $th;
            $status = $error;
        }
    }
    
    $response = array('status' => $status);
    echo json_encode($response);
    
?>