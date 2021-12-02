const idPokemon = document.location.search.replace('?', '');

const header = document.createElement('header');
document.body.appendChild(header);

const main = document.createElement('main');
document.body.appendChild(main);

function criarLogo() {
    const header = document.querySelector('header');
    const pokemonLogo = document.createElement('img');

    header.style.display = 'flex';
    header.style.justifyContent = 'center';

    pokemonLogo.src = 'https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png';
    pokemonLogo.style.width = '30vw';

    header.appendChild(pokemonLogo);
}

function fotoPokemon() {
    fetch('https://prof-poke-api.herokuapp.com/api/pokemon/' + idPokemon).then(function (resultado) {
        resultado.json().then(function (data) {
            console.log('data: ', data);
            const nome = data.name;
            const fotourl = data.url_icon;

            const atk = data.atk;
            const atks = data.atks;
            const def = data.def;
            const defs = data.defs;
            colocarItens(nome, fotourl);
            criarTabela(atk, atks, def, defs);
        });
    }).catch(function (erro) {
        console.log('Erro: ', erro);
    });
}

function colocarItens(nome, foto) {
    const nomePokemon = document.createElement('h3');
    const fotoPokemon = document.createElement('img');
    const main = document.querySelector('main')

    nomePokemon.innerText = nome;
    fotoPokemon.src = foto;

    main.appendChild(nomePokemon);
    main.appendChild(fotoPokemon);
}

function criarTabela(atk, atks, def, defs) {
    const tabela = document.createElement('table');
    const linha = document.createElement('tr');
    const linhaS = document.createElement('tr');
    const colunaATK = document.createElement('td');
    const colunaATKS = document.createElement('td');
    const colunaDEF = document.createElement('td');
    const colunaDEFS = document.createElement('td');

    const header = document.createElement('tr');
    const headerATK = document.createElement('th');
    const headerDEF = document.createElement('th');

    headerATK.innerText = 'ATK'
    headerDEF.innerText = 'DEF'

    header.appendChild(headerATK);
    header.appendChild(headerDEF);

    colunaATK.innerText = atk;
    colunaATKS.innerText = atks;
    colunaDEF.innerText = def;
    colunaDEFS.innerText = defs;

    main.appendChild(tabela);
    tabela.append(header);
    tabela.appendChild(linha);
    tabela.appendChild(linhaS);
    linha.appendChild(colunaATK);
    linhaS.appendChild(colunaATKS);
    linha.appendChild(colunaDEF);
    linhaS.appendChild(colunaDEFS);
}

criarLogo();
fotoPokemon();