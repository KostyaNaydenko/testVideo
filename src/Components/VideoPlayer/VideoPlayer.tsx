import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest, setCurrentTime } from '../../redux/actions/analyticsActions';
import { RootState, AppDispatch } from '../../redux/store';
import { AnalyticsEvent, Zone } from '../../redux/types';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentZones, setCurrentZones] = useState<Zone[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const events = useSelector((state: RootState) => state.analytics.events);
    const currentVideoTime = useSelector((state: RootState) => state.analytics.currentTime);

    const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const currentTime = event.currentTarget.currentTime;
        dispatch(setCurrentTime(currentTime));
    };

    const handleEventClick = (timestamp: number) => {
        dispatch(setCurrentTime(timestamp));
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
        }
    };
    const togglePlay = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;
        videoElement.paused ? videoElement.play() : videoElement.pause();
    };

    const formatTime = (timestamp: number) => {
        const minutes = Math.floor(timestamp / 60);
        const seconds = Math.floor(timestamp % 60);
        const milliseconds = Math.floor((timestamp * 1000) % 1000);
    
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        const millisecondsStr = milliseconds.toString().padStart(3, '0');
    
        return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
    };

    useEffect(() => {
        if (!events.length) dispatch(fetchEventsRequest());
        const tolerance = 0.50;
        const foundEvents = events.filter(
            (event: AnalyticsEvent) =>
                event.timestamp - tolerance <= currentVideoTime &&
                event.timestamp + (event.duration || 0) + tolerance >= currentVideoTime
        );

        setCurrentZones(foundEvents.map(event => event.zone));
    }, [currentVideoTime, events]);

return (
    <div style={{ display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center' 
                }}>
        <div style={{ width: '1280px', 
            height: '720px', 
            position: 'relative' }} >
            <video
                ref={videoRef}
                src={videoUrl}
                width="1280px"
                height="720px"
                onClick={togglePlay}
                controls
                onTimeUpdate={handleTimeUpdate}
            />
            {currentZones.map((zone: Zone, index: number) => (
                <div
                key={index}
                style={{
                    position: 'absolute',
                    left: `${zone.left}px`,
                    top: `${zone.top}px`,
                    width: `${zone.width}px`,
                    height: `${zone.height}px`,
                    border: '2px solid green',
                    pointerEvents: 'none',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    zIndex: 1000,
                }}
                />
            ))}
        </div>
        <ol style={{ listStyle: 'none', marginTop: '10px' }} >
            {events.sort((a, b) => a.timestamp - b.timestamp).map((event: AnalyticsEvent) => (
            <li key={event.timestamp} onClick={() => handleEventClick(event.timestamp)} style={{ marginBottom: '10px' }} >
                {formatTime(event.timestamp)}
            </li>
            ))}
        </ol>
    </div>
)};

export default VideoPlayer;