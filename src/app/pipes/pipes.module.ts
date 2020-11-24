import { NgModule } from '@angular/core';
import { DefaultPhotoPipe } from './default-photo.pipe';
import { DefaultNoticiaPipe } from './default-noticia.pipe';

@NgModule({
  imports: [],
  declarations: [
    DefaultPhotoPipe,
    DefaultNoticiaPipe
  ],
  exports: [
    DefaultPhotoPipe,
    DefaultNoticiaPipe
  ]
})
export class PipesModule { }
