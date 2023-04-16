<?php

    require '../../classes/Model.php';

    $cadastroCurso = new Model();
    $cadastroCurso->insertEcho('cursos', $_POST);

?>