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
            colocarRegistrosTabela(atk, atks, def, defs, criarTabela());
        });
    }).catch(function (erro) {
        console.log('Erro: ', erro);
    });
}

function colocarItens(nome, foto) {
    const nomePokemon = document.createElement('h1');
    const fotoPokemon = document.createElement('img');
    const main = document.querySelector('main')

    nomePokemon.innerText = nome;
    fotoPokemon.src = foto;
    fotoPokemon.style.height = '20vh'


    main.appendChild(nomePokemon);
    main.appendChild(fotoPokemon);
}

function criarTabela() {
    const tabela = document.createElement('table');

    const header = document.createElement('tr');
    const headerATK = document.createElement('th');
    const headerDEF = document.createElement('th');
    const headerDEFS = document.createElement('th');
    const headerATKS = document.createElement('th');

    headerDEFS.innerText = 'DEFS';
    headerATKS.innerText = 'ATKS';
    headerATK.innerText = 'ATK';
    headerDEF.innerText = 'DEF';

    header.appendChild(headerATK);
    header.appendChild(headerATKS);
    header.appendChild(headerDEF);
    header.appendChild(headerDEFS);

    main.appendChild(tabela);
    tabela.appendChild(header);

    tabela.style.marginTop = '20px';

    return tabela;
}

function colocarRegistrosTabela(atk, atks, def, defs, tabela) {
    const linha = document.createElement('tr');
    const colunaATK = document.createElement('td');
    const colunaATKS = document.createElement('td');
    const colunaDEF = document.createElement('td');
    const colunaDEFS = document.createElement('td');

    colunaATK.innerText = atk;
    colunaATKS.innerText = atks;
    colunaDEF.innerText = def;
    colunaDEFS.innerText = defs;

    tabela.appendChild(linha);
    linha.appendChild(colunaATK);
    linha.appendChild(colunaATKS);
    linha.appendChild(colunaDEF);
    linha.appendChild(colunaDEFS);
}

criarLogo();
fotoPokemon();