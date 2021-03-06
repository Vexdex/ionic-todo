import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AddItemPage } from '../pages/add-item/add-item';
import { DetailsItemPage } from '../pages/details-item/details-item';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { DataProvider } from '../providers/data/data';

import { TabPage } from '../pages/tab/tab';
import { TaskPage } from '../pages/task/task';
import { CategoryPage } from '../pages/category/category';
import { DetailsCatPage } from '../pages/details-cat/details-cat';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    AddItemPage,
    DetailsItemPage,
    EditItemPage,
    TabPage,
    TaskPage,
    CategoryPage,
    DetailsCatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddItemPage,
    DetailsItemPage,
    EditItemPage,
    TabPage,
    TaskPage,
    CategoryPage,
    DetailsCatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
