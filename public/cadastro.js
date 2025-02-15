const meuForm = document.getElementById("form-alimento");


const meuListener = async (evento) => { //TODO marcar listener com async
  evento.preventDefault();

  const formData = new FormData(meuForm);
  const meuObjeto = {
    name: formData.get("name"),
    protein: Number(formData.get("protein")),
    carb: Number(formData.get("carb")),
    fat: Number(formData.get("fat"))
  };


  const options = {
    method: 'POST',
    body: JSON.stringify(meuObjeto),
    headers: {
      'Content-type': 'application/json'
    }
  };
    const fetchAlimento = await fetch('http://localhost:3000/api/alimentos', options);
    const result = await fetchAlimento.text();
    console.log(result);

    if (result === 'OK'){
      alert("Alimento adicionado com sucesso")
    }
    else {
      alert("Alimento nao adicionado. Tente novamente ou cadastre outro alimento.")
    }
};

meuForm.addEventListener("submit", meuListener);