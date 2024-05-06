/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import {customElement, property, query} from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
// import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';


/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/

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
@customElement('sf-i-multitextarea')
export class SfIMultitextarea extends LitElement {

  SCROLL_POS = 0;

  @query('.SfIMultitextareaC')
  _SfMultitextareaX: any;
  
  @property()
  showFields: number = 3;

  @property()
  fields!: string;

  getFields = () => {
    return JSON.parse(this.fields);
  }

  @property()
  values!: string;

  getValues = () => {
    try {
      return JSON.parse(this.values);
    } catch (e: any) {

      let retValue: any = {};

      for(var i = 0; i < this.getFields().length; i++) {
        retValue[this.getFields()[i]] = this.values;
      }

      return retValue;

    }
  }

  @property()
  flow: string = "";

  static override styles = css`
    
    .SfIMultitextareaC {
      display: flex;
      align-items: center;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .left-sticky {
      left: 0px;
      position: sticky;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .unfocused {
      width: 40px;
      font-size: 70%;
    }

    .unfocused-label {
      display: block;
      width: 40px;
      font-size: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-transform: capitalize;
    }

    .focused {
      width: 150px;
    }

    .focused-label {
      display: block;
      width: 100px;
      text-transform: capitalize;
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    .td-head {
      text-transform: capitalize;
    }

    .td-body {
      padding: 5px;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

    }

    .ml-5 {
      margin-left: 5px;
    }

    .mr-5 {
      margin-right: 5px;
    }

  `;

  getFieldsHtml = () => {
    
    var html = '';
    const jsonFields = this.getFields();

    html += '<div class="d-flex align-center">';

    if((this.SCROLL_POS) > 0) {
      html += '<button part="multitextarea-prev" class="multitextarea-prev"><span class="material-symbols-outlined">chevron_left</span></button>';
    }

    var pos = 0;

    for(var i = this.SCROLL_POS; (i < jsonFields.length) && ((i - this.SCROLL_POS) < this.showFields); i++) {

      html += '<div part="multitextarea-container" class="'+((pos === 0) ? 'ml-5' : '')+' '+((pos === (this.showFields-1)) ? 'mr-5' : '')+' '+((pos != (this.showFields-1) && pos != (0)) ? 'ml-5 mr-5' : '')+'">';
      html += '<label part="multitextarea-label" class="unfocused-label multitextarea-label multitextarea-label-'+i+'">'+jsonFields[i]+'</label>';
      html += '<textarea type="text" part="multitextarea-input" class="unfocused multitextarea-input multitextarea-input-'+i+'" >'+(this.getValues() == null ? '' : this.getValues()[jsonFields[i]] == null ? '' : this.getValues()[jsonFields[i]])+'</textarea>';
      html += '</div>';

      pos++;

    }
    if((this.SCROLL_POS + this.showFields) < this.getFields().length) {
      html += '<button part="multitextarea-next" class="multitextarea-next"><span class="material-symbols-outlined">chevron_right</span></button>';
    }

    html += '</div>';
    return html;
      
  }

  loadFieldsHtml = () => {

    this._SfMultitextareaX.innerHTML = this.getFieldsHtml();

  }

  initListeners = () => {

    const inputs = this._SfMultitextareaX.querySelectorAll('textarea');

    for(var i = 0; i < inputs.length; i++) {

      (inputs[i] as HTMLTextAreaElement).addEventListener('focus', (e: any) => {

        console.log(e.target);
        const input = e.target as HTMLInputElement;
        const label = input.parentElement?.firstChild as HTMLLabelElement;

        input.classList.remove('unfocused');
        input.classList.add('focused');

        label.classList.remove('unfocused-label');
        label.classList.add('focused-label');
        

      });

      (inputs[i] as HTMLTextAreaElement).addEventListener('focusout', (e: any) => {

        console.log(e.target);
        const input = e.target as HTMLInputElement;
        const label = input.parentElement?.firstChild as HTMLLabelElement;

        input.classList.remove('focused');
        input.classList.add('unfocused');
        
        label.classList.remove('focused-label');
        label.classList.add('unfocused-label');

      });

    }

    const buttonPrev = this._SfMultitextareaX.querySelector('.multitextarea-prev') as HTMLButtonElement;
    buttonPrev?.addEventListener('click', () => {

      for(var i = 0; i < this.showFields; i++) {
        if(this.SCROLL_POS > 0) {
          this.SCROLL_POS--;
        }
      }

      console.log('SCROLL_POS', this.SCROLL_POS);

      this.loadFieldsHtml();
      this.initListeners();
    })

    const buttonNext = this._SfMultitextareaX.querySelector('.multitextarea-next') as HTMLButtonElement;
    buttonNext?.addEventListener('click', () => {

      for(var i = 0; i < this.showFields; i++) {
        if(this.SCROLL_POS < (this.getFields().length - 1)) {
          this.SCROLL_POS++;
        }
      }

      console.log('SCROLL_POS', this.SCROLL_POS);

      this.loadFieldsHtml();
      this.initListeners();
    })

  }

  loadMode = async () => {

    this.loadFieldsHtml();
    this.initListeners();

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    return html`
          
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      <div class="SfIMultitextareaC">
        
      </div>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-multitextarea': SfIMultitextarea;
  }
}
