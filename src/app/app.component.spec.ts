import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { mockUsers } from './mockdata/users';
import { ApiService } from './services/api/api.service';
import { ErrorShowService } from './services/error-show/error-show.service';
import { LoaderService } from './services/loader/loader.service';
import { TrackingService } from './services/tracking/tracking.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let apiService: ApiService;
    let trackingService: TrackingService;
    let loaderService: LoaderService;
    let errorShowService: ErrorShowService;
    let buttonElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                ApiService,
                TrackingService,
                LoaderService,
                ErrorShowService,
            ],
            imports: [HttpClientModule],
        })
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        trackingService = TestBed.inject(TrackingService);
        loaderService = TestBed.inject(LoaderService);
        errorShowService = TestBed.inject(ErrorShowService);
        buttonElement = fixture.debugElement.query(By.css('button'));
    });

    it('should initialize the app', () => {
        component.ngOnInit();
    });

    it('should call callUsers and return list of users', () => {
        buttonElement.triggerEventHandler('click', {});
        spyOn(apiService, 'getUsers').and.returnValue(of(mockUsers));
        component.callUsers();
        fixture.detectChanges();
        expect(component.users).toEqual(mockUsers);
    });

    it('should call callUsers and return blank reponse', () => {
        buttonElement.triggerEventHandler('click', {});
        spyOn(apiService, 'getUsers').and.returnValue(of([]));
        component.callUsers();
        fixture.detectChanges();
    });
});
