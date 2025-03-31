export interface Zone {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface AnalyticsEvent {
    timestamp: number;
    duration?: number;
    zone: Zone;
}

export interface AnalyticsState {
    events: AnalyticsEvent[];
    currentTime: number;
    loading: boolean;
    error: string | null;
}