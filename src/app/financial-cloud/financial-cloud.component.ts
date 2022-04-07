import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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
  data: any = [];
  displayedColumns: string[] = ['#', 'name', 'url'];
  dataSource = new MatTableDataSource();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }

  async ngOnInit() {
    const allPokemon = await this._financialCloudService.fetchAllPokemon();
    const { results } = allPokemon;
    this.data = results;
    this.totalSize = this.data.length;
    this.iterator();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.data.slice(start, end);
    this.data = part;
  }
}
