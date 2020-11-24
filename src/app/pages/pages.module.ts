import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccounSettingsComponent } from './accoun-settings/accoun-settings.component';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';

// Google Maps
// import { AgmCoreModule } from '@agm/core';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { LogoutComponent } from '../logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountriesComponent } from './settings/countries/countries.component';
import { CountriesListComponent } from './settings/countries/list/list.component';
import { CountriesCreateComponent } from './settings/countries/create/create.component';
import { CountriesEditComponent } from './settings/countries/edit/edit.component';
import { DepartmentsComponent } from './settings/departments/departments.component';
import { DepartmentsListComponent } from './settings/departments/list/list.component';
import { DepartmentsCreateComponent } from './settings/departments/create/create.component';
import { DepartmentsEditComponent } from './settings/departments/edit/edit.component';
import { CitiesComponent } from './settings/cities/cities.component';
import { CitiesListComponent } from './settings/cities/list/list.component';
import { CitiesCreateComponent } from './settings/cities/create/create.component';
import { CitiesEditComponent } from './settings/cities/edit/edit.component';
import { ZipCodesComponent } from './settings/zip-codes/zip-codes.component';
import { ZipCodesListComponent } from './settings/zip-codes/list/list.component';
import { ZipCodesCreateComponent } from './settings/zip-codes/create/create.component';
import { ZipCodesEditComponent } from './settings/zip-codes/edit/edit.component';
import { GenresComponent } from './settings/genres/genres.component';
import { GenresListComponent } from './settings/genres/list/list.component';
import { GenresCreateComponent } from './settings/genres/create/create.component';
import { GenresEditComponent } from './settings/genres/edit/edit.component';
import { StatesComponent } from './settings/states/states.component';
import { StatesListComponent } from './settings/states/list/list.component';
import { StatesCreateComponent } from './settings/states/create/create.component';
import { StatesEditComponent } from './settings/states/edit/edit.component';
import { ProfilesComponent } from './account/profiles/profiles.component';
import { ProfilesListComponent } from './account/profiles/list/list.component';
import { ProfilesCreateComponent } from './account/profiles/create/create.component';
import { ProfilesEditComponent } from './account/profiles/edit/edit.component';
import { UsersComponent } from './account/users/users.component';
import { UsersListComponent } from './account/users/list/list.component';
import { UsersCreateComponent } from './account/users/create/create.component';
import { UsersEditComponent } from './account/users/edit/edit.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { NewsEditComponent } from './news/news-edit/news-edit.component';
import { CategoriesComponent } from './settings/categories/categories.component';
import { ListCategoriesComponent } from './settings/categories/list-categories/list-categories.component';
import { CreateCategoriesComponent } from './settings/categories/create-categories/create-categories.component';
import { UpdateCategoriesComponent } from './settings/categories/update-categories/update-categories.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';


@NgModule({
  declarations: [
    AccounSettingsComponent,
    LogoutComponent,
    DashboardComponent,
    CountriesComponent,
    CountriesListComponent,
    CountriesCreateComponent,
    CountriesEditComponent,
    DepartmentsComponent,
    DepartmentsListComponent,
    DepartmentsCreateComponent,
    DepartmentsEditComponent,
    CitiesComponent,
    CitiesListComponent,
    CitiesCreateComponent,
    CitiesEditComponent,
    ZipCodesComponent,
    ZipCodesListComponent,
    ZipCodesCreateComponent,
    ZipCodesEditComponent,
    GenresComponent,
    GenresListComponent,
    GenresCreateComponent,
    GenresEditComponent,
    StatesComponent,
    StatesListComponent,
    StatesCreateComponent,
    StatesEditComponent,
    ProfilesComponent,
    ProfilesListComponent,
    ProfilesCreateComponent,
    ProfilesEditComponent,
    UsersComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
    NewsComponent,
    NewsListComponent,
    NewsCreateComponent,
    NewsEditComponent,
    CategoriesComponent,
    ListCategoriesComponent,
    CreateCategoriesComponent,
    UpdateCategoriesComponent,
    ContactComponent,
    ContactListComponent,
    ContactViewComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ReactiveFormsModule,
      ChartsModule,
      PipesModule,
      CommonModule
  ],
  providers: []
})
export class PagesModule { }
