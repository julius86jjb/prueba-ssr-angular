import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID);


  ngOnInit(): void {
    // console.log({document})
    // document.title = 'hola!'

    // console.log(this.platform);
    // console.log(isPlatformBrowser(this.platform));
    // console.log(isPlatformServer(this.platform));

    // if (isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page'
    // }
    // else {
    //   console.log('No set title in server')
    // }

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'This is my pricing page' })
    this.meta.updateTag({ name: 'og:title', content: 'pricing page' })
    this.meta.updateTag({ name: 'keywords', content: 'keyword1, keyword2' })
  }
}
