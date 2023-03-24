<?php

    require('../../classes/Model.php');
    $listagemCursos = new Model();

    $listagemCursos->echoAll('cursos');

    // código velho

/*     require('../../db/db.php');

    $query = $conn->prepare("SELECT * FROM cursos;");
    $query->execute();
    $cursos = $query->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($cursos) */

?>