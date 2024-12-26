export interface PlayerStats {
    goals: number;
    assists: number;
    minutes: number;
    // add any other relevant FPL stats
  }
  
  export interface Player {
    id: string;
    name: string;
    position: string; // e.g., "Forward", "Midfielder"
    stats: PlayerStats;
    teamId: string;   // link to a Team
  }
  