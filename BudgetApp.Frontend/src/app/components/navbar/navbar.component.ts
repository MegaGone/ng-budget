import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChildren("elem") elReference: QueryList<ElementRef>;

  public completeRoute: any;
  public selected: number;

  public navList = [
    {
      title: 'Expenses',
      icon: 'icon-home',
      route: "/budget/expenses"
    },
    {
      title: 'Fixed Expenses',
      icon: 'icon-magnifying-glass',
      route: '/budget/fixed-expenses'
    },
    {
      title: 'Reports',
      icon: 'icon-heart-outlined',
      route: '/budget/reports'
    },
    {
      title: 'Settings',
      icon: 'icon-user',
      route: '/budget/settings'
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
    this.getRouteIndex();
  }

  getRouteIndex(): void {
    const currentRoute = this.router.url;
    const element = this.navList.find(route => route.route === currentRoute);
    this.completeRoute = this.navList[this.navList.indexOf(element)]
    this.selected = this.navList.indexOf(element);
  }

  ngAfterViewInit() {
    const elementHTML: HTMLElement = this.elReference.toArray().filter(r => r.nativeElement.hasAttribute('select'))[0].nativeElement;
    this.onSelect(elementHTML, this.selected);
  }
}
