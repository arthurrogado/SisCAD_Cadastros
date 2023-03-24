<?php

    require('../../db/db.php');
    require('../../classes/Model.php');
    
    $listagem = new Model();
    $listagem->echoAll('disciplinas');

?>