<?php

    require('../../classes/Model.php');

    $listagemTurmas = new Model();

    $listagemTurmas->echoAll('turmas');

?>