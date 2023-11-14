export function getExistingGames() {
  const games = localStorage.getItem("games");

  if (!games) {
    return [];
  } else {
    return JSON.parse(games);
  }
}
