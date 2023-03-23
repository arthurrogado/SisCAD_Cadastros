<?php

    require('../../db/db.php');

    $query = $conn->prepare("SELECT * FROM cursos;");
    $query->execute();
    $cursos = $query->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($cursos)

?>