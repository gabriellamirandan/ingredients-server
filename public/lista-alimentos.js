const onBodyLoaded = async () => {
    //TODO: obter a lista de alimentos do servidor (requisicao http GET /api/alimentos)
    const fetchResult = await fetch("http://localhost:3000/api/alimentos");
    const arrayAlimentos = await fetchResult.json()
    console.log(arrayAlimentos)

    //TODO: criar uma tabela que contenha uma linha pra cada alimento da lista retornada
    // document.createElement
    // appendChild
    // varrer uma lista array.forEach
    // createElement de novo pra cada linha
    // append pra adicionar os proximos
    const container = document.getElementById('table');

    const table = document.createElement("table");
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
 
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    const headerRow = document.createElement('tr');
    tableHeader.appendChild(headerRow);


    const headers = ['Alimento', 'Proteína', 'Carboidrato', 'Gordura'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

   arrayAlimentos.forEach(alimento => {
        const row = document.createElement('tr');
        tableBody.appendChild(row);

        const propriedades = [alimento.name, alimento.protein, alimento.carb, alimento.fat]
        propriedades.forEach(propriedade => {
            const td = document.createElement('td');
            td.textContent = propriedade;
            row.appendChild(td);
        })
        //tableBody.appendChild(row);
    });

    //TODO: injetar essa tabela na tag id=content do html
    // document.getElementByID
    // appendChild or innerHTML*/

    container.appendChild(table);
}