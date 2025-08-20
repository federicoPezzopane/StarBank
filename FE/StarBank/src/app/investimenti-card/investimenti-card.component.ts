import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Investimento } from 'src/model/investimento.model';

@Component({
  selector: 'app-investimenti-card',
  templateUrl: './investimenti-card.component.html',
  styleUrls: ['./investimenti-card.component.scss']
  
})
export class InvestimentiCardComponent {
   @Input() investimento!: Investimento;

}
