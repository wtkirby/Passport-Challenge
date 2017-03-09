import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { FactoryComponent} from './components/factory/factory.component';
import { FactoriesComponent } from './components/factories/factories.component';
import { FactoryService } from './services/factory.service';
import { FocusDirective } from './directives/focus.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    FactoriesComponent,
    FocusDirective,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [FactoryService],
  bootstrap: [AppComponent],
})

export class AppModule { }
