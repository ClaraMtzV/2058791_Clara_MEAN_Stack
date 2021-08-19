import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { task } from '../task.model';
import { FormControl,Validators } from '@angular/forms';
//import { timeStamp } from 'console';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  name_c = new FormControl('',[Validators.required]);
  eid_c = new FormControl('',[Validators.required]);
  taskd_c = new FormControl('',[Validators.required]);
  deadl_c = new FormControl('',[Validators.required]);
  
  tasks:Array<task>=[];
  //temp_date = new Date();
  //temp_t:task = {id:"2345",name:"Clara Martinez Vargas", taskd: "name other components to the design area", 
  //dead_line: this.temp_date};
  errormsg:string = "";
  displayt:boolean = false;
  
  constructor() { 
    //this.tasks.push(this.temp_t);
  }

  ngOnInit(): void {
  }
  storeData(ids:any, ename:any, td:any, tdeadline:any){
    if (ids.value == ""  || ename.value == "" || td.value == ""|| tdeadline == "")
    {
      this.errormsg = "Please fill required fields!"
    }else{
      this.errormsg = "";
      let temp_tasktp:task = {id:ids.value as string,name:ename.value as string, 
        taskd:td.value as string, dead_line:tdeadline.value as Date}
      
      this.tasks.push(temp_tasktp);
      this.reset(ids,ename,td,tdeadline); 
      this.displayTable();
    }

  }
  displayTable():void{
    this.displayt = true;

  }
  getErrorMessage(){
    if (this.eid_c.hasError('required') || this.name_c.hasError('required') ||
    this.taskd_c.hasError('required') || this.deadl_c.hasError('required') )
    {
      return 'This field is required';
    }else{
      return '';
    }
    
  }

  reset(eid:any,ename:any,tdesc:any,deadl:any):void{
    eid.value = "";
    ename.value = "";
    tdesc.value = "";
    deadl.value = "";
  }

}
