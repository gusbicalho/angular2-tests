/// <reference path="../../../typings/tsd.d.ts" />
import {Component, View, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'editable-text',
  properties: ['item'],
  events: ['changeHandler: change']
})
@View({
  templateUrl: './components/editable-text/template.html?v=<%= VERSION %>',
  directives: []
})
export class EditableText {
  changeHandler: EventEmitter = new EventEmitter();
  editing: boolean = false;
  item: string;
  editValue: string = "";
  startEditing(editInput: HTMLInputElement) {
    this.editing = true;
    editInput.value = this.item;
    setTimeout(() => editInput.focus());
  }
  inputBlur($event) {
    this.editing = false;
  }
  inputKeyPress($event) {
    if ($event.which !== 13)
      return;
    var newValue = $event.target.value;
    this.editing = false;
    this.changeHandler.next(newValue);
  }
}