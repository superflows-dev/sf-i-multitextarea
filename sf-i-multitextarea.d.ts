/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * SfIMultitextarea element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
export declare class SfIMultitextarea extends LitElement {
    SCROLL_POS: number;
    _SfMultitextareaX: any;
    showFields: number;
    fields: string;
    getFields: () => any;
    values: string;
    getValues: () => any;
    flow: string;
    static styles: import("lit").CSSResult;
    getFieldsHtml: () => string;
    loadFieldsHtml: () => void;
    initListeners: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-multitextarea': SfIMultitextarea;
    }
}
//# sourceMappingURL=sf-i-multitextarea.d.ts.map