import { Component, ViewChild } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { IonReorderGroup, IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando = false;
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;
  @ViewChild('lista', { static: true }) lista: IonList;

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
    this.animales.splice(i, 1);
    this.lista.closeSlidingItems();
  }

  doRefresh(event: any) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.animales = ANIMALES.slice(0); // Creamos un clon del objeto
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  doReorder(ev: any) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    // console.log('Before complete', this.animales);

    const draggedItem = this.animales.splice(ev.detail.from, 1)[0];
    this.animales.splice(ev.detail.to, 0, draggedItem);
    ev.detail.complete();

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the animales variable to the
    // new order of animales
    // this.animales = ev.detail.complete(this.animales);

    // After complete is called the animales will be in the new order
    // console.log('After complete', this.animales);
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    this.ordenando = !this.reorderGroup.disabled;
  }
}
