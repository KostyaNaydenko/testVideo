import { render, screen, fireEvent, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTime, fetchEventsRequest } from '../../redux/actions/analyticsActions';
import { AppDispatch, RootState } from '../../redux/store';
import { AnalyticsState } from '../../redux/types';
import VideoPlayer from './VideoPlayer';

jest.mock('react-redux', () => {
  const actualReactRedux = jest.requireActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: jest.fn() as jest.Mock<MockUseDispatch>,
    useSelector: jest.fn() as jest.Mock<MockUseSelector>,
  };
});

type MockUseDispatch = () => AppDispatch;
type MockUseSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

// @ts-ignore
const mockUseDispatch = useDispatch as jest.Mock<MockUseDispatch>;
// @ts-ignore
const mockUseSelector = useSelector as jest.Mock<MockUseSelector>;


const videoUrl = 'test-video.mp4';

describe('VideoPlayer Component', () => {
  // @ts-ignore
  const mockedDispatch = jest.fn<AppDispatch>();

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockedDispatch);
    mockUseSelector.mockImplementation((selector) => {
      const mockState: RootState = {
        analytics: {
          events: [],
          currentTime: 0,
          loading: false,
          error: null,
        } as AnalyticsState,
      };
      return selector(mockState);
    });

    mockedDispatch.mockClear();
  });

  it('should render VideoPlayer component', () => {
    render(<VideoPlayer videoUrl={videoUrl} />);
    expect(screen.getByRole('video')).toBeInTheDocument();
  });

  it('should dispatch fetchEventsRequest if events array is empty on mount', () => {
    render(<VideoPlayer videoUrl={videoUrl} />);
    expect(mockedDispatch).toHaveBeenCalledWith(fetchEventsRequest());
  });

  it('should dispatch setCurrentTime when video time updates', () => {
    render(<VideoPlayer videoUrl={videoUrl} />);
    const videoElement = screen.getByRole('video');

    act(() => {
      fireEvent.timeUpdate(videoElement, { target: { currentTime: 10 } });
    });

    expect(mockedDispatch).toHaveBeenCalledWith(setCurrentTime(10));
  });

  it('should dispatch setCurrentTime on event click', () => {
    mockUseSelector.mockImplementation((selector) => {
        const mockState: RootState = {
          analytics: {
            events: [ { timestamp: 5, duration: 2, zone: { left: 10, top: 20, width: 30, height: 40 } }],
            currentTime: 0,
            loading: false,
            error: null,
          } as AnalyticsState,
        };
        return selector(mockState);
      });

    render(<VideoPlayer videoUrl={videoUrl} />);
    const listItem = screen.getByText('00:05:000');

    act(() => {
        fireEvent.click(listItem);
      });

      expect(mockedDispatch).toHaveBeenCalledWith(setCurrentTime(5));

  });
});