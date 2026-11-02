function executar(evento){

  evento.preventDefault();

  limparform();
  validarform();
} 
function validarform(){
    const nome = document.querySelector("#nome").value;

 const erroNome = document.querySelector("#erro-nome");
 if(nome === ""){
    erroNome.textContent = "nome nao pode estar vazio!";
    
    erroNome.classList.add("erro");
    erroNome.classList.remove("oculto");
  
  }
  const idade = document.querySelector("#idade").value;
  const erroIdade = document.querySelector("#erro-idade");
  if(idade === ""){
    erroIdade.textContent = "idade nao pode estar vazio!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  }else if(Number(idade) < 18){
    erroIdade.textContent = " È necessesario ter 18 anos!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  }

  //validação do email com regex
  const termos = document.querySelector("#termos");
  const erroTermos = document.querySelector("#erro-termos");
  if(!termos.checked){
    erroTermos.textContent = "È necessario aceitar os termos!";
    erroTermos.classList.add("erro");
    erroTermos.classList.remove("oculto");
  }

  const concluido = document.querySelector("#concluido");
  const valido = document.querySelectorAll(".erro").length === 0;
  if(!valido){
    concluido.textContent = "Tem erro no formulario!";
    concluido.classList.remove("oculto");
    concluido.classList.add("erro");
  } else {
    concluido.textContent = "Cadastro concluido com sucesso!";
    concluido.classList.remove("oculto");
    concluido.classList.add("sucesso");
  }

}



//()=> {} arrow function
function limparform(){
  document.querySelectorAll(".erro").forEach((item) => {
    item.classList.add("oculto");
    item.classList.remove("erro");
  });
  document.querySelector("#concluido").classList.add("oculto");
}