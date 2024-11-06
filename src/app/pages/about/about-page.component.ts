import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {

  private title = inject(Title)
  private meta = inject(Meta)


  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'This is my about page' })
    this.meta.updateTag({ name: 'og:title', content: 'About page' })
    this.meta.updateTag({ name: 'keywords', content: 'keyword1, keyword2' })
  }
}
