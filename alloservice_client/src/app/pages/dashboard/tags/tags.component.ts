import { Component } from '@angular/core';
import { TagInterface } from '../../shared/types/tag.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EdittagComponent } from './edittag/edittag.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  tags :TagInterface[] = [];
  currentPageIndex: number = 0;
  pageSize:number = 5;

  constructor(
    private dilog:MatDialog
  ){}

  handlePageEvent(event:PageEvent){
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  openEditTagModal():void{

      this.dilog.open(EdittagComponent);
  }
}
