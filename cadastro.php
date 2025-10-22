<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $_SESSION['usuario'] = ['nome' => $_POST['nome'], 'email' => $_POST['email']];
  header('Location: painel.php'); exit;
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cadastro — Navalha de Ouro</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Cadastre-se</h1>
    <form method="post" id="form-cadastro">
      <label>Nome <input type="text" name="nome" required></label>
      <label>Sobrenome <input type="text" name="sobrenome" required></label>
      <label>Data de Nascimento <input type="date" name="nascimento" required></label>
      <label>Telefone <input type="tel" name="telefone" required></label>
      <label>E-mail <input type="email" name="email" required></label>
      <label>Senha <input type="password" name="senha" required minlength="8"></label>
      <label>Confirmar Senha <input type="password" name="senha_confirm" required minlength="8"></label>
      <button type="submit" class="botao-principal">Cadastrar</button>
    </form>
  </main>
</body>
</html>
