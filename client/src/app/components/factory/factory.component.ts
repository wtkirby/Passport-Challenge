import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Response } from '@angular/http';
import { Factory } from '../../classes/factory';
import { ModalComponent } from '../modal/modal.component';
import { FactoryService } from '../../services/factory.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {

  @Input() factory: Factory;
  @Output() factoryDeleted = new EventEmitter<Factory>();
  @ViewChild(ModalComponent) modal: ModalComponent;

  tempFactory: Factory;
  editingName: boolean;
  editingBounds: boolean;
  factoryOptions: boolean;
  amountToGenerate: String;

  constructor(private factoryService: FactoryService, private flashMessagesService: FlashMessagesService) {

    this.editingName = false;
    this.editingBounds = false;
    this.factoryOptions = false;
    this.amountToGenerate = "";
    
  }

  ngOnInit() {

    this.tempFactory = Object.assign({}, this.factory);

  }

  nameClicked(){

    this.editingName = true;

  }

  boundsClicked(){

    this.modal.show();
    this.editingBounds = true; 

  }

  cancelUpdateName(){

    this.editingName = false;
    this.tempFactory = Object.assign({}, this.factory);

  }

  updateName(){

    this.editingName = false;
    if(this.tempFactory.name.length > 0){
      this.factoryService.updateFactory(this.factory._id, JSON.stringify(this.tempFactory))
          .subscribe(
              (updatedFactory: Factory) => {
              this.factory = updatedFactory;
              this.tempFactory = Object.assign({}, this.factory);
            },
            (error: Response) => {
              console.log(error);
            }
          );
    }
    else{
      this.flashMessagesService.show('Sorry, that name is too short.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    this.tempFactory = Object.assign({}, this.factory);

  }

  updateBounds(){

    this.editingBounds = false;
    this.modal.hide();

    if(this.tempFactory.lowerBound >= this.tempFactory.upperBound){
      this.flashMessagesService.show('Sorry, the lower bound must be strictly less than upper bound.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else if(!Number.isInteger(+this.tempFactory.lowerBound + +this.tempFactory.upperBound)){
      this.flashMessagesService.show('Sorry, the bounds must be integers.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{
      this.factoryService.updateFactory(this.factory._id, JSON.stringify(this.tempFactory))
          .subscribe(
              (updatedFactory: Factory) => {
              this.factory = updatedFactory;
              this.tempFactory = Object.assign({}, this.factory); 
            },
            (error: Response) => {
              console.log(error);
            }
          );
    }
    this.tempFactory = Object.assign({}, this.factory); 

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
    else{
      this.flashMessagesService.show('Sorry, the amount of children must be between 1 and 15.', { cssClass: 'alert-danger', timeout: 3000 });
    }

  }

  deleteFactory(){

    this.factoryService.deleteFactory(this.factory._id)
        .subscribe(
          (factory: Factory) => {  
            this.factoryDeleted.emit(this.factory);
            this.flashMessagesService.show('Factory deleted.', { cssClass: 'alert-warning', timeout: 3000 });
          },
          (error: Response) => {
            console.log(error);
          }
        );

  }


  selectContent($event){

    $event.target.select();

  }

}
