import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PLANS_URL, PHONES_CODE_URL, TAX_URL } from '../common/apis';

@Injectable()
export default class CalculationService {
  constructor(private http: HttpClient) { }

  getPlans() {
    return this.http.get(PLANS_URL).toPromise();
  }

  getPhoneCodes() {
    return this.http.get(PHONES_CODE_URL).toPromise();
  }

  getTaxes() {
    return this.http.get(TAX_URL).toPromise();
  }

  calculateTotalFeeForPlan(plan: any, pricings: any, origin: string, destiny: string, minutes: number) {
    let totalFee = 0;

    if (!this.areParametersValidForCalculation(origin, destiny, minutes)) { return totalFee; }

    const pricingForPhoneCall = pricings.find((pricing) => {
      return (pricing.origin === origin &&  pricing.destiny === destiny);
    });

    /* No pricing found for this setup */
    if (!pricingForPhoneCall) { return totalFee; }

    /* calculate total fee for plan */
    const planLimit = Number(plan.time);
    const pricingRate = Number(pricingForPhoneCall.price);

    const minutesExceedsTotalPlan = (minutes > planLimit);
    if (minutesExceedsTotalPlan) {
      const minutesExceeded = (minutes - planLimit);
      const exceededRate = (pricingRate + (pricingRate / 100 * 10))
      const exceededFee = (minutesExceeded * exceededRate);
      totalFee = parseFloat(exceededFee.toFixed(2));
    }

    return totalFee;
  }

  calculateTotalFeeWithoutPlan(pricings: any, origin: string, destiny: string, minutes: number) {
    let totalFee = 0;

    if (!this.areParametersValidForCalculation(origin, destiny, minutes)) { return totalFee; }

    const pricingForPhoneCall = pricings.find((pricing) => {
      return (pricing.origin === origin &&  pricing.destiny === destiny);
    });

    /* No pricing found for this setup */
    if (!pricingForPhoneCall) { return totalFee; }

    const pricingRate = Number(pricingForPhoneCall.price);
    const rateWithoutPlan = (pricingRate + (pricingRate / 100 * 10))
    const exceededFee = (minutes * pricingRate);
    totalFee = parseFloat(exceededFee.toFixed(2));

    return totalFee;
  }

  areParametersValidForCalculation(origin: string, destiny: string, minutes: number) : boolean {
    return Boolean(origin && destiny && minutes);
  }
}
