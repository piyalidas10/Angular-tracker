import { TrackEventValue } from './track-event-value';

export class TrackEvent {
  sequence: number;
  clientTye: string;
  url: string;
  customValue?: string;
  key: string;
  value: TrackEventValue;
  created: number;
}
