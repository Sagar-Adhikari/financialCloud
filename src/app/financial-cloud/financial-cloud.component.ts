import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FinancialCloudService } from '../services/financial-cloud.service';
import { GlobalService } from '../services/global.service';
import { IPokeApi } from '../utils/pokeApi.interfaces';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-financial-cloud',
  templateUrl: './financial-cloud.component.html',
  styleUrls: ['./financial-cloud.component.scss'],
})
export class FinancialCloudComponent implements OnInit {
  data: IPokeApi[] = [];
  displayedColumns: string[] = ['#', 'name', 'url'];

  loading = false;

  constructor(
    private globalService: GlobalService,
    private _financialCloudService: FinancialCloudService
  ) {
    this.globalService.setLayout({
      allowFooter: false,
      pageTitle: 'Pokemon List',
    });
  }

  async ngOnInit() {
    const allPokemon = await this._financialCloudService.fetchAllPokemon();
    const { results } = allPokemon;
    this.data = results;
  }
}
