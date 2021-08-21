import { Component, OnInit } from '@angular/core';
import { AnswersService } from '../answers.service';
import { Question } from '../questions.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-examq',
  templateUrl: './examq.component.html',
  styleUrls: ['./examq.component.css']
})
export class ExamqComponent implements OnInit {
  questionsArr:Array<Question> = [];
  //questionsForm:FormGroup;
  correctmsg = "That's correct!"
  incorrectmsg = "Wrong Answer. The right answer is: "
  correcta:boolean= false;
  points:number = 0;
  notBegin = true;
  answerPicked:string = "";
  actualquestion:boolean = false;
  finished = false;
  currentq:number = 0;
  //currentqn:number = 1;
  answersPicked:Array<string>=[];
  myForm?:FormGroup;
  counter = 0;
  showmsg = false;
  //currentQ:Question = {qnumber: 0,question: "",a:"",b:"",c:"",d:"",correct:"",checked:true};
  showTest = false;
  //for code from web
  // myForm = this.form.group({
  //   name: ['1']
  // });

  constructor(public answersSer:AnswersService, /*public form:FormBuilder*/) {
    //this.questionsForm = form.group({});
    // this.myForm = form.group({});
    
  }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //     question: new FormControl('1')
    // })
    // this.questionsArr.forEach(q => {
    //   this.myForm?.addControl(q.qnumber, this.form.control(''));
    // })
    
  }
  // current():Question{
  //   this.currentQ = this.questionsArr[this.counter];
  //   return this.currentQ;
  // }

  bye(){
    this.finished = true;

  }
  
  //temporary code to see if answers are displayed
  populateQuestions():void{
    this.showTest = false;
    this.notBegin = false;
    this.actualquestion = true;

    this.answersSer.getQuestions().subscribe(questions =>{
      for (let q of questions){
        let temp_obj:Question = {qnumber:q.qnumber, question:q.question,
          a:q.a,
          b:q.b,
          c:q.c,
          d:q.d,
          correct:q.correct,
          checked:q.checked}
        this.questionsArr.push(temp_obj)
      }
    })
    console.log(this.questionsArr);
    //this.currentQ = this.questionsArr[this.counter];
    // this.currentq = 1;
    // this.actualquestion = true;
    
  }
  // updateQ(){
  //   this.currentQ.checked = false;
  //   this.counter++;
  //   this.currentQ = this.questionsArr[this.counter];
  //   this.currentQ.checked = false;
  // }
  // isCurrent(n:string):boolean{
  //   return (this.currentq.toString() == n);
  // }
 
  checkAnswer(n:number){
    this.answersPicked.push(this.answerPicked);
    console.log(this.answersPicked);
    this.questionsArr[n-1].checked = true;
    if (this.questionsArr[n-1].correct == this.answerPicked)
    {
      this.correcta = true;
      this.points ++;
    }else{
      this.correcta = false;
      this.incorrectmsg = "Wrong Answer. The right answer is " + this.questionsArr[n-1].correct;
    }
    this.showmsg = true;
    // if (this.currentq.toString() == n)
    // {
    //   this.actualquestion = true;
    // }else
    // {
    //   this.actualquestion = false;
    // }
    //this.updateQ();
    
  }
  checked(n:number):boolean{
     return this.questionsArr[n-1].checked;
  }
  getScore():number{
    let points:number = 0;
    for (let i = 0; i< this.questionsArr.length ; i++)
    {
      if (this.answersPicked[i] == this.questionsArr[i].correct){
        points ++;
      }   
    }
    return points; 
  }
}

