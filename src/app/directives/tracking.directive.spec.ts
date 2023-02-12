import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockTrackEvent } from '../mockdata/trackEvent';
import { TrackingService } from '../services/tracking/tracking.service';
import { TrackingDirective } from './tracking.directive';

@Component({
  template: `<button appTracking [trackingId]="'clickbutton'">CLick</button>`
})
class TestClickComponent {
}

class MockTrack {
  track() {}
};

describe('TrackingDirective: click', () => {
  let component: TestClickComponent;
  let fixture: ComponentFixture<TestClickComponent>;
  let inputEl: DebugElement;
  let inputElNativeElem: HTMLElement;
  let directive: TrackingDirective;
  let service: TrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingDirective, TestClickComponent],
      providers: [{TrackingService, useClass: MockTrack}],
      imports: [HttpClientModule],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    fixture = TestBed.createComponent(TestClickComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('button'));
    inputElNativeElem = inputEl.nativeElement;
    service = TestBed.inject(TrackingService);
    directive = fixture.debugElement.query(By.directive(TrackingDirective)).injector.get(TrackingDirective) as TrackingDirective;
  });

  it('should create button with trackingId', () => {
    directive.trackingId = 'user-API-success';
    inputEl.triggerEventHandler('click', {});
    spyOn(directive, 'trackClick').and.callThrough();
    fixture.detectChanges();
  });

  it('should create button with componentName', () => {
    directive.componentName = 'user-API-success';
    inputEl.triggerEventHandler('click', {});
    spyOn(directive, 'trackClick').and.callThrough();
    fixture.detectChanges();
  });
});