/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfIMultitextarea } from '../sf-i-multitextarea.js';
// import { stub } from 'sinon';
// import {fixture, assert} from '@open-wc/testing';
import { assert } from '@open-wc/testing';
// import {html} from 'lit/static-html.js';
//const TIMEOUT = 2000;
suite('sf-i-multitextarea > left menu', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-multitextarea');
        assert.instanceOf(el, SfIMultitextarea);
    });
});
//# sourceMappingURL=sf-i-multitextarea_test.js.map