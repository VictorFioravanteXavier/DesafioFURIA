const axios = require('axios');
const cheerio = require('cheerio');

async function getFullFuriaData() {
  const url = 'https://liquipedia.net/counterstrike/api.php';

  try {
    const res = await axios.get(url, {
      params: {
        action: 'parse',
        page: 'FURIA',
        format: 'json',
      },
      headers: {
        'User-Agent': 'FURIAChatBot/1.0 (youremail@example.com)',
      },
    });

    const html = res.data.parse.text['*'];
    const $ = cheerio.load(html);

    const wikitable = $('.wikitable');
    const allTextTables = [];

    // Extrair todas as tabelas com texto bruto
    wikitable.each((i, table) => {
      const text = $(table).text().trim().replace(/\n+/g, '\n');
      allTextTables.push(text);
    });

    // Agora você pode processar individualmente:
    const currentLineup = extractLineupFromTable(allTextTables[0]);
    const formerPlayers = extractFormerPlayers(allTextTables);
    const achievements = extractAchievements(allTextTables);
    const tournaments = extractTournaments(allTextTables);

    const furiaData = {
      team: 'FURIA',
      game: 'CS:GO',
      currentLineup,
      formerPlayers,
      tournamentHistory: tournaments,
      achievements,
      source: 'https://liquipedia.net/counterstrike/FURIA',
      lastUpdated: new Date().toISOString()
    };

    return furiaData;

  } catch (err) {
    console.error('Erro ao buscar dados da FURIA:', err.message);
  }
}

// Exemplo de função simples para extrair lineup de um texto
function extractLineupFromTable(tableText) {
  const lines = tableText.split('\n');
  const players = [];
  lines.forEach(line => {
    if (line.includes('Brazil') || line.includes('🇧🇷')) {
      const parts = line.split(/\s{2,}/); // quebra por espaços múltiplos
      if (parts.length >= 2) {
        players.push({
          player: parts[0].trim(),
          role: parts[1]?.trim() || 'Unknown',
        });
      }
    }
  });
  return players;
}

function extractFormerPlayers(tables) {
  const former = [];
  tables.forEach(txt => {
    if (txt.includes('Former')) {
      const lines = txt.split('\n');
      lines.forEach(l => {
        if (l.includes('Brazil') || l.includes('🇧🇷')) {
          former.push(l.trim());
        }
      });
    }
  });
  return former;
}

function extractAchievements(tables) {
  const list = [];
  tables.forEach(txt => {
    if (txt.includes('Placement') || txt.includes('Prize')) {
      const lines = txt.split('\n');
      lines.forEach(l => {
        if (/\$\d+/.test(l)) {
          list.push(l.trim());
        }
      });
    }
  });
  return list;
}

function extractTournaments(tables) {
  const list = [];
  tables.forEach(txt => {
    if (txt.includes('Tournament') && txt.includes('Result')) {
      const lines = txt.split('\n');
      lines.forEach(l => {
        if (/\d+(st|nd|rd|th)/.test(l)) {
          list.push(l.trim());
        }
      });
    }
  });
  return list;
}


module.exports = getFullFuriaData