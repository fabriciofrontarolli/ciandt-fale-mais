import { Component, Inject, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatDialog } from '@angular/material';

import { DddselectorComponent } from '../dddselector/dddselector.component';

import CalculationService from '../services/CalculationService';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  animations: [
    trigger('simulations', [
      transition('* => *',[
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class CalculatorComponent implements OnInit {
  origem = void 0;
  destino = void 0;
  minutos = void 0;

  plans : any = [];
  phoneCodes : any = [];
  pricings : any = [];

  simulations : any = [];

  constructor(private _calculationService : CalculationService, public dialog: MatDialog) { }

  fetchData() {
    this._calculationService.getPlans()
                            .then((res) => res.hasOwnProperty('data') ? res['data'] : [])
                            .then((plans) => {
                              this.plans = plans;
                              this.buildSimulationOutput();
                            });
    this._calculationService.getPhoneCodes()
                            .then((res) => res.hasOwnProperty('data') ? res['data'] : [])
                            .then((data) => {
                              this.phoneCodes = data;
                            });
    this._calculationService.getTaxes()
                            .then((res) => res.hasOwnProperty('data') ? res['data'] : [])
                            .then((data) => {
                              this.pricings = data;
                            });
  }

  ngOnInit() {
    this.fetchData();
  }

  buildSimulationOutput() {
    const simulationForPlans = this.plans.map((plan) => ({
        title: plan.plan,
        totalFee: this._calculationService.calculateTotalFeeForPlan(plan, this.pricings, this.origem, this.destino, Number(this.minutos)),
      })
    );

    const simulationWithoutPlan = {
      title: 'Normal',
      totalFee: this._calculationService.calculateTotalFeeWithoutPlan(this.pricings, this.origem, this.destino, Number(this.minutos)),
    }

    this.simulations = [ ...simulationForPlans, simulationWithoutPlan ];

  }

  openDialog(propTarget: string): void {
    const codeDialog = this.dialog.open(DddselectorComponent, {
      data: {
        phoneCodes: this.phoneCodes
      },
      width: '250px'
    });

    codeDialog.afterClosed().subscribe(result => {
      if (result) {
        this[propTarget] = result;
      }
    });
  }

  getAmount(price) {
    if (!price) { return '0'; }
    const amount = price.toString().split('.')[0] || '0';
    return amount;
  }

  getCents(price) {
    if (!price) { return '0'; }

    const cents = price.toFixed(2).toString().split('.')[1] || '0';
    return `,${cents}`;
  }

}
