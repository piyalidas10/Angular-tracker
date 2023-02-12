import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from '../services/tracking/tracking.service';

@Directive({
  selector: '[appTracking]'
})
export class TrackingDirective {
  @Input() componentName: string;
  @Input() trackingId: string;

  constructor(private trackingService: TrackingService) { }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    this.trackClick(event);
  }

  trackClick(event: Event) {
    this.trackingService.track(event.type, this.trackingId? this.trackingId: this.componentName);
  }

}
