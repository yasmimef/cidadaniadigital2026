document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HEADER FIXO QUE MUDA DE ESTILO AO ROLAR
    const header = document.getElementById("mainHeader");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            backToTopBtn.classList.add("show");
        } else {
            header.classList.remove("scrolled");
            backToTopBtn.classList.remove("show");
        }
        
        // Atualiza link ativo no menu baseado na seção visível
        spySections();
    });

    // 2. BOTÃO VOLTAR AO TOPO
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 3. MENU MOBILE HAMBÚRGUER
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("open"); // Pode usar para estilizar um "X" via CSS
    });

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });

    // 4. SISTEMA DE SCROLL SPY (Destaque automático no Menu)
    const sections = document.querySelectorAll("section[id]");
    
    function spySections() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const targetNavLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add("active");
                } else {
                    targetNavLink.classList.remove("active");
                }
            }
        });
    }

    // 5. ANIMAÇÃO DE NÚMEROS / ESTATÍSTICAS
    const statsNumbers = document.querySelectorAll(".stat-number");
    let animated = false;

    function animateStats() {
        statsNumbers.forEach(stat => {
            const target = +stat.getAttribute("data-target");
            const updateCount = () => {
                const current = +stat.innerText.replace(/[^0-9]/g, '');
                const increment = target / 50; // Velocidade da contagem

                if (current < target) {
                    const nextValue = Math.ceil(current + increment);
                    // Preserva o sufixo original (+ ou %)
                    if (stat.getAttribute("data-target") === "99") {
                        stat.innerText = nextValue + "%";
                    } else if (stat.getAttribute("data-target") === "12") {
                        stat.innerText = nextValue + "M+";
                    } else {
                        stat.innerText = nextValue + "+";
                    }
                    setTimeout(updateCount, 25);
                } else {
                    stat.innerText = target + (stat.getAttribute("data-target") === "99" ? "%" : stat.getAttribute("data-target") === "12" ? "M+" : "+");
                }
            };
            updateCount();
        });
    }

    // Disparar animação de números quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector(".hero-section");
    if(heroSection) observer.observe(heroSection);


    // 6. VALIDAÇÃO E ENVIO DO FORMULÁRIO
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento real da página

        // Simulação de envio com feedback visual elegante
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "Processando Dados...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        setTimeout(() => {
            alert("Muito obrigado! Recebemos sua mensagem com sucesso e logo entraremos em contato.");
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        }, 2000);
    });
});
