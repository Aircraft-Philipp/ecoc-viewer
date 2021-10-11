import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxFileDropModule } from 'ngx-file-drop';

import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { SafePipe } from './safe.pipe';
import { from } from 'rxjs';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxJsonViewerModule,
    NgxFileDropModule,
    CardModule,
    TabViewModule,
    AccordionModule,
    DividerModule,
    TableModule,
    FieldsetModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
