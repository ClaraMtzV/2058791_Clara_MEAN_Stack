import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from '../user.model';
import { NgForm } from '@angular/forms';
import { contacts } from '../contacts.model';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  loginRef = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });
  portRef = new FormGroup(
    {c_name: new FormControl('', [Validators.required]),
    c_phone: new FormControl('',[Validators.required]),
  }
  );

  msg_log: string = '';
  msg_dash: string = '';
  msg_sign: string = "";
  
  //quita esto cuando este funcionando la de portafolios
  login: boolean = false;
  signup: boolean = true;
  port: boolean = false;

  // login: boolean = true;
  // signup: boolean = false;
  // port: boolean = false;
  validinput = true;

  users: Array<user> = [];
  //aqui me quede
  user1: user = { first_name: '', last_name: '', user_name: '', pass_word: '' };
  //user1?:users[0];
  contactarray: Array<contacts> = [];
  contactcopyar: Array<contacts> = [];
  contacts_stored:number = 0;
  contacts_table:boolean = false;
  userindash:string = "";
  

  constructor() {}

  ngOnInit(): void {}

  goToLoginFromSignUp(): void {
    this.login = true;
    this.signup = false;
  }
  
  storeData(
    first_nRef: any,
    last_nRef: any,
    user_nRef: any,
    passRef: any
  ): void {
  
    this.user1 = {
      first_name: first_nRef.value,
      last_name: last_nRef,
      user_name: user_nRef.value,
      pass_word: passRef.value,
    };
    this.users.push(this.user1);
    first_nRef.value = "";
    last_nRef.value = "";
    user_nRef.value = "";
    passRef.value = "";
    this.msg_sign = "Data stored, go ahead and log in!"
    //console.log(this.users);
  }
  reset():void {
    this.loginRef.reset();
  }

  checkData(): void {
    let login = this.loginRef.value;

    if (
      login.user == this.user1.user_name &&
      login.pass == this.user1.pass_word
    ) {
      this.userindash = login.user;
      this.goToPortFromLogin();
    } else {
      this.msg_log = 'Username or password are incorrect. Please try again!';
      this.loginRef.reset();
    }

    this.loginRef.reset();
  }
  goToSignUpFromLogin(): void {
    this.login = false;
    this.signup = true;
  }

  goToPortFromLogin(): void {
    this.login = false;
    this.port = true;
  }

  storeContacts(namec:any, phonec:any): void{
    let temp_name:string = namec.value;
    let temp_phone:string = phonec.value;

    let temp_contact:contacts = {name:temp_name, phone:temp_phone}
    //let temp_contact:contacts = this.portRef.value;
  
    this.contactarray.push(temp_contact);
    
  
    this.msg_dash = "Data Stored";
    namec.value = "";
    phonec.value = "";
    
    // this.contacts_stored ++;
    // let temp_string:string = "contact" + this.contacts_stored;
    // sessionStorage.setItem(temp_string, JSON.stringify(temp_contact));
  }

  showContacts(){
    this.contacts_table = true; 
    this.contactcopyar = this.contactarray; 
  }
  clearMsg(){
    this.msg_log = "";
    this.msg_dash = "";
    this.msg_sign = "";
  }


}
