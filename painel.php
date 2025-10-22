<?php
session_start();
if (!isset($_SESSION['usuario'])) {
  header('Location: login.php'); exit;
}
$usuario = $_SESSION['usuario'];
$agendamentos = isset($_SESSION['agendamentos']) ? $_SESSION['agendamentos'] : [];
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Painel — Navalha de Ouro</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Olá, <?php echo htmlspecialchars($usuario['nome']); ?></h1>
    <a href="logout.php" class="botao-secundario">Sair</a>
    <h2>Meus agendamentos</h2>
    <?php if (empty($agendamentos)): ?>
      <p>Você não tem agendamentos.</p>
    <?php else: ?>
      <ul class="lista-agendamentos">
        <?php foreach ($agendamentos as $a): ?>
          <li><?php echo htmlspecialchars($a['servico']) . ' — ' . htmlspecialchars($a['data']) . ' ' . htmlspecialchars($a['horario']); ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </main>
</body>
</html>
