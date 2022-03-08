import { Component, Input, OnInit } from '@angular/core';
import { Dimensions } from '../dimensions.model';
import { IconsService } from '../icon-service.service';

@Component({
  selector: 'close-alert',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {
  @Input() size: string = '30';
  @Input() classColor!: string;
  
  width: number = 30;
  height: number = 30;
  
  constructor(private iconService: IconsService) { }

  ngOnInit(): void {
    const dimensions: Dimensions = this.iconService.setDimensions({size: this.size, width: this.width, height: this.height})
    this.width = dimensions.width;
    this.height = dimensions.height;
  }
}
