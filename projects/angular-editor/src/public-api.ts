import { AngularEditorConfig as _AngularEditorConfig } from './lib/config/config';

export * from './lib/services/angular-editor.service';
export * from './lib/angular-editor.component';
export * from './lib/components/ae-button/ae-button.component';
export * from './lib/components/ae-toolbar-set/ae-toolbar-set.component';
export * from './lib/components/ae-select/ae-select.component';
export * from './lib/components/ae-toolbar/ae-toolbar.component';
export * from './lib/services/ae-selection.service';

export { provideAngularEditor } from './lib/provide-angluar-editor';

export {
    type CustomClass,
    type Font,
    type HiddenButtons,
    type EditOptions,
    type FontOptions,
    type MediaOptions,
    type SpecialFormats,
    type StyleOptions,
    type TextAlignOptions
} from './lib/config/config';

export declare type AngularEditorConfig = Partial<_AngularEditorConfig>;
