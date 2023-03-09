<?php

    require('../../php/db.php');

    $query = $conn->prepare("SELECT nome, descricao, coordenador FROM cursos;");
    $query->execute();
    $cursos = $query->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($cursos)

?>