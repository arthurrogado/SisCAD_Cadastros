<?php

    require '../../classes/Model.php';

    $cadastroTurma = new Model();
    $cadastroTurma->insertEcho('turmas', $_POST);

?>