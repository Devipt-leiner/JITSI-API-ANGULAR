import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JitsiRoutingModule } from './jitsi-routing.module';
import { JitsiComponent } from './jitsi.component';

@NgModule({
  declarations: [
    JitsiComponent
  ],
  imports: [
    BrowserModule,
    JitsiRoutingModule
  ],
  providers: [],
  bootstrap: [JitsiComponent]
})
export class JitsiModule { }
