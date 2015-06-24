/// <reference path="../../../typings/tsd.d.ts" />
import {Component, View, EventEmitter, NgFor} from 'angular2/angular2';
import {EditableText} from '../editable-text/index'

@Component({
  selector: 'dirty-list-editor',
  properties: ['items'],
  events: ['addHandler: added','removeHandler: removed','replaceHandler: replaced']
})
@View({
  templateUrl: './components/dirty-list-editor/template.html?v=<%= VERSION %>',
  directives: [NgFor, EditableText]
})
export class DirtyListEditor {
  items: string[] = [];
  addHandler: EventEmitter = new EventEmitter();
  removeHandler: EventEmitter = new EventEmitter();
  replaceHandler: EventEmitter = new EventEmitter();
  addItem(item: string) {
    this.items.push(item);
    this.addHandler.next(new DirtyListEditorEvent(DirtyListEditorEvent.ADDED, item, this.items.length-1));
  }
  delItem(index: number) {
    var item = this.items[index];
    this.items.splice(index, 1);
    this.removeHandler.next(new DirtyListEditorEvent(DirtyListEditorEvent.REMOVED, item, index))
  }
  newItemInputKeyPress($event: any) {
    if ($event.which === 13) {
      this.addItem($event.target.value);
      $event.target.value = null;
    }
  }
  replaceItem(index: number, newValue: string) {
    this.items[index] = newValue;
    this.replaceHandler.next(new DirtyListEditorEvent(DirtyListEditorEvent.REPLACED, newValue, index))
  }
}

export class DirtyListEditorEvent {
  static ADDED = 'ADDED';
  static REMOVED = 'REMOVED';
  static REPLACED = 'REPLACED';
  constructor(public type: string,
              public value: string,
              public index: number) {
    switch (type) {
      case DirtyListEditorEvent.ADDED:
      case DirtyListEditorEvent.REMOVED:
      case DirtyListEditorEvent.REPLACED:
        break;
      default:
        throw new TypeError("Type must be ADDED, REMOVED or REPLACED");
    }
  }
}
