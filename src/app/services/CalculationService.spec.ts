import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculationService } from './CalculationService';

const PLAN_MOCK = {
  plan: "FaleMais 30",
  time: "30"
};

const PRICINGS_MOCK = [
  {
    origin: "011",
    destiny: "016",
    price: "1.90"
  }
];

describe('services/CalculationService', () => {

  let calculationService : CalculationService;

  beforeEach(() => {
    TestBed
    .configureTestingModule({
      providers: [
        CalculationService
      ]
    })
    .compileComponents()
    .then(() => {
      calculationService = TestBed.get(CalculationService);
    });
  });

  it(`should return true when parameters are valid for calculation`, () => {
    const isValid = calculationService.areParametersValidForCalculation('011', '016', 200);
    expect(isValid).toBe(true);
  });

  it(`should return 0 when minutes dont exceed total plan`, () => {
    const calculationResult = calculationService.calculateTotalFeeForPlan(PLAN_MOCK, PRICINGS_MOCK, '011', '016', 60);
    expect(calculationResult).toBe(0);
  });

  it(`should return total value without plan`, () => {
    const calculationResult = calculationService.calculateTotalFeeWithoutPlan(PRICINGS_MOCK, '018', '011', 200);
    expect(calculationResult).toBe(380);
  });
});
