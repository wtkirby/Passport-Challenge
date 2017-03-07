import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FactoryComponent } from './components/factory/factory.component';
import { FactoriesComponent } from './components/factories/factories.component';
import { FactoryService } from './services/factory.service';

@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    FactoriesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
