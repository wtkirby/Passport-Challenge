import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Factory } from '../../classes/factory';
import { FactoryService } from '../../services/factory.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.css']
})
export class FactoriesComponent implements OnInit {
  factories: Factory[];
  newFactory: {
    name: String;
    lowerBound: String;
    upperBound: String;
  }

  @ViewChild(ModalComponent)
  addFactoryModal: ModalComponent;

  constructor(private factoryService: FactoryService) {
    this.newFactory = {name: "", lowerBound: "", upperBound: ""};
  }

  ngOnInit() {
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
  
  onDeleted(factory: Factory) {
    var position = this.factories.findIndex(
      (factoryAtIndex: Factory) => {
        return factoryAtIndex._id == factory._id;
      }
    );
    this.factories.splice(position, 1);
  }

  addFactory(){
    this.newFactory = {name: "", lowerBound: "", upperBound: ""};
    this.addFactoryModal.show();
  }

  createFactory(){
    if(this.newFactory.lowerBound.valueOf() < this.newFactory.upperBound.valueOf()){
      this.factoryService.addFactory(JSON.stringify(this.newFactory))
        .subscribe(
          (factory: Factory) => {
            this.factories.push(factory) 
          },
          (error: Response) => {
            console.log(error);
          }
        );
    }
    this.addFactoryModal.hide();
  }

}
