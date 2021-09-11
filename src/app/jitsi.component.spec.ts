import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JitsiComponent } from './jitsi.component';

describe('JitsiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        JitsiComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JitsiComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jitsi'`, () => {
    const fixture = TestBed.createComponent(JitsiComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jitsi');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JitsiComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('jitsi app is running!');
  });
});
