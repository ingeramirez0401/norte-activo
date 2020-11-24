import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccounSettingsComponent } from './accoun-settings/accoun-settings.component';
import { LogoutComponent } from '../logout/logout.component';
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
import { UsersCreateComponent } from './account/users/create/create.component';
import { UsersListComponent } from './account/users/list/list.component';
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


const pagesRoutes: Routes = [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            {
                path: 'countries',
                component: CountriesComponent,
                children: [
                    { path: 'list', component: CountriesListComponent, data: { title: 'País' } },
                    { path: 'create', component: CountriesCreateComponent, data: { title: 'Crear país' } },
                    { path: 'update/:id', component: CountriesEditComponent, data: { title: 'Actualizar país' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'departments',
                component: DepartmentsComponent,
                children: [
                    { path: 'list', component: DepartmentsListComponent, data: { title: 'Departamentos' } },
                    { path: 'create', component: DepartmentsCreateComponent, data: { title: 'Crear departamento' } },
                    { path: 'update/:id', component: DepartmentsEditComponent, data: { title: 'Actualizar departamento' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'cities',
                component: CitiesComponent,
                children: [
                    { path: 'list', component: CitiesListComponent, data: { title: 'Ciudades' } },
                    { path: 'create', component: CitiesCreateComponent, data: { title: 'Crear ciudad' } },
                    { path: 'update/:id', component: CitiesEditComponent, data: { title: 'Actualizar ciudad' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'zip-codes',
                component: ZipCodesComponent,
                children: [
                    { path: 'list', component: ZipCodesListComponent, data: { title: 'Códigos postales' } },
                    { path: 'create', component: ZipCodesCreateComponent, data: { title: 'Crear código postal' } },
                    { path: 'update/:id', component: ZipCodesEditComponent, data: { title: 'Actualizar código postal' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'genres',
                component: GenresComponent,
                children: [
                    { path: 'list', component: GenresListComponent, data: { title: 'Generos' } },
                    { path: 'create', component: GenresCreateComponent, data: { title: 'Crear genero' } },
                    { path: 'update/:id', component: GenresEditComponent, data: { title: 'Actualizar genero' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'states',
                component: StatesComponent,
                children: [
                    { path: 'list', component: StatesListComponent, data: { title: 'Estados' } },
                    { path: 'create', component: StatesCreateComponent, data: { title: 'Crear estado' } },
                    { path: 'update/:id', component: StatesEditComponent, data: { title: 'Actualizar estado' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'profiles',
                component: ProfilesComponent,
                children: [
                    { path: 'list', component: ProfilesListComponent, data: { title: 'Perfiles' } },
                    { path: 'create', component: ProfilesCreateComponent, data: { title: 'Crear perfil' } },
                    { path: 'update/:id', component: ProfilesEditComponent, data: { title: 'Actualizar perfil' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'users',
                component: UsersComponent,
                children: [
                    { path: 'list', component: UsersListComponent, data: { title: 'Usuarios' } },
                    { path: 'create', component: UsersCreateComponent, data: { title: 'Crear usuario' } },
                    { path: 'update/:id', component: UsersEditComponent, data: { title: 'Actualizar usuario' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'news',
                component: NewsComponent,
                children: [
                    { path: 'list', component: NewsListComponent, data: { title: 'Listado de Noticias' } },
                    { path: 'create', component: NewsCreateComponent, data: { title: 'Crear Noticia' } },
                    { path: 'update/:id', component: NewsEditComponent, data: { title: 'Editar Noticia' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'contacts',
                component: ContactComponent,
                children: [
                    { path: 'list', component: ContactListComponent, data: { title: 'Listado de Contactos' } },
                    { path: 'view/:id', component: ContactViewComponent, data: { title: 'Ver contacto' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'categories',
                component: CategoriesComponent,
                children: [
                    { path: 'list', component: ListCategoriesComponent, data: { title: 'Categorías' } },
                    { path: 'create', component: CreateCategoriesComponent, data: { title: 'Crear categoría' } },
                    { path: 'update/:id', component: UpdateCategoriesComponent, data: { title: 'Actualizar categoría' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            { path: 'account-settings', component: AccounSettingsComponent, data: { title: 'Configuraciones' } },
            { path: 'logout', component: LogoutComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
