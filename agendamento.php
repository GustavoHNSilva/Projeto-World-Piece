<?php
session_start();
$servicos = [
  'corte' => ['nome' => 'Corte Masculino', 'preco' => '60.00'],
  'barba' => ['nome' => 'Barba', 'preco' => '40.00'],
  'combo' => ['nome' => 'Corte + Barba', 'preco' => '90.00']
];
$profissionais = ['João Silva', 'Marcos Alves'];

if (
  $_SERVER['REQUEST_METHOD'] === 'POST' &&
  isset($_POST['servico'], $_POST['profissional'], $_POST['data'], $_POST['horario'])
) {
  $ag = [
    'servico' => $_POST['servico'],
    'profissional' => $_POST['profissional'],
    'data' => $_POST['data'],
    'horario' => $_POST['horario'],
    'usuario' => isset($_SESSION['usuario']) ? $_SESSION['usuario'] : 'Convidado'
  ];
  if (!isset($_SESSION['agendamentos'])) $_SESSION['agendamentos'] = [];
  $_SESSION['agendamentos'][] = $ag;
  $mensagem_confirm = "Agendamento confirmado para {$ag['data']} às {$ag['horario']}";
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Agendamento — Navalha de Ouro</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header container header-inner">
    <a href="index.html" class="logo"><img src="img/logo.png" alt="Navalha de Ouro"></a>
    <nav class="nav">
      <a href="index.html">Home</a>
      <a href="servicos.html">Serviços</a>
      <a href="contato.html">Contato</a>
    </nav>
  </header>

  <main class="container">
    <h1>Agende seu horário</h1>

    <?php if (!empty($mensagem_confirm)): ?>
      <div class="alert sucesso"><?php echo htmlspecialchars($mensagem_confirm); ?></div>
    <?php endif; ?>

    <form method="post" id="form-agendamento">
      <label>Serviço
        <select name="servico" required>
          <?php foreach ($servicos as $key => $s): ?>
            <option value="<?php echo $key; ?>"><?php echo htmlspecialchars($s['nome']); ?> — R$ <?php echo $s['preco']; ?></option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>Profissional
        <select name="profissional" required>
          <?php foreach ($profissionais as $p): ?>
            <option value="<?php echo htmlspecialchars($p); ?>"><?php echo htmlspecialchars($p); ?></option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>Data
        <input type="date" name="data" required min="<?php echo date('Y-m-d'); ?>">
      </label>

      <label>Horário
        <input type="time" name="horario" required>
      </label>

      <?php if (!isset($_SESSION['usuario'])): ?>
        <p>Para confirmar, por favor <a href="login.php">Login / Cadastrar</a>.</p>
      <?php endif; ?>

      <button type="submit" class="botao-principal">Confirmar agendamento</button>
    </form>
  </main>

  <footer class="site-footer container">© <?php echo date('Y'); ?> Navalha de Ouro</footer>

  <script src="js/main.js"></script>
</body>
</html>
