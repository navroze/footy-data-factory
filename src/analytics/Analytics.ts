import { Player } from "../models/Player";
import { Match } from "../models/Match";

export class Analytics {
  // Example: get top N scorers based on goals
  computeTopScorers(players: Player[], topN: number = 5): Player[] {
    // Sort descending by goals
    const sorted = [...players].sort((a, b) => b.stats.goals - a.stats.goals);
    return sorted.slice(0, topN);
  }

  // Example: compute a "league table" from match results
  computeLeagueTable(matches: Match[]): any[] {
    // You could create a data structure for { teamId, points, goalsFor, goalsAgainst, etc. }
    // Then for each match, update the stats accordingly.
    const table: Record<string, any> = {};

    matches.forEach((m) => {
      const home = m.homeTeamId;
      const away = m.awayTeamId;

      if (!table[home]) {
        table[home] = { teamId: home, points: 0, gf: 0, ga: 0 };
      }
      if (!table[away]) {
        table[away] = { teamId: away, points: 0, gf: 0, ga: 0 };
      }

      if (m.score && m.status === "completed") {
        const { home: homeGoals, away: awayGoals } = m.score;
        table[home].gf += homeGoals;
        table[away].gf += awayGoals;
        table[home].ga += awayGoals;
        table[away].ga += homeGoals;

        if (homeGoals > awayGoals) {
          table[home].points += 3;
        } else if (awayGoals > homeGoals) {
          table[away].points += 3;
        } else {
          // draw
          table[home].points += 1;
          table[away].points += 1;
        }
      }
    });

    // Convert object to array, then sort by points, then by other criteria
    const results = Object.values(table);
    results.sort((a: any, b: any) => b.points - a.points);
    return results;
  }
}
