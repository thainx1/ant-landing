import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsComponent } from './pages/news/news.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: AboutComponent, title: 'Về chúng tôi' },
    { path: 'home', component: HomeComponent, title: 'Về đen đen' },
    { path: 'news', component: NewsComponent, title: 'Tin tức' },
    { path: 'contact', component: ContactComponent, title: 'Liên hệ' },
    { path: 'privacy', component: PrivacyComponent, title: 'Chính sách bảo mật' },
    { path: '**', redirectTo: '' }
];

