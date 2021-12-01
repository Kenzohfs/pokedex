//https://prof-poke-api.herokuapp.com/api/pokedex/
//https://prof-poke-api.herokuapp.com/api/pokemon/001/

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

    criarTabela();
}

function criarTabela() {
    let tabelaAtual = document.querySelector('table');
    const main = document.querySelector('main');

    if (tabelaAtual) {
        tabelaAtual.remove();
    }

    const tabela = document.createElement('table');
    tabela.style.marginTop = '20px'
    main.appendChild(tabela);

    pokemonList();
}

function pokemonList() {
    fetch('https://prof-poke-api.herokuapp.com/api/pokedex/').then(function (resultado) {
        resultado.json().then(function (data) {
            console.log('data: ', data);
            data.forEach(function (e) {
                inserirPokemon(e);
            })
        });
    }).catch(function (erro) {
        console.log('Erro: ', erro);
    });
}

function inserirPokemon(pokemon) {
    const tabela = document.querySelector('table');
    const linha = document.createElement('tr');
    const colunaImagem = document.createElement('td');
    const colunaNome = document.createElement('td');

    colunaImagem.appendChild(criarImagemPokemon(pokemon));
    colunaNome.innerText = pokemon.name;

    tabela.appendChild(linha);
    linha.appendChild(colunaImagem);
    linha.appendChild(colunaNome);
}

function criarImagemPokemon(pokemon) {
    const imgPokemon = document.createElement('img');
    imgPokemon.src = pokemon.url_icon;


    return imgPokemon;
}

function getInputValue() {
    const inputFilter = document.querySelector('#inputFilter');

    const inputValue = inputFilter.value;

    filterTable(inputValue);
}

function filterTable(input) {
    fetch('https://prof-poke-api.herokuapp.com/api/pokedex/').then(function (resultado) {
        resultado.json().then(function (data) {
            const listaFiltrada = data.filter(function (e) {
                return e.name.startwith(input)
            });
        });
    }).catch(function (erro) {
        console.log('Erro: ', erro);
    });
}

criarLogo();
criarDivFilter();