import { Injectable } from '@angular/core';
import { AeSelectionService } from './ae-selection.service';

export enum ReplaceCondition {
    WS_BEFORE,
    WS_AFTER,
    NON_WS_CHAR_BEFORE,
    NON_WS_CHAR_AFTER
}

export declare interface Replacer {
    replaceWith: string;
    condition: ReplaceCondition;
    replaceLength?: number;
}

export const replacers: {
    [input: string]: Replacer[];
} = {
    "'": [
        {
            replaceWith: '’',
            condition: ReplaceCondition.NON_WS_CHAR_BEFORE
        },
        {
            replaceWith: '‘',
            condition: ReplaceCondition.WS_BEFORE
        }
    ],
    '"': [
        {
            replaceWith: '”',
            condition: ReplaceCondition.NON_WS_CHAR_BEFORE
        },
        {
            replaceWith: '“',
            condition: ReplaceCondition.WS_BEFORE
        }
    ]
};

function lastChar(str: string, offset = 1) {
    return str.charAt(str.length - offset);
}

@Injectable({
    providedIn: 'root'
})
export class AeReplaceService {
    constructor(private _selectionService: AeSelectionService) {}

    public evalForReplace(event: InputEvent, html: string) {
        const inputValue = event.data;
        if (!this.isReplaceCandidate(inputValue)) return;

        const selection = this._selectionService.getSelection();
        if (!selection) return;

        const caretIndex = selection.focusOffset;
        const insertIndex = caretIndex - 1;

        const focusNode = selection.focusNode;
        if (!focusNode) return;
        const selectedNodeValue = focusNode.nodeValue;
        if (!selectedNodeValue) return;

        this.executeReplace(selection.focusNode, insertIndex, inputValue);
    }

    isReplaceCandidate(character: string | null): character is string {
        if (character === null) return false;
        return Object.keys(replacers).includes(character);
    }

    /**
     *
     * @param focusNode The node whose content has been edited
     * @param start The index of the content change
     * @param inputValue A character inserted by a user
     * @param focusNodeText The
     */
    public executeReplace(focusNode: Node, start: number, inputValue: string) {
        const _replacers = replacers[inputValue];

        const focusNodeValue = focusNode.nodeValue;
        if (!focusNodeValue) return;

        for (let replacer of _replacers) {
            const newNodeText = this._evalForCondition(
                replacer,
                focusNodeValue,
                start
            );
            if (!newNodeText) continue;

            const { cursor, text } = newNodeText;
            if (cursor === undefined || !text) continue;

            focusNode.nodeValue = text;

            this._selectionService.setCursorPosition(focusNode, cursor);

            break;
        }
    }

    private _evalForCondition(
        replacer: Replacer,
        focusNodeValue: string,
        startIndex: number
    ): {
        cursor?: number;
        text?: string;
    } {
        const { pre, post } = this._splitNodeValue(
            focusNodeValue,
            startIndex,
            replacer.replaceLength
        );

        switch (replacer.condition) {
            case ReplaceCondition.WS_BEFORE:
                if (pre.length === 0 || /\s/.test(lastChar(pre))) {
                    return {
                        cursor: (pre + replacer.replaceWith).length,
                        text: pre + replacer.replaceWith + post
                    };
                }
                break;
            case ReplaceCondition.WS_AFTER:
                break;
            case ReplaceCondition.NON_WS_CHAR_BEFORE:
                if (/\S/.test(lastChar(pre))) {
                    return {
                        cursor: (pre + replacer.replaceWith).length,
                        text: pre + replacer.replaceWith + post
                    };
                }
                break;
            case ReplaceCondition.NON_WS_CHAR_AFTER:
                break;
        }

        return {};
    }

    /**
     * Splits the node.
     * @param nodeValue The focused node's value
     * @param startIndex The index of the value to replace
     * @param length The length of the value to be replaced
     * @returns The string segments before and after the replacement node
     */
    private _splitNodeValue(nodeValue: string, startIndex: number, length = 1) {
        return {
            pre: nodeValue.substring(0, startIndex),
            post: nodeValue.substring(startIndex + length)
        };
    }
}
