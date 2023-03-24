<?php

    require('../../classes/Model.php');
    $cadastroAluno = new Model();
    $body = $_POST;
    
    $response = $cadastroAluno->insert('alunos', $body);
    echo json_encode($response);
    
    /* $response = array('status' => $status, 'message' => $message);
    echo json_encode($response); */
?>