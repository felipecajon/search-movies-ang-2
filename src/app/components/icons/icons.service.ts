import { Injectable } from '@angular/core';
import { Dimensions, DimensionsUnconverted } from './dimensions.model';

@Injectable({
  providedIn: 'root'
})

export class IconsService {

  constructor() { }

  setDimensions (dimensions : DimensionsUnconverted) : Dimensions{
    const initial_size: number = parseInt( dimensions.size );
    const width = initial_size;
    const height = (initial_size * dimensions.height) / dimensions.width;
    const dimension: Dimensions = {width, height};

    return dimension;
  }
}
