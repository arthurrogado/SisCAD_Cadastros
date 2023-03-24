<?php

    require('../../classes/Model.php');
    $listagemCursos = new Model();

    $listagemCursos->echoAll('alunos');

?>