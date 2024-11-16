

const celular = document.getElementById("telefone");

celular.addEventListener("input", () => {
  let limparValor = celular.value.replace(/\D/g, "").substring(0, 11);
  let numeroArray = limparValor.split("");
  let numeroFormatado = "";

  if (numeroArray.length > 0) {
    numeroFormatado += `(${numeroArray.slice(0, 2).join("")})`;
  }
  if (numeroArray.length > 2) {
    numeroFormatado += ` ${numeroArray.slice(2, 7).join("")}`;
  }
  if (numeroArray.length > 7) {
    numeroFormatado += `-${numeroArray.slice(7, 11).join("")}`;
  }
  celular.value = numeroFormatado;
});

const inputNome = document.querySelector("#nome");
inputNome.addEventListener("keypress", (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.wich;
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});


const btn = () => {
  const mensagemErro = document.getElementById("mensagem-erro");

  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("data").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome) {
    mensagemErro.textContent = "Por favor, preencha seu nome.";
    return false;
  }
  if (!dataNascimento) {
    mensagemErro.textContent =
      "Por favor, preencha sua data de nascimento.";
    return false;
  }
  if (!telefone) {
    mensagemErro.textContent = "Por favor, preencha seu telefone.";
    return false;
  }

  axios
    .post("http://localhost:3002/pessoas", {
      nome: nome,
      dataNascimento: dataNascimento,
      telefone: telefone,
    })
    .then((response) => {
      document.getElementById("nome").value = "";
      document.getElementById("data").value = "";
      document.getElementById("telefone").value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
  location.reload()
};

const carregarPessoas = () => {
  axios.get("http://localhost:3002/pessoas").then((response) => {
    const primeiraLetraMaiuscula = (nome) => {
      return nome.toLowerCase().replace(/\b\w/g, function (palavra) {
        return palavra.toUpperCase();
      });
    };
    const formatDate = (date) => {
      return date.split('-').reverse().join('/');
    }

    let adicionar = "";
    response.data.forEach((dado) => {
      adicionar +=
        `
      <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Data de Nascimento</th>
          <th scope="col">Telefone</th>
          <th scope="col">Atualizar</th>
          <th scope="col">Deletar</th>
        </tr>
      </thead>
      <tbody>
        <tr id="tr-dados">
      <td>${dado.id}</td>
      <td>${primeiraLetraMaiuscula(dado.nome)}</td>
      <td>${formatDate(dado.dataNascimento)}</td>
      <td>${dado.telefone}</td>
      <td><button id=btnAtualizar class="btn btn-secondary btn-sm" onclick=btnAtualizar(${dado.id})>Atualizar</button></td>
      <td><button id=btnDeletar class="btn btn-secondary btn-sm" onclick=btnDeletar(${dado.id})>Deletar</button></td>
        </tr>
      </tbody>
    </table>
      
      
`









      //   `<div>
      //   Nome: ${primeiraLetraMaiuscula(dado.nome)} <br> 
      //   Data de Nascimento: ${formatDate(dado.dataNascimento)} <br> 
      //   Telefone: ${dado.telefone} <p></p>
      // <button id=btnAtualizar class="btn btn-secondary btn-sm" onclick=btnAtualizar(${dado.id})>Atualizar</button>
      // <button id=btnDeletar class="btn btn-secondary btn-sm" onclick=btnDeletar(${dado.id})>Deletar</button> <p></p>
      // </div>`
    });

    document.getElementById("dados").innerHTML = adicionar;
  });
};


const btnAtualizar = (id) => {
  const mensagemErro = document.getElementById("mensagem-erro");

  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("data").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome) {
    mensagemErro.textContent = "Por favor, preencha seu nome.";
    return false;
  }

  if (!dataNascimento) {
    mensagemErro.textContent =
      "Por favor, preencha sua data de nascimento.";
    return false;
  }
  if (!telefone) {
    mensagemErro.textContent = "Por favor, preencha seu telefone.";
    return false;
  }
  axios
    .put(`http://localhost:3002/pessoas/${id}`, {
      nome: nome,
      dataNascimento: dataNascimento,
      telefone: telefone,
    })
    .then((response) => {
      document.getElementById("nome").value = ""
      document.getElementById("data").value = ""
      document.getElementById("telefone").value = ""
      carregarPessoas();

    })
    .catch((error) => {
      console.log(error);
    });

};



const btnDeletar = (id) => {
  axios
    .delete(`http://localhost:3002/pessoas/${id}`)
    .then((response) => {
      carregarPessoas()
    })
    .catch((error) => {
      console.log(error);
    });
};

carregarPessoas();