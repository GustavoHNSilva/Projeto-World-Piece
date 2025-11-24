// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar anos no footer
    atualizarAnosFooter();
    
    // Inicializar menu mobile
    inicializarMenuMobile();
    
    // Inicializar formulários
    inicializarFormularios();
    
    // Adicionar animações de entrada
    adicionarAnimações();
    
    // Inicializar funcionalidades específicas da página
    inicializarPaginaEspecifica();
    
    // CORREÇÃO: Garantir que o header ocupe toda a largura
    corrigirHeaderLargura();
});

// CORREÇÃO: Garantir que o header ocupe toda a largura
function corrigirHeaderLargura() {
    const header = document.querySelector('.site-header');
    if (header) {
        header.style.width = '100%';
    }
}

// Atualizar anos no footer
function atualizarAnosFooter() {
    const anoAtual = new Date().getFullYear();
    const elementosAno = document.querySelectorAll('#ano2, #ano3, #ano4');
    
    elementosAno.forEach(elemento => {
        elemento.textContent = anoAtual;
    });
}

// Menu mobile
function inicializarMenuMobile() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Alterar ícone do botão
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.textContent = '☰';
            });
        });
    }
}

// Inicializar formulários
function inicializarFormularios() {
    // Formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', validarFormContato);
    }
    
    // Formulário de cadastro
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', validarFormCadastro);
    }
    
    // Formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', validarFormAgendamento);
        
        // Preencher serviço selecionado se vier por parâmetro
        preencherServicoSelecionado();
    }
}

// Validar formulário de contato
function validarFormContato(e) {
    e.preventDefault();
    
    const form = e.target;
    const dados = new FormData(form);
    
    // Validação básica
    if (!dados.get('nome') || !dados.get('email') || !dados.get('mensagem')) {
        mostrarAlerta('Por favor, preencha todos os campos.', 'erro');
        return;
    }
    
    // Simular envio
    mostrarAlerta('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
    form.reset();
}

// Validar formulário de cadastro
function validarFormCadastro(e) {
    e.preventDefault();
    
    const form = e.target;
    const senha = form.querySelector('input[name="senha"]').value;
    const senhaConfirm = form.querySelector('input[name="senha_confirm"]').value;
    
    // Verificar se as senhas coincidem
    if (senha !== senhaConfirm) {
        mostrarAlerta('As senhas não coincidem. Por favor, verifique.', 'erro');
        return;
    }
    
    // Verificar força da senha
    if (senha.length < 8) {
        mostrarAlerta('A senha deve ter pelo menos 8 caracteres.', 'erro');
        return;
    }
    
    // Se passar na validação, o formulário será enviado
    mostrarAlerta('Cadastro realizado com sucesso!', 'sucesso');
}

// Validar formulário de agendamento
function validarFormAgendamento(e) {
    const form = e.target;
    const data = form.querySelector('input[name="data"]').value;
    const horario = form.querySelector('input[name="horario"]').value;
    
    // Verificar se a data é futura
    const dataSelecionada = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataSelecionada < hoje) {
        e.preventDefault();
        mostrarAlerta('Por favor, selecione uma data futura.', 'erro');
        return;
    }
    
    // Verificar horário de funcionamento (exemplo: 8h às 20h)
    const hora = parseInt(horario.split(':')[0]);
    if (hora < 8 || hora > 20) {
        e.preventDefault();
        mostrarAlerta('Horário indisponível. Funcionamos das 8h às 20h.', 'erro');
        return;
    }
    
    // Se o usuário não estiver logado, mostrar alerta
    if (!document.querySelector('input[name="usuario"]')) {
        mostrarAlerta('Lembre-se de fazer login para confirmar seu agendamento.', 'info');
    }
}

// Preencher serviço selecionado no agendamento
function preencherServicoSelecionado() {
    const urlParams = new URLSearchParams(window.location.search);
    const servico = urlParams.get('servico');
    
    if (servico) {
        const selectServico = document.querySelector('select[name="servico"]');
        if (selectServico) {
            selectServico.value = servico;
        }
    }
}

// Mostrar alertas
function mostrarAlerta(mensagem, tipo) {
    // Remover alertas existentes
    const alertasExistentes = document.querySelectorAll('.alert-custom');
    alertasExistentes.forEach(alerta => alerta.remove());
    
    // Criar novo alerta
    const alerta = document.createElement('div');
    alerta.className = `alert-custom ${tipo}`;
    alerta.textContent = mensagem;
    
    // Estilizar alerta
    alerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
    `;
    
    // Cor baseada no tipo
    if (tipo === 'sucesso') {
        alerta.style.backgroundColor = '#28a745';
    } else if (tipo === 'erro') {
        alerta.style.backgroundColor = '#dc3545';
    } else {
        alerta.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(alerta);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => alerta.remove(), 300);
        }
    }, 5000);
}

// Adicionar animações de entrada
function adicionarAnimações() {
    // Observar elementos para animação
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Elementos para animar
    const elementosParaAnimar = document.querySelectorAll(
        'section, .card-servico, .servico, .membro, form'
    );
    
    elementosParaAnimar.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Inicializar funcionalidades específicas da página
function inicializarPaginaEspecifica() {
    const path = window.location.pathname;
    
    if (path.includes('agendamento.php')) {
        inicializarAgendamento();
    } else if (path.includes('servicos.html')) {
        inicializarServicos();
    } else if (path.includes('index.html') || path === '/') {
        inicializarHome();
    } else if (path.includes('sobre.html')) {
        inicializarSobre();
    } else if (path.includes('contato.html')) {
        inicializarContato();
    }
}

// Funcionalidades específicas da página inicial
function inicializarHome() {
    // CORREÇÃO: Remover texto duplicado do logo
    const logoText = document.querySelector('.brand');
    if (logoText) {
        logoText.style.display = 'none';
    }
    
    // Adicionar contador de visitas (simulação)
    const visitas = localStorage.getItem('visitas_navalha') || 0;
    localStorage.setItem('visitas_navalha', parseInt(visitas) + 1);
}

// Funcionalidades específicas da página Sobre
function inicializarSobre() {
    // Aumentar tamanho da fonte para melhor legibilidade
    const sobreTexto = document.querySelector('.sobre');
    if (sobreTexto) {
        sobreTexto.style.fontSize = '1.1rem';
    }
}

// Funcionalidades específicas da página Contato
function inicializarContato() {
    // CORREÇÃO: Remover mapa se estiver estranho
    const mapa = document.querySelector('.mapa');
    if (mapa) {
        mapa.style.display = 'none';
    }
}

// Funcionalidades específicas da página de agendamento
function inicializarAgendamento() {
    // Adicionar máscara para telefone se existir
    const telefoneInput = document.querySelector('input[name="telefone"]');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, '($1');
            }
            
            e.target.value = value;
        });
    }
    
    // Validar data mínima (hoje)
    const dataInput = document.querySelector('input[name="data"]');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
    }
}

// Funcionalidades específicas da página de serviços
function inicializarServicos() {
    // Adicionar efeito de destaque nos serviços
    const servicos = document.querySelectorAll('.servico');
    
    servicos.forEach(servico => {
        servico.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        servico.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Adicionar estilos CSS para animações
const styleAnimations = document.createElement('style');
styleAnimations.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
`;
document.head.appendChild(styleAnimations);

// Efeito de parallax no hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});