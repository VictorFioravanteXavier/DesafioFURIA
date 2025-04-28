/* Mock criado pois as apis de dados de cs da furia ou outros tipos esão desatualizados */

async function getDataFuria() {
  return {
    team: "FURIA Esports",
    game: "Counter-Strike 2",
    years: {
      "2020": {
        lineup: ["yuurih", "KSCERATO", "arT", "HEN1", "VINI"],
        achievements: [
          "1st - DreamHack Open Summer NA 2020",
          "1st - ESL Pro League Season 12 NA (invictos na fase de grupos)",
          "Top 8 - IEM New York Online NA 2020"
        ],
        tournamentHistory: [
          "IEM New York 2020 NA - Top 4",
          "DreamHack Open Summer 2020 NA - Campeão",
          "ESL Pro League S12 NA - Vice-campeão"
        ],
        majorResults: [
          "Sem Major em 2020 (por conta da pandemia COVID-19)"
        ]
      },
      "2021": {
        lineup: ["yuurih", "KSCERATO", "arT", "VINI", "junior"],
        achievements: [
          "1st - CBCS Elite League Season 2",
          "5-8th - PGL Major Stockholm 2021"
        ],
        tournamentHistory: [
          "PGL Major Stockholm 2021 - Top 8",
          "ESL Pro League Season 13 - Top 6"
        ],
        majorResults: [
          "PGL Major Stockholm 2021 - 5-8th"
        ]
      },
      "2022": {
        lineup: ["yuurih", "KSCERATO", "arT", "drop", "saffee"],
        achievements: [
          "3-4th - IEM Rio Major 2022 (Brasil)",
          "1st - Elisa Masters Espoo 2022"
        ],
        tournamentHistory: [
          "IEM Katowice 2022 - Playoffs",
          "PGL Antwerp Major 2022 - 5-8th",
          "IEM Rio Major 2022 - Semifinal"
        ],
        majorResults: [
          "PGL Major Antwerp 2022 - 5-8th",
          "IEM Rio Major 2022 - 3-4th"
        ]
      },
      "2023": {
        lineup: ["yuurih", "KSCERATO", "arT", "saffee", "drop"],
        achievements: [
          "Top 8 - BLAST Spring Final",
          "Classificados para IEM Cologne 2023"
        ],
        tournamentHistory: [
          "BLAST.tv Paris Major 2023 - Eliminados no RMR",
          "ESL Pro League Season 18 - Quartas de final"
        ],
        majorResults: [
          "Não classificaram para o BLAST Paris Major 2023"
        ]
      },
      "2024": {
        lineup: ["yuurih", "KSCERATO", "chelo", "FalleN", "drop"],
        achievements: [
          "5-8th - IEM Chengdu 2024",
          "9-11th - PGL Major Copenhagen 2024"
        ],
        tournamentHistory: [
          "IEM Chengdu 2024 - Quartas de final",
          "PGL Copenhagen Major 2024 - Top 12"
        ],
        majorResults: [
          "PGL Major Copenhagen 2024 - 9-11th"
        ]
      },
      "2025": {
        lineup: ["yuurih", "KSCERATO", "chelo", "FalleN", "drop"],
        achievements: [
          "Convidados - IEM Dallas 2025",
          "Convidados - BLAST Premier Spring Final 2025"
        ],
        tournamentHistory: [
          "IEM Dallas 2025 (a disputar)",
          "ESL Pro League Season 19 (classificados)"
        ],
        majorResults: [
          "Nenhum Major até abril 2025 (próximo será no final do ano)"
        ]
      }
    }
  };
}

module.exports = getDataFuria;