fetch('http://ergast.com/api/f1/2024/constructorStandings.json')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        // Acessar a lista de standings das equipes
        const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        // Extrair os nomes das equipes e seus respectivos pontos
        const labels = constructorStandings.map(team => team.Constructor.name); // Nomes das equipes
        const points = constructorStandings.map(team => parseInt(team.points)); // Pontos das equipes (convertidos para número)

        console.log('Labels (Equipes):', labels);
        console.log('Points (Pontos):', points);

        // Configurar e renderizar o gráfico Chart.js

    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });
