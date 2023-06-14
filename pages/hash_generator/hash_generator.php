<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <form method="POST">
        <label for="senha">Digite a senha para ter o hash</label>
        <input id="senha" type="text" name="password">
        <input type="submit" value="Gerar hash" name='generate'>
    </form>

    <p>----------------------------------------------</p>

    <form method="POST">
        <label for="senha">Digite a senha para verificar o hash</label>
        <input id="senha" type="text" name="password">
        <label for="hash">Digite o hash</label>
        <input id="hash" type="text" name="hash">
        <input type="submit" value="Verificar hash" name='verify'>
    </form>
    
</body>
</html>

<?php
    if(isset($_POST['generate'])) {
        if(isset($_POST['password'])){
            echo password_hash($_POST['password'], PASSWORD_DEFAULT);
        }
    }

    if(isset($_POST['verify'])) {
        if(isset($_POST['password']) && isset($_POST['hash'])){
            echo password_verify($_POST['password'], $_POST['hash']);
        }
    }
?>