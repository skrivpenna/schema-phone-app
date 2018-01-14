import { NgModule } from '@angular/core';
import { IntroSlidesComponent } from './intro-slides/intro-slides';
import { LoadingComponent } from './loading/loading';
@NgModule({
	declarations: [IntroSlidesComponent,
    LoadingComponent],
	imports: [],
	exports: [IntroSlidesComponent,
    LoadingComponent]
})
export class ComponentsModule {}
