import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Factory } from '../../classes/factory';
import { FactoryService } from '../../services/factory.service';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.css']
})
export class FactoriesComponent implements OnInit {
  factories: Factory[] = [
    { _id: "1", name:"Factory 1", upperBound: 15, lowerBound: 7, children: []},
    { _id: "2", name:"Factory 2", upperBound: 500, lowerBound: 3, children: [123, 44, 67]},
    { _id: "3", name:"Factory 3", upperBound: 500, lowerBound: 3, children: [123, 44, 67]},
  ];

  constructor(private factoryService: FactoryService) { }

  ngOnInit() {
    // this.factoryService.getFactories()
    //   .subscribe(
    //     (factories: Factory[]) => {
    //       this.factories = factories; 
    //       console.log(factories);
    //     },
    //     (error: Response) => console.log(error)
    //   );
  }
  
  onDeleted(factory: Factory) {
    const position = this.factories.findIndex(
      (factoryAtIndex: Factory) => {
        return factoryAtIndex._id == factory._id;
      }
    );
    this.factories.splice(position, 1);
  }

}
