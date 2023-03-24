<?php

    require('../../classes/Model.php');
    $cadastroAluno = new Model();
    $body = $_POST;
    
    $cadastroAluno->insertEcho('alunos', $body);    
?>