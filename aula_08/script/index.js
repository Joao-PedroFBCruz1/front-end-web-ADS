document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const cpfInput = document.getElementById("cpf");

    cpfInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3}).*/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{3}).*/, "$1.$2");
        }
        e.target.value = value;
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let isValid = true;

        const campos = [
            { id: "nomeCompleto", nome: "Nome Completo" },
            { id: "email", nome: "E-mail" },
            { id: "cpf", nome: "CPF" },
            { id: "telefone", nome: "Telefone" },
            { id: "dataNascimento", nome: "Data de Nascimento" },
            { id: "cep", nome: "CEP" },
            { id: "cidade", nome: "Cidade" },
            { id: "estado", nome: "Estado" },
            { id: "senha", nome: "Senha" },
            { id: "nivelExperiencia", nome: "Nível de Experiência" }
        ];

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const errorSpan = document.getElementById(`erro-${campo.id}`);
            input.classList.remove("error");
            errorSpan.textContent = "";
        });

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const errorSpan = document.getElementById(`erro-${campo.id}`);
            const valor = input.value.trim();

            if (!valor) {
                input.classList.add("error");
                errorSpan.textContent = `O campo ${campo.nome} é obrigatório.`;
                isValid = false;
            } else if (campo.id === "email" && !valor.includes("@")) {
                input.classList.add("error");
                errorSpan.textContent = "Informe um e-mail válido.";
                isValid = false;
            } else if (campo.id === "cpf" && valor.length < 14) {
                input.classList.add("error");
                errorSpan.textContent = "CPF incompleto.";
                isValid = false;
            } else if (campo.id === "senha" && valor.length < 6) {
                input.classList.add("error");
                errorSpan.textContent = "A senha deve ter pelo menos 6 caracteres.";
                isValid = false;
            }
        });

        if (!isValid) {
            return; 
        }

        const dadosFormulario = {
            nomeCompleto: document.getElementById("nomeCompleto").value,
            email: document.getElementById("email").value,
            cpf: cpfInput.value,
            telefone: document.getElementById("telefone").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            cep: document.getElementById("cep").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            nivelExperiencia: document.getElementById("nivelExperiencia").value
        };

        try {
            const response = await fetch("https://postman-echo.com/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosFormulario)
            });

            if (!response.ok) {
                throw new Error("Erro na comunicação com o servidor.");
            }

            const resultado = await response.json();

            alert("Cadastro realizado e enviado com sucesso para a API do Postman Echo!");

            const resultadoContainer = document.getElementById("resultadoContainer");
            const jsonResultado = document.getElementById("jsonResultado");
            jsonResultado.textContent = JSON.stringify(resultado, null, 2);
            resultadoContainer.classList.remove("hidden");

        } catch (error) {
            alert("Ocorreu um erro ao enviar os dados: " + error.message);
        }
    });
});