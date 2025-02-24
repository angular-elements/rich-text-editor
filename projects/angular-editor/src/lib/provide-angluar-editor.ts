import { Provider } from '@angular/core';
import { AngularEditorConfig } from './config/config';
import { loadDefaultConfig } from './config/config-default';
import { AeSelectionService } from './services/ae-selection.service';
import { AeReplaceService } from './services/ae-replace.service';

export const NGX_EDITOR_CONFIG = 'NGX_EDITOR_CONFIG';

export function provideAngularEditor(
    editorConfig: Partial<AngularEditorConfig>
): Provider[] {
    return [
        {
            provide: NGX_EDITOR_CONFIG,
            useValue: loadDefaultConfig(editorConfig)
        },
        AeSelectionService,
        AeReplaceService
    ];
}
