import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularEditorComponent } from './angular-editor.component';
import { AeToolbarSetComponent } from './components/ae-toolbar-set/ae-toolbar-set.component';
import { AeButtonComponent } from './components/ae-button/ae-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularEditorComponent,
        AeToolbarSetComponent,
        AeButtonComponent
    ],
    declarations: [],
    exports: [AngularEditorComponent, AeToolbarSetComponent, AeButtonComponent]
})
export class AngularEditorModule {}
