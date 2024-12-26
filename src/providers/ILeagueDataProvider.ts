import { League } from "../models/League";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Match } from "../models/Match";

export interface ILeagueDataProvider {
  fetchLeagueData(): Promise<League>;
  fetchTeams(): Promise<Team[]>;
  fetchPlayers(): Promise<Player[]>;
  fetchFixtures(): Promise<Match[]>;
}