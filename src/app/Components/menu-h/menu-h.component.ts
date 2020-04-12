import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-h',
  templateUrl: './menu-h.component.html',
  styleUrls: ['./menu-h.component.scss'],
})
export class MenuHComponent implements OnInit {

  @Output() titulo;
  constructor() { }

  ngOnInit() {}

}
