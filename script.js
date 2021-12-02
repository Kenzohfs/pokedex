let listaDePokemon = [];

fetch('https://prof-poke-api.herokuapp.com/api/pokedex/').then(function (resultado) {
    resultado.json().then(function (data) {
        console.log('data: ', data);
        data.forEach(function (e) {
            listaDePokemon.push(e);
        });
        criarDivFilter();
        criarTabela(listaDePokemon);
    });
}).catch(function (erro) {
    console.log('Erro: ', erro);
});

function criarLogo() {
    const header = document.createElement('header');
    const pokemonLogo = document.createElement('img');

    header.style.display = 'flex';
    header.style.justifyContent = 'center';

    pokemonLogo.src = 'https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png';
    pokemonLogo.style.width = '30vw';

    document.body.appendChild(header);
    header.appendChild(pokemonLogo);
}

function criarDivFilter() {
    const main = document.createElement('main');
    const divFilter = document.createElement('div');

    document.body.appendChild(main);
    main.appendChild(divFilter);

    criarInput(divFilter);
}

function criarInput(div) {
    const inputFilter = document.createElement('input');

    inputFilter.id = 'inputFilter';
    inputFilter.placeholder = 'Procurar pokémon...'

    div.appendChild(inputFilter);

    criarBotaoFilter(div);
}

function criarBotaoFilter(div) {
    const botaoFilter = document.createElement('button');

    botaoFilter.id = 'botaoFilter';
    botaoFilter.innerText = 'Buscar';
    botaoFilter.style.marginLeft = '10px'

    div.appendChild(botaoFilter);

    botaoFilter.onclick = getInputValue;
}

function criarTabela(listaParameter) {
    let tabelaAtual = document.querySelector('table');
    const main = document.querySelector('main');

    if (tabelaAtual) {
        tabelaAtual.remove();
    }

    const tabela = document.createElement('table');
    tabela.style.marginTop = '20px';
    main.appendChild(tabela);

    inserirPokemon(listaParameter);
}

function inserirPokemon(listaParameter) {
    const tabela = document.querySelector('table');

    listaParameter.forEach(function (e) {
        const linha = document.createElement('tr');
        const colunaImagem = document.createElement('td');
        const colunaNome = document.createElement('td');
        const colunaBotao = document.createElement('td');

        colunaImagem.appendChild(criarImagemPokemon(e));
        colunaNome.innerText = e.name;
        colunaBotao.appendChild(botaoRedirecionamento(e))

        tabela.appendChild(linha);
        linha.appendChild(colunaImagem);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaBotao);
    })
}

function botaoRedirecionamento(pokemon) {
    const button = document.createElement('button');
    const link = document.createElement('a');

    link.id = 'link';

    link.innerText = 'Link';
    link.target = '_blank';
    link.href = './pokemonPage/index.html?' + pokemon.id;

    button.appendChild(link);

    return button;
}

function criarImagemPokemon(pokemon) {
    const imgPokemon = document.createElement('img');
    imgPokemon.src = pokemon.url_icon;
    imgPokemon.id = 'imgPokemon';

    imgPokemon.onerror = function () {
        imgPokemon.src = pokemon.url_icon_2;
    }


    return imgPokemon;
}

function getInputValue() {
    const inputFilter = document.querySelector('#inputFilter');

    const inputValue = inputFilter.value;

    filterTable(inputValue);
}

function filterTable(input) {
    const listaFiltrada = listaDePokemon.filter(function (e) {
        return e.name.startsWith(input)
    });

    criarTabela(listaFiltrada);
}

criarLogo();
