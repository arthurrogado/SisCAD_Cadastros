<?php


    require('../../classes/Model.php');
    $cadastroDisciplina = new Model();

    $nome = filter_input(INPUT_POST, 'nome');

    if(empty($nome)) {
        $cadastroDisciplina->echoError('Preencha o campo nome pelo menos né!');
    } else {
        $cadastroDisciplina->insert('disciplinas', $_POST);
    }
    
?>