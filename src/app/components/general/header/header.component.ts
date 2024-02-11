import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations'
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThisReceiver } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger("animateMenu",[
      transition(":enter",[
        query("*", [
          style({opacity: 0, transform: "translateY(-50%)"}),
          stagger(50,[
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit {
  resumeUrl="https://drive.google.com/file/d/1pckuKvMh2VQLYafPAAxZzaDHo_yMGFst/view?usp=drive_link"
  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  languageFormControl: FormControl= new FormControl();
  cvName: string = "";

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {

    this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val))

    this.languageFormControl.setValue(this.languageService.language)

  }
  getResume(){
    debugger;
    this.http.get("https://drive.google.com/uc?export=download&id=1pckuKvMh2VQLYafPAAxZzaDHo_yMGFst");
  }

  scroll(el) {
    if(document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(()=> document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible=false;
  }
  downloadResume(){
    debugger;
   let  resumeUrl="https://drive.google.com/uc?export=download&id=1pckuKvMh2VQLYafPAAxZzaDHo_yMGFst";
    this.http.get(resumeUrl,{
      responseType:'arraybuffer'
    }).subscribe((data:any)=>{
      const blob=new Blob([data],{type:"application/pdf"})
      const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aniket_Joshi.pdf'; // Specify the file name for download
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })
} 
  

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event) {
        this.pageYPosition=window.pageYOffset
    }

    changeLanguage(language: string) {
      this.languageFormControl.setValue(language);
    }
}
