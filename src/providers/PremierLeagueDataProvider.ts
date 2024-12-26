import axios from "axios";
import { ILeagueDataProvider } from "./ILeagueDataProvider";
import { League } from "../models/League";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Match } from "../models/Match";

const BASE_URL = "https://fantasy.premierleague.com/api";

export class PremierLeagueDataProvider implements ILeagueDataProvider {
  async fetchLeagueData(): Promise<League> {
    // The FPL API "bootstrap-static" returns general info,
    // teams, players, etc. in one big JSON
    const url = `${BASE_URL}/bootstrap-static/`;
    const response = await axios.get(url);

    const data = response.data;
    // 'data' contains fields like "events", "teams", "elements" (players), etc.

    const league: League = {
      id: "EPL",
      name: "Premier League",
      country: "England",
      season: "2023/2024"
    };

    return league;
  }

  async fetchTeams(): Promise<Team[]> {
    const url = `${BASE_URL}/bootstrap-static/`;
    const response = await axios.get(url);
    const data = response.data;

    // FPL calls them "teams"
    const teamsRaw = data.teams || [];
    const teams: Team[] = teamsRaw.map((t: any) => ({
      id: String(t.id),
      name: t.name,
      stadium: undefined,      // FPL doesn't provide stadium info
      manager: undefined,      // nor manager info
      leagueId: "EPL"
    }));

    return teams;
  }

  async fetchPlayers(): Promise<Player[]> {
    const url = `${BASE_URL}/bootstrap-static/`;
    const response = await axios.get(url);
    const data = response.data;

    // FPL calls them "elements"
    const playersRaw = data.elements || [];
    const players: Player[] = playersRaw.map((p: any) => ({
      id: String(p.id),
      name: p.web_name,
      position: String(p.element_type), 
      stats: {
        goals: p.goals_scored,
        assists: p.assists,
        minutes: p.minutes,
      },
      teamId: String(p.team) // numeric ref to "teams" -> we can map later
    }));

    return players;
  }

  async fetchFixtures(): Promise<Match[]> {
    const url = `${BASE_URL}/fixtures/`;
    const response = await axios.get(url);
    const fixturesRaw = response.data || [];

    const matches: Match[] = fixturesRaw.map((f: any) => ({
      id: String(f.id),
      homeTeamId: String(f.team_h),
      awayTeamId: String(f.team_a),
      date: new Date(f.kickoff_time),
      score: f.finished ? { home: f.team_h_score, away: f.team_a_score } : undefined,
      status: f.finished ? "completed" : "scheduled"
    }));

    return matches;
  }
}
