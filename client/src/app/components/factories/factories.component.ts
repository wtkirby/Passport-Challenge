import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Factory } from '../../classes/factory';
import { FactoryService } from '../../services/factory.service';
import { ModalComponent } from '../modal/modal.component';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.css']
})

export class FactoriesComponent implements OnInit {
  
  @ViewChild(ModalComponent) addFactoryModal: ModalComponent;
  factories: Factory[];
  newFactory: { name: String; lowerBound: String; upperBound: String; };


  constructor(private factoryService: FactoryService, private flashMessagesService: FlashMessagesService) {

    this.factories = [];
    this.newFactory = { name: "", lowerBound: "", upperBound: "" };

  }

  ngOnInit() {

    // On app load bring in factories from server.
    this.factoryService.getFactories()
      .subscribe(
        (factories: Factory[]) => {
          this.factories = factories; 
        },
        (error: Response) =>{ 
          console.log(error);
        }
      );

  }
  
  // Update factory list when factory is deleted
  onDeleted(factory: Factory) {

    var position = this.factories.findIndex(
      (factoryAtIndex: Factory) => {
        return factoryAtIndex._id == factory._id;
      }
    );
    this.factories.splice(position, 1);

  }

  // Launch modal to add factory
  addFactory(){

    this.newFactory = {name: "", lowerBound: "", upperBound: ""};
    this.addFactoryModal.show();

  }

  createFactory(){

    if(this.newFactory.lowerBound.valueOf() < this.newFactory.upperBound.valueOf() && this.newFactory.name.length > 0){
      this.factoryService.addFactory(JSON.stringify(this.newFactory))
        .subscribe(
          (factory: Factory) => {
            this.factories.push(factory)
            this.flashMessagesService.show('Factory created!', { cssClass: 'alert-success', timeout: 3000 });
          },
          (error: Response) => {
            console.log(error);
          }
        );
    }
    else if(this.newFactory.lowerBound.valueOf() >= this.newFactory.upperBound.valueOf()){
      this.flashMessagesService.show('Sorry, the lower bound must be strictly less than upper bound.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    else{
      this.flashMessagesService.show('Sorry, that name is too short.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    
    this.addFactoryModal.hide();
  }

}
