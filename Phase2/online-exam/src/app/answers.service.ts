import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Question } from './questions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(public http:HttpClient) { }

  getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>("/assets/questions.json");
  }
}
