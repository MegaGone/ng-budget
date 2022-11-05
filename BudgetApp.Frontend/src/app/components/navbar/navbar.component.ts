import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // TODO: Fix activatedRouterLink

  public selected: number;

  public navList = [
    {
      title : 'Expenses',
      icon  : 'icon-home',
      route : "/budget/expenses"
    },
    {
      title : 'Fixed Expenses',
      icon  : 'icon-magnifying-glass',
      route : '/budget/fixed-expenses'
    },
    {
      title : 'Reports',
      icon  : 'icon-heart-outlined',
      route : '/budget/reports'
    },
    {
      title : 'Settings',
      icon  : 'icon-user',
      route : '/budget/settings'
    },
  ];

  private sizes = {
    listItemWidth: 0,
    translateX: 0,
  };

  constructor(private router: Router) { }

  public get animate() {
    return {
      width: this.sizes.listItemWidth + 'px',
      transform: `translateX(${this.sizes.translateX}px)`,
    };
  }

  public updateSizes(elem: HTMLElement, index = 1) {
    this.sizes = {
      listItemWidth: elem.getBoundingClientRect().width,
      translateX: elem.getBoundingClientRect().width * index,
    };
  }

  onSelect(elem, i) {
    this.selected = i;
    this.updateSizes(elem, i);
  }

  ngOnInit(): void {
  }

  getRouteIndex(): number {
    const currentRoute = this.router.url;
    const element = this.navList.find(route => route.route === currentRoute);
    return this.navList.indexOf(element);
  }
}
