import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PslevelComponent } from './pslevel/pslevel.component';
import { LoginComponent } from './login/login.component';
import { PlacementComponent } from './placement/placement.component';
import { MainComponent } from './main/main.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminComponent } from './admin/admin.component';
import { VerificationComponent } from './verification/verification.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { MarkEntryComponent } from './markentry/markentry.component';
// import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';

export const routes: Routes = [
	{
		path:'',component:LoginComponent
	},
	
	{ 
			path:'main',component:MainComponent,
			children:[
				{
					path:'dashboard',component:DashboardComponent
				}
				,
				{
					path:'pslevel',component:PslevelComponent
				},
				{
					path:'placement',component:PlacementComponent
				}
			]
	},
	{ 
		path:'adminsidenav',component:AdminSidenavComponent,
		children:[
		{
				path:'ADMIN_PORTAL',component:AdminComponent
			}
			,
			{
				path:'FACULT_YPORTAL',component:MarkEntryComponent
			},
			{
				path:'VERFICATION',component:VerificationComponent
			}
		]
	}
];
