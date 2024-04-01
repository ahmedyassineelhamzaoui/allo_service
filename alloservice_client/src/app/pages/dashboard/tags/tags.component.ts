import { Component } from '@angular/core';
import { TagInterface } from '../../shared/types/tag.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EdittagComponent } from './edittag/edittag.component';
import Swal from 'sweetalert2';
import { AddtagComponent } from './addtag/addtag.component';
import { TagsService } from '../../shared/tags.service';
import { ResponseWithDetailsInterface } from '../../../auth/shared/types/responseWithDetails.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  tags :TagInterface[] = [];
  currentPageIndex: number = 0;
  pageSize:number = 16;
  isLoading:boolean = true;

  constructor(
    private dialog:MatDialog,
    private tagService:TagsService
  ){}

  ngOnInit(){
    this.isLoading = true;
    this.getAllTags();
  }
  handlePageEvent(event:PageEvent){
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  opentAddTagModal():void{
      this.dialog.open(AddtagComponent);
  }
  openEditTagModal():void{

      this.dialog.open(EdittagComponent);
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
  getAllTags():void{
    this.tagService.getAllTags().subscribe(
      (response:ResponseWithDetailsInterface)=>{
        this.tags = response.details['tags'];
        this.isLoading = false;
      },
      (error)=>{
        this.isLoading = false;
      }
    )
  }
}
