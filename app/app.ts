/// <reference path="../typings/tsd.d.ts" />
import {Component, View, NgFor, bootstrap} from 'angular2/angular2';
import {DirtyListEditor} from './components/dirty-list-editor/index';

@Component({
  selector: 'app'
})
@View({
  templateUrl: './app.html?v=<%= VERSION %>',
  directives: [NgFor, DirtyListEditor]
})
class App {}

bootstrap(App);
