import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiCard(nome, preco, imagem, id) {
    const produto = document.createElement("li");
    produto.className = "card__container__info";
    produto.setAttribute('data-id', id);
    produto.innerHTML = `
        <img class="img__produto" src="${imagem}"/>
        <div class="descricao">
            <p>${nome}</p>
            <div class="card__container__valor">
                <p>RS ${preco}</p>
                <button class="botao__delete" data-id=${id}>
                    <img src="./img/delete.png">
                </button>
            </div> 
        </div>
    `

    const botaoDel = produto.querySelector(".botao__delete");
    botaoDel.addEventListener("click", async (e) => {
        e.preventDefault();

        var confirmarExclusao = confirm("Você deseja excluir este produto?");
        if (confirmarExclusao == true) {
            botaoDel.closest("li").remove();
            await conectaApi.excluiProduto(id);
            alert("Produto excluído!");
        }          
    });
    
    return produto;
}

async function listarProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        listaApi.forEach(elemento => lista.appendChild(
            constroiCard(elemento.nome, elemento.preco, elemento.imagem, elemento.id)));

        const container = document.querySelector(".mensagem__vazio");
        const listaDeCards = document.querySelectorAll(".card__container__info");

        if (listaDeCards.length === 0) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    } catch (erro) {
        console.error("Erro ao listar produtos:", erro); 
    }
}

document.addEventListener("DOMContentLoaded", listarProdutos);











