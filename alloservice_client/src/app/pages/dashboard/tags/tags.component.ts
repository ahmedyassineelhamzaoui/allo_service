import { Component } from '@angular/core';
import { TagInterface } from '../../shared/types/tag.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EdittagComponent } from './edittag/edittag.component';
import Swal from 'sweetalert2';

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
  deleteTag():void{
    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this tag!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        console.log("confirmed"); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'your data are safe',  
          'info'  
        )  
      }  
    })  
  }
}
