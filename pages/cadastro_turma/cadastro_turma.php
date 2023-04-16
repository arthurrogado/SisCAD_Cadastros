<?php

    //echo json_encode($_POST);

    require '../../classes/Model.php';

    $cadastroTurma = new Model();
    $cadastroTurma->insertEcho('turmas', $_POST);

?>