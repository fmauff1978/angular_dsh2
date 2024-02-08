import { Post } from 'src/app/models/post';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {


  post$: Observable<Post[]>;


  constructor(private ps: PostService, private fs: AngularFirestore){}


   ngOnInit():void  {

    this.post$ = this.fs.collection('posts', (ref)=>ref.orderBy('createdAt', 'desc')).get().pipe(map((result)=> this.convertSnaps<Post>(result)));
    console.log(this.post$)

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
     onDelete(postImgPath, id){

      this.ps.deleteImage(postImgPath, id);
     }

     onFeatured (id, value){

        const featuredData ={

          isFeatured: value
        }

        this.ps.markFeatured(id, featuredData)
     }

}
