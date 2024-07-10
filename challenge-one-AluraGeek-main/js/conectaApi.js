async function listaProdutos() {
    const conexao = await fetch("https://665f42301e9017dc16f382df.mockapi.io/api/v1/Produtos");
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
}

async function criaProduto(nome, preco, imagem, id) {
    const conexao = await fetch("https://665f42301e9017dc16f382df.mockapi.io/api/v1/Produtos", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
          nome: nome,
          preco: preco,
          imagem: imagem,
          id: id
    })
});

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function excluiProduto(id) {
    const conexao = await fetch(`https://665f42301e9017dc16f382df.mockapi.io/api/v1/Produtos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
    });

    return conexao;
}

export const conectaApi = {
    listaProdutos,
    criaProduto,
    excluiProduto
}