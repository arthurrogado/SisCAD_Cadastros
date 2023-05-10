<?php

    require '../../classes/Model.php';

    $cadastroTurma = new Model();
    $idsDisciplinas = $_POST['id_disciplinas'];
    unset($_POST['id_disciplinas']);

    $otherLinks = [];

    $linkToDisciplinas = array(
        'otherTable' => 'turmas_disciplinas',
        'idsOtherTable' => $idsDisciplinas,
        'otherTableMainColumn' => 'id_turma',
        'otherTableOtherColumn' => 'id_disciplina'
    );

    

    array_push($otherLinks, $linkToDisciplinas);

    echo json_encode( $cadastroTurma->insertAndLinkToNxNTable('turmas', $_POST, $otherLinks) );

?>