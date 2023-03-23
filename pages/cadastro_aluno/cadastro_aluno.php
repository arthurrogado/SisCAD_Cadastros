<?php

    $status = '';
    $message = '';
    
    $nome = filter_input(INPUT_POST, 'nome');
    if($nome) {
        require('../../db/db.php');

        $endereco = filter_input(INPUT_POST, 'endereco');
        $telefone = filter_input(INPUT_POST, 'telefone');
        $curso = filter_input(INPUT_POST, 'curso');
    
        $reg = $conn->prepare("INSERT INTO alunos (nome, endereco, telefone, curso) VALUES (:nome, :endereco, :telefone, :curso);");
        $reg->bindValue(':nome', $nome);
        $reg->bindValue(':endereco', $endereco);
        $reg->bindValue(':telefone', $telefone);
        $reg->bindValue(':curso', $curso);
        
        if($reg->execute()) {
            $status = '201';
            $message = 'Cadastro relizado com sucesso!';
        } else {
            $status = 'Failed';
            $message = 'Houve alguma falha com o banco de dados!';
        }
    } else {
        $status = '400';
        $message = 'Preciso pelo menos do nome, neh';
    }
    
    $response = array('status' => $status, 'message' => $message);
    echo json_encode($response);
?>