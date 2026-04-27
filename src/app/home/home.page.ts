import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DataService } from '../services/data';
import { Rating } from '../models/rating.model';
import { Suggestion } from '../models/suggestion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  ratings: Rating[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {

    // get
    this.dataService.getRatings().subscribe(res => {
      this.ratings = res;
    });

    this.dataService.getSuggestions().subscribe(res => {
      this.suggestions = res;
    });
  }

  // navigation
  goToRating() {
    this.router.navigateByUrl('/rating');
  }

  goToSuggestions() {
    this.router.navigateByUrl('/suggestions');
  }

  goToProfile(uid: string) {
    this.router.navigateByUrl(`/profile/${uid}`);
  }

  // delete
  async deleteRating(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir esta avaliação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deleteRating(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteSuggestion(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir esta sugestão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deleteSuggestion(id);
          },
        },
      ],
    });

    await alert.present();
  }
}