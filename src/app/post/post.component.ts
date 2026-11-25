import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Iblog } from '../model/post';

import { blogArr } from '../const/post.data';
import { SnackbarService } from '../service/service.snackbar';
import { UuidService } from '../service/service.uuid';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
@ViewChild('TitleRef')Titleref!:ElementRef;
@ViewChild('contentRef')contentref!:ElementRef;
blogArr : Array<Iblog> = blogArr;
isInEditMode:boolean = false;

id!: string;

  constructor(
    private _uuidService : UuidService,
    private _snackBarService  :SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  trackById(index : number, blog:Iblog){
    return blog.id;
  }

  AddBlog(){
    let blog:Iblog={
      id:this._uuidService.getuuid(),
      title:this.Titleref.nativeElement.value,
      content:this.contentref.nativeElement.value,
    };
    this.blogArr.unshift(blog);
    this.Titleref.nativeElement.value = '';
    this.contentref.nativeElement.value = '';
    this._snackBarService.openSnackbar('New blog added successfully !!!')
  }

  editBlogs(blog:Iblog){
    let editObj = this.blogArr.find(e=>e.id === blog.id);
    this.Titleref.nativeElement.value = editObj!.title;
    this.contentref.nativeElement.value = editObj!.content;
    this.isInEditMode = true;
    this.id = blog.id
  }

  //Delete

  onDeleteblog(id:string){
    let confirmation = confirm(`are you sure you want to remove blog with id ${id}`)
    if(confirmation){
      let getIndex = this.blogArr.findIndex(h=>h.id===id)
      this.blogArr.splice(getIndex, 1)
      this._snackBarService.openSnackbar('Blog deleted successfully !!!')
    }
  }

  //update

  updateBlog(){
    let updateObj:Iblog={
      title:this.Titleref.nativeElement.value,
      content:this.contentref.nativeElement.value,
      id:this.id
    }
    let index = this.blogArr.findIndex(d=>d.id===this.id)
    this.blogArr[index]=updateObj;
    this.isInEditMode=false;
    this.Titleref.nativeElement.value='';
    this.contentref.nativeElement.value='';
    this.id='';
    this._snackBarService.openSnackbar('Blog updated successfully !!!');
  }
}
