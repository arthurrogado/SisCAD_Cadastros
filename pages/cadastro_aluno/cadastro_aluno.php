<?php

    require('../../classes/Model.php');
    $cadastroAluno = new Model();    
    $cadastroAluno->insertEcho('alunos', $_POST);    
?>