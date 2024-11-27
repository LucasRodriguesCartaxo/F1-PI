fetch('http://ergast.com/api/f1/2024/driverStandings.json')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        // Acessar a lista de standings
        const driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        // Extrair os nomes dos pilotos e seus respectivos pontos
        const labels = driverStandings.map(driver => driver.Driver.familyName); // Nomes dos pilotos
        const points = driverStandings.map(driver => parseInt(driver.points)); // Pontos dos pilotos (convertidos para número)

        console.log('Labels:', labels);
        console.log('Points:', points);

        // Configurar e renderizar o gráfico Chart.js

    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });







// fetch('http://ergast.com/api/f1/2024/driverStandings.json')

//     .then((response) => {

//         if (response.ok) {

//             return response.json()

//         }

//     }).then((data) => {

//         // esse caminho todo, é pra acessar a colocação dentro de "data". "data", no caso, é o return logo acima, nada mais é do que nosso response em formato de json()

//         // se voce der um console.log(data), você conseguirá ver todo esse caminho que percorri.

//         var pontos = JSON.stringify(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points)
//         var listaPontos = pontos

//         console.log(pontos)
//     })