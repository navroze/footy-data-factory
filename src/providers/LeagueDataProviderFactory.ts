import { ILeagueDataProvider } from "./ILeagueDataProvider";
import { PremierLeagueDataProvider } from "./PremierLeagueDataProvider";

export class LeagueDataProviderFactory {
  /**
   * Factory method to create an instance of ILeagueDataProvider for a given league.
   * @param leagueId The ID of the league (e.g. "EPL", "LIGA", "BUND", etc.)
   * @returns An instance of ILeagueDataProvider for the given league
   * @throws Error if no provider is configured for the given league ID
   */
  static createProvider(leagueId: string): ILeagueDataProvider {
    switch (leagueId) {
      case "EPL":
        return new PremierLeagueDataProvider();
      // case "LIGA":  return new LaLigaDataProvider();
      // case "BUND":  return new BundesligaDataProvider();
      default:
        throw new Error(`No provider for league ID: ${leagueId}`);
    }
  }
}
