import { TestBed } from '@angular/core/testing';
import {
    AeReplaceService,
    ReplaceCondition,
    replacers
} from './ae-replace.service';
import { AeSelectionService } from './ae-selection.service';

describe('MyService', () => {
    let service: AeReplaceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AeSelectionService]
        });
        service = TestBed.inject(AeReplaceService);
    });

    it('It should eval for conditions.', () => {
        const input = document.createElement('div');
        input.appendChild(document.createTextNode('Hello World'));
        const childNode = input.childNodes.item(0);

        expect(service.isReplaceCandidate("'")).toBeTrue();
    });

    it('Can replace condition WS_BEFORE', () => {
        const replaced = service['_evalForCondition'](
            {
                replaceWith: '“',
                condition: ReplaceCondition.WS_BEFORE
            },
            '"Hello World"',
            0
        );

        expect(replaced.text).toEqual('“Hello World"');
    });

    it('Can replace condition NON_WS_CHAR_BEFORE', () => {
        const replaced = service['_evalForCondition'](
            {
                replaceWith: '”',
                condition: ReplaceCondition.NON_WS_CHAR_BEFORE
            },
            '"Hello World"',
            '"Hello World'.length
        );

        expect(replaced.text).toEqual('"Hello World”');
    });
});
