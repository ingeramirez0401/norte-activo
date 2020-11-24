import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService,
         LocalStorageService,
         NotificationService,
         SidebarService,
         AppService,
         UploadFileService,
         ModalSearchService,
         EmailService,
         SettingsService,
         CountryService,
         DepartmentService,
         CityService,
         ZipCodeService,
         GenreService,
         StateService,
         UserService,
         LangService,
         ProfileService,
         UserPersonService,
         CategoryService, 
         ContactService} from './services.index';
import { LoginGuard } from './guard/login.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ConfigService,
    LocalStorageService,
    NotificationService, 
    SettingsService,
    UserService,
    AppService,
    SidebarService,
    UploadFileService,
    EmailService,
    LoginGuard,
    ModalSearchService,
    LangService,
    CountryService,
    DepartmentService,
    CityService,
    ZipCodeService,
    GenreService,
    StateService,
    ProfileService,
    UserPersonService,
    CategoryService,
    ContactService
  ]
})
export class ServiceModule { }
