import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Factory } from '../../classes/factory';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  @Input() factory: Factory;
  @Output() factoryDelete = new EventEmitter<Factory>();
  constructor() {
  }

  ngOnInit() {
  }

}
