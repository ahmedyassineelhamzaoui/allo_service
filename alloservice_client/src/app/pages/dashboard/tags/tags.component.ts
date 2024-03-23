import { Component } from '@angular/core';
import { TagInterface } from '../../shared/types/tag.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags :TagInterface[] = [];
}
