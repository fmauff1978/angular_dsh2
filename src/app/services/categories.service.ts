
import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { documentId, getDocs, query } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Category } from '../models/category';
import { Observable, from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{




  constructor(private fs: AngularFirestore
    ) { }

  async saveData(data){



    const res = await this.fs.collection('categories').add(data);

    console.log('Documento criado com ID: ', res.id);
    


  }




  async deleteData(id){


    this.fs.doc(`categories/${id}`).delete();
    
    console.log(id)





  }




  updateData(id, EditData){



    this.fs.collection('categories').doc(id).update(EditData).then(docRef =>{

      console.log(id, EditData)
    })


  }
  ngOnInit() {




}







    }












