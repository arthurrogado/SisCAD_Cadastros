<?php

    session_start();
    
    $nome = $_SESSION['nome'];

    echo json_encode(array('nome' => $nome));

?>