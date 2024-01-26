

import { Category } from './../models/category';

import { CategoriesService } from './../services/categories.service';
import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  FirestoreModule,
  addDoc,
  collection,
  collectionData,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { FormsModule, NgForm } from '@angular/forms';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {


  categories$: Observable<Category[]>;
  formCategory: string;
  formStatus: string = "Adicionar";
  categoryId: string;

  constructor(private cs: CategoriesService, private fs: AngularFirestore){}





   ngOnInit() {

    this.categories$ =this.fs.collection('categories', (ref) => ref.orderBy('criado_em', 'desc')).get().pipe(map((result)=> this.convertSnaps<Category>(result)));



    console.log(this.categories$)



     // (await this.cs.loadData()).subscribe( val =>{
         // console.log(val);

    }

    convertSnaps<T>(results){


      return <T[]> results.docs.map(snap=>{
        return{
          id:snap.id,
          ...<any> snap.data()



     }
      })
     }






      async onSubmit(formData){

        console.log(formData.value);

        let categoryData =

          {category: formData.value.category,
          criado_em: new Date()}

          if (this.formStatus == "Adicionar"){
            this.cs.saveData(categoryData);
            formData.reset();

          formData.reset();
          } else if (this.formStatus == "Editar"){

            this.cs.updateData(this.categoryId,categoryData);
            formData.reset();
            this.formStatus = "Adicionar";

          }




          //const res = await this.fs.collection('categories').add(categoryData);

         // console.log('Documento criado com ID: ', res.id);






        }

        onEdit(id){

            console.log(id)

              this.formStatus = 'Editar';
              this.categoryId = id;
              console.log (id)

        }


        //this.fs.collection('categories').add(categoryData)


onDelete(id){



  this.cs.deleteData(id)
}


      }
