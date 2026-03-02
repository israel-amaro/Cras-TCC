// ================== MENU RESPONSIVO ==================
document.addEventListener('DOMContentLoaded', function() {
  const btnMenu = document.querySelector('.btn-menu');
  const navPrincipal = document.querySelector('.nav-principal');
  
  if (btnMenu) {
    btnMenu.addEventListener('click', function() {
      navPrincipal.classList.toggle('mobile-active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navPrincipal.classList.remove('mobile-active');
      });
    });
  }
  
  // ================== SUAVIZAR NAVEGAÇÃO ==================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ================== FORMULÁRIO DE AGENDAMENTO ==================
  const formAgendamento = document.querySelector('.form-agendamento form');
  if (formAgendamento) {
    formAgendamento.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const formData = new FormData(this);
      const dados = {
        nome: formAgendamento.querySelector('input[type="text"]').value,
        cpf: formAgendamento.querySelectorAll('input[type="text"]')[1].value,
        telefone: formAgendamento.querySelector('input[type="tel"]').value,
        email: formAgendamento.querySelector('input[type="email"]').value,
        data: formAgendamento.querySelector('input[type="date"]').value,
        hora: formAgendamento.querySelector('select').value,
        servico: formAgendamento.querySelectorAll('select')[1].value,
        observacoes: formAgendamento.querySelector('textarea').value
      };
      
      // Simular envio
      console.log('Agendamento realizado:', dados);
      alert('✓ Agendamento confirmado com sucesso!\n\nUm email de confirmação foi enviado para:\n' + dados.email);
      formAgendamento.reset();
    });
  }
  
  // ================== NAVEGAÇÃO ATIVA ==================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // ================== MÁSCARA CPF ==================
  const inputCPF = document.querySelectorAll('input[type="text"]')[1];
  if (inputCPF) {
    inputCPF.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
      }
    });
  }
  
  // ================== MÁSCARA TELEFONE ==================
  const inputTel = document.querySelector('input[type="tel"]');
  if (inputTel) {
    inputTel.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }
  
  // ================== BOTÕES DE AÇÃO ==================
  const btnAgendar = document.querySelectorAll('.btn-primary');
  btnAgendar.forEach(btn => {
    btn.addEventListener('click', function() {
      const agendamentoSection = document.getElementById('agendamentos');
      if (agendamentoSection) {
        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
        formAgendamento.querySelector('input[type="text"]').focus();
      }
    });
  });
  
  // ================== EFEITO SCROLL HEADER ==================
  let lastScrollTop = 0;
  const headerPrincipal = document.querySelector('.header-principal');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      headerPrincipal.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      headerPrincipal.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  
  // ================== ANIMAÇÃO DE ENTRADA ==================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.servico-card, .aviso-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
  });
  
  // ================== VALIDAÇÃO DE FORMULÁRIO ==================
  if (formAgendamento) {
    const inputs = formAgendamento.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('invalid', function(e) {
        e.preventDefault();
        input.style.borderColor = '#dc3545';
      });
      
      input.addEventListener('input', function() {
        if (input.validity.valid) {
          input.style.borderColor = '#dee2e6';
        }
      });
    });
  }
});

// ================== FUNÇÃO AUXILIAR PARA DADOS ==================
function salvarAgendamento(dados) {
  // Simulação de salvamento de dados
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  dados.id = Date.now();
  dados.status = 'pendente';
  agendamentos.push(dados);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  return dados;
}

function obterAgendamentos() {
  return JSON.parse(localStorage.getItem('agendamentos') || '[]');
}
 
const formTriagem = document.getElementById('formTriagem');
if (formTriagem) {
  formTriagem.addEventListener('submit', function(e) {
    e.preventDefault();

    const renda = parseFloat(document.getElementById('renda').value);
    const membros = parseInt(document.getElementById('membros').value);

    const rendaPerCapita = renda / membros;
    const resultado = document.getElementById('resultadoTriagem');

    let classificacao = '';
    let elegivel = false;

    if (rendaPerCapita <= 218) {
      classificacao = 'Extrema Vulnerabilidade';
      elegivel = true;
    } else if (rendaPerCapita <= 500) {
      classificacao = 'Alta Vulnerabilidade';
      elegivel = true;
    } else if (rendaPerCapita <= 1000) {
      classificacao = 'Vulnerabilidade Moderada';
      elegivel = true;
    } else {
      classificacao = 'Fora do critério automático';
      elegivel = false;
    }

    resultado.innerHTML = `
      <div class="aviso-card">
        <h3>Resultado da Triagem</h3>
        <p><strong>Renda por pessoa:</strong> R$ ${rendaPerCapita.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
        ${
          elegivel
          ? `<a href="agendamento.html" class="btn btn-primary" style="margin-top:10px;">
               Prosseguir para Agendamento
             </a>`
          : `<p>Recomendamos comparecer ao CRAS para avaliação detalhada.</p>`
        }
      </div>
    `;
  });
}

// ================== CARROSSEL DE DESTAQUES ==================
  const track = document.getElementById('track');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (track && btnPrev && btnNext) {
    let indiceAtual = 0;

    function atualizarCarrossel() {
      const cartoes = document.querySelectorAll('.cartao-carrossel');
      if (cartoes.length === 0) return;

      const totalCartoes = cartoes.length;
      
      // Determina quantos cartões aparecem dependendo da tela (baseado no CSS)
      let cartoesVisiveis = 3;
      if (window.innerWidth <= 768) {
        cartoesVisiveis = 1;
      } else if (window.innerWidth <= 992) {
        cartoesVisiveis = 2;
      }

      // Evita rolar para o nada
      if (indiceAtual < 0) indiceAtual = 0;
      if (indiceAtual > totalCartoes - cartoesVisiveis) {
        indiceAtual = totalCartoes - cartoesVisiveis;
      }

      // Pega a largura exata do cartão renderizado na tela + o gap (20px)
      const cardWidth = cartoes[0].offsetWidth;
      const gap = 20; 
      const deslocamento = -(indiceAtual * (cardWidth + gap));
      
      track.style.transform = `translateX(${deslocamento}px)`;
    }

    btnPrev.addEventListener('click', () => {
      indiceAtual--;
      atualizarCarrossel();
    });

    btnNext.addEventListener('click', () => {
      indiceAtual++;
      atualizarCarrossel();
    });

    // Recalcula a posição se o usuário virar o celular ou redimensionar a tela
    window.addEventListener('resize', () => {
      indiceAtual = 0; // Reseta para o início ao redimensionar para evitar bugs visuais
      atualizarCarrossel();
    });
    
    // Suporte a deslizar o dedo no celular (Swipe)
    let touchstartX = 0;
    let touchendX = 0;
    
    track.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      if (touchstartX - touchendX > 50) { // Deslizou para a esquerda
        indiceAtual++; 
        atualizarCarrossel();
      }
      if (touchendX - touchstartX > 50) { // Deslizou para a direita
        indiceAtual--; 
        atualizarCarrossel();
      }
    }, {passive: true});
  }

  // ================== BANNER ROTATIVO (HERO SLIDER) ==================
let slideIndex = 0;
let timerSlider;

function inicializarSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  
  if(slides.length === 0) return; // Se não tiver slider na página, ignora

  function mostrarSlide(n) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    slideIndex = n;
    
    // Se passar do limite, volta pro zero
    if (slideIndex >= slides.length) slideIndex = 0;
    // Se for menor que zero, vai pro último
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }

  // Função que o HTML chama quando clica na bolinha
  window.mudarSlide = function(n) {
    clearInterval(timerSlider); // Para o automático quando o usuário clica
    mostrarSlide(n);
    iniciarRotacaoAutomatica(); // Volta a rodar automático depois de clicar
  };

  function iniciarRotacaoAutomatica() {
    timerSlider = setInterval(() => {
      mostrarSlide(slideIndex + 1);
    }, 6000); // Troca a cada 6 segundos (6000 milissegundos)
  }

  // Começa o slider
  iniciarRotacaoAutomatica();
}

// Inicia assim que a página carregar
document.addEventListener('DOMContentLoaded', inicializarSlider);