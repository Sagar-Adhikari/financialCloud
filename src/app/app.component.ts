import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'financialCloud';
  isOpenSideNavBar = true;
  loading = false;
  pageTitle = 'Initial Title';
  allowFooter = true;
  smallScreen = false;

  constructor(private globalService: GlobalService) {
    this.globalService.pageTitle$.subscribe((x) => {
      console.log('layout', x);
      this.pageTitle = x.pageTitle;
      this.allowFooter = x.allowFooter;
    });

    this.globalService.loading$.subscribe((x) => {
      this.loading = x;
    });
  }

  onNavbarClicked() {
    this.isOpenSideNavBar = false;
  }
}
