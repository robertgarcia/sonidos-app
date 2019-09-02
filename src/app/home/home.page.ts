import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales: Animal[] = [];
  constructor() {
    this.animales = ANIMALES.slice(0); // Creamos un clon del objeto
  }

  reproducir(obj: Animal) {
    console.log(obj);
    const audio = new Audio();
    audio.src = obj.audio;
    audio.load();
    audio.play();
    obj.reproduciendo = true;
    obj.texto = 'Reproduciendo...';
    setTimeout(() => {
      obj.reproduciendo = false;
      obj.texto = 'Detenido...';
    }, obj.duracion * 1000 );
  }

}
