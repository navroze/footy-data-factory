export interface Team {
    id: string;       // e.g., "team_1"
    name: string;     // e.g., "Manchester City"
    stadium?: string;
    manager?: string;
    leagueId: string; // link to a League (e.g., "EPL")
  }
  