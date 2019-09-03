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
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0); // Creamos un clon del objeto
  }

  reproducir(obj: Animal) {

    this.pausar_audio(obj);

    if (obj.reproduciendo) {
      obj.reproduciendo = false;
      return;
    }

    this.audio.src = obj.audio;
    this.audio.load();
    this.audio.play();
    obj.reproduciendo = true;
    obj.texto = 'Reproduciendo...';
    setTimeout(() => {
      obj.reproduciendo = false;
      obj.texto = 'Detenido...';
    }, obj.duracion * 1000 );
  }

  private pausar_audio( animalSel: Animal ) {
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if ( animal.nombre !== animalSel.nombre ) {
        animal.reproduciendo = false;
        animal.texto = 'Detenido...';
      }
    }
  }

  borrar(i: number) {
    console.log(i);
    this.animales.splice(i, 1);
  }

}
