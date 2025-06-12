const sobre = document.querySelector("#about");

const formulario = document.querySelector("#form")

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// async para não bloquar a página enquanto a API do Github não responde
async function getApiGithub() {

    try {
        // Enviar requisição HTTP para a API do Github
        const dadosPerfil = await fetch(`https://api.github.com/users/Luuh03`);

        // Converte a resposta HTTP em JSON
        const perfil = await dadosPerfil.json();

        // Criando conteúdo da seção Sobre
        let conteudo = `
    
            <img src="${perfil.avatar_url}" alt="Foto do perfil do Github - ${perfil.name}">

            <article id="about_texto" class="about_content">
                <h1>Sobre mim</h1>

                <p>${perfil.bio}</p>

                <div id="about_github" class="flex about_github_content">
                    <a class="botao" href="${perfil.html_url}">Github</a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>
            </article>
        `

        // Adicionar o conteúdo na página index.html na seção Sobre
        sobre.innerHTML += conteudo;

    } catch (error) {
        console.error(error)
    }
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault()

    // Validação do campo Nome
    const campoNome = document.querySelector("#nome")
    const txtNome = document.querySelector("#txtNome")

    if(campoNome.value.length < 3) {
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres!"
        campoNome.focus()
        return
    } else {
        txtNome.innerHTML = ""
    }

    // Validação do campo Email
    const campoEmail = document.querySelector("#email")
    const txtEmail = document.querySelector("#txtEmail")

    if(!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = "Digite um E-mail válido!"
        campoEmail.focus()
        return
    } else {
        txtEmail.innerHTML = ""
    }

    // Validação do campo Assunto
    const campoAssunto = document.querySelector("#assunto")
    const txtAssunto = document.querySelector("#txtAssunto")

    if(campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracteres!"
        campoAssunto.focus()
        return
    } else {
        txtAssunto.innerHTML = ""
    }

    // Enviar o email
    formulario.submit()
})

getApiGithub()