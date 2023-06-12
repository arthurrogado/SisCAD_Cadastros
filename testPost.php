<?php
    session_start();
    
    $nome = filter_input(INPUT_POST, 'nome', FILTER_DEFAULT);
    $_SESSION['nome'] = $nome;

    echo json_encode(array('nome' => $nome));

?>