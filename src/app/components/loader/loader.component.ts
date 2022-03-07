import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {

  @Input() text: String = 'Carregando...';
  status: boolean = false;
  status$ : Observable<boolean> = this.loaderServ.activeLoader$ || false;

  constructor(private loaderServ: LoaderService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus () {
    this.loaderServ.activeLoader$.subscribe(status => {
      this.status = status;
    });

    this.status = this.loaderServ.status
  }
}
