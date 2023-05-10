<?php

    require('../../classes/Model.php');
    $visualizarProfessor = new Model();
    
    echo json_encode($visualizarProfessor->getDataById($_POST['table'], $_POST['id']));

?>