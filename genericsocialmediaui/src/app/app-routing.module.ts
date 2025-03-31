import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard';
import { LoggedInAuthGuard } from './guards/loggedin-guard';
import { IsAdminGuard } from './guards/is-admin-guard';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscriptions/subscriptions.module').then(
        (m) => m.SubscriptionsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'terms-conditions',
    loadChildren: () =>
      import('./terms-conditions/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then((m) => m.SupportModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [LoggedInAuthGuard],
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [IsAdminGuard],
  },

  {
    path: '',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
