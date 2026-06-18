// Aguarda o DOM (conteúdo da página) carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona o botão de ação pelo ID
    const botaoAcao = document.getElementById("btnAcao");

    // Adiciona um evento de clique ao botão
    botaoAcao.addEventListener("click", () => {
        // Rola a página suavemente até a seção de serviços
        const secaoServicos = document.getElementById("servicos");
        
        secaoServicos.scrollIntoView({ 
            behavior: "smooth" 
        });
    });

});
