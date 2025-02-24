import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularEditorComponent } from './angular-editor.component';
import { AeToolbarComponent } from './components/ae-toolbar/ae-toolbar.component';
import { FormsModule } from '@angular/forms';
import {
    provideHttpClient,
    withInterceptorsFromDi
} from '@angular/common/http';
import { AeSelectComponent } from './ae-select/ae-select.component';

describe('AngularEditorComponent', () => {
    let component: AngularEditorComponent;
    let fixture: ComponentFixture<AngularEditorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AngularEditorComponent,
                AeToolbarComponent,
                AeSelectComponent
            ],
            imports: [FormsModule],
            providers: [provideHttpClient(withInterceptorsFromDi())]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AngularEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should paste raw text', () => {
        const htmlText = '<h1>Hello!</h1>';
        const rawText = 'Hello!';
        component.config.rawPaste = true;

        const dataTransfer = new DataTransfer();

        const clipboardEvent = new ClipboardEvent('paste', {
            clipboardData: dataTransfer
        });
        clipboardEvent.clipboardData.setData('text/plain', rawText);
        clipboardEvent.clipboardData.setData('text/html', htmlText);

        const outputRawText = component.onPaste(clipboardEvent);

        expect(outputRawText).toEqual(rawText);
    });
});
