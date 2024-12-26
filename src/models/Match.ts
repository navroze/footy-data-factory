export interface Score {
    home: number;
    away: number;
}
  
  export interface Match {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    date: Date;
    score?: Score;
    status: "scheduled" | "completed" | "in-progress";
}
  