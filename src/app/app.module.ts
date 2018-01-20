import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

// Services
import CalculationService from './services/CalculationService';

// Components
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DddselectorComponent } from './dddselector/dddselector.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DddselectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    CalculationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DddselectorComponent ]
})
export class AppModule { }
