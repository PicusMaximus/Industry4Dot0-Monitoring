export interface LogEvent {
  id: number;
  timestamp: string;
  level: string;
  message: string;
  device: string;
  job?: string;
}
