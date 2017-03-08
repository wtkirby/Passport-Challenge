import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Response } from '@angular/http';
import { Factory } from '../../classes/factory';
import { ModalComponent } from '../modal/modal.component';
import { FactoryService } from '../../services/factory.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  @Input() factory: Factory;
  @Output() factoryDeleted = new EventEmitter<Factory>();
  tempFactory: Factory;
  editingName: boolean;
  editingBounds: boolean;
  factoryOptions: boolean;
  amountToGenerate: String;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private factoryService: FactoryService) {
    this.editingName = false;
    this.editingBounds = false;
    this.factoryOptions = false;
    this.amountToGenerate = "";
  }

  ngOnInit() {
        this.tempFactory = this.factory;
  }

  selectContent($event){
    $event.target.select();
  }

  nameClicked(){
    this.editingName = true;
    this.tempFactory = this.factory;
  }

  boundsClicked(){
    this.modal.show();
    this.editingBounds = true; 
    this.tempFactory = this.factory;
  }

  updateName(){
    this.editingName = false;
    if(this.tempFactory.name.length > 0){
      this.factoryService.updateFactory(this.factory._id, JSON.stringify({ "name": this.tempFactory.name }))
          .subscribe(
              (updatedFactory: Factory) => {
              this.factory = this.tempFactory = updatedFactory;
            },
            (error: Response) => {
              console.log(error);
            }
          );
    }
    else{
      console.log('Name too short');
      this.tempFactory = this.factory;
    }
  }

  updateBounds(){
    this.editingBounds = false;
    this.modal.hide();
    if(this.tempFactory.lowerBound < this.tempFactory.upperBound){
      this.factoryService.updateFactory(this.factory._id, JSON.stringify({ "lowerBound": this.tempFactory.lowerBound, "upperBound": this.tempFactory.upperBound }))
          .subscribe(
              (updatedFactory: Factory) => {
              this.factory = this.tempFactory = updatedFactory;
            },
            (error: Response) => {
              console.log(error);
            }
          );
    }
    else{
      console.log('Error lower bound is higher that upper bound.');
      this.tempFactory = this.factory;
    }
  }

  generateChildren(){
    if(Number(this.amountToGenerate.valueOf()) > 0 && Number(this.amountToGenerate.valueOf()) < 16){
      this.factoryService.generateChildren(this.factory._id, Number(this.amountToGenerate.valueOf()))
        .subscribe(
            (factory: Factory) => {
            this.factory = factory;
          },
          (error: Response) => {
            console.log(error);
          }
        );
    }
  }

  deleteFactory(){
    this.factoryService.deleteFactory(this.factory._id)
        .subscribe(
          (factory: Factory) => {  
            this.factoryDeleted.emit(this.factory);
          },
          (error: Response) => {
            console.log(error);
          }
        );
  }

}
