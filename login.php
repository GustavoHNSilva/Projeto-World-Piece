<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'], $_POST['senha'])) {
  $_SESSION['usuario'] = ['nome' => 'Cliente Teste', 'email' => $_POST['email']];
  header('Location: painel.php'); exit;
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login — Navalha de Ouro</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Login</h1>
    <form method="post">
      <label>E-mail <input type="email" name="email" required></label>
      <label>Senha <input type="password" name="senha" required></label>
      <button type="submit" class="botao-principal">Entrar</button>
    </form>
    <p>Não tem conta? <a href="cadastro.php">Cadastre-se</a></p>
  </main>
</body>
</html>
