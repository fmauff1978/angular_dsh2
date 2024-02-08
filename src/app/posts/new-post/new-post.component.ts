



import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {




  permalink: string = " ";
  imgSrc: any = "./assets/plax.jpg";
  selectedImg : any;
  categories: Observable <Category[]>;
  postForm: FormGroup;
  post: any;
  formStatus: string ="Adicionar";
  docId: string;



constructor(private fs: AngularFirestore, private fb: FormBuilder, private ps: PostService, private ar: ActivatedRoute ){

    this.ar.queryParams.subscribe(val=>{
      this.docId = val.id;
      console.log(val);  
      
      if(this.docId){ 
        this.ps.loadOneData(val.id).subscribe(post=>{
        this.post = post;

        this.postForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.post.permalink, [Validators.required]],
          except: [this.post.except, [Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, [Validators.required]],
          postImg: ['', [Validators.required]],
          content: [this.post.content, [Validators.required]]      
        })
        this.imgSrc = this.post.postImgPath;
        this.formStatus = "Editar"
        console.log(post)
       })
      
      }else{

        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', [Validators.required]],
          except: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', [Validators.required]],
          postImg: ['', [Validators.required]],
          content: ['', [Validators.required]]      
        })

      }
  })
  }

  
  

  ngOnInit() {

    this.categories =this.fs.collection('categories', (ref) => ref.orderBy('criado_em', 'desc')).get().pipe(map((result)=> this.convertSnaps<Category>(result)));
    console.log(this.categories)
    }

//form control para validadcao
    get fc(){
      return this.postForm.controls;
    }


  convertSnaps<T>(result){
    return <T[]> result.docs.map(snap=>{
      return{
      id:snap.id,
      ...<any> snap.data()



   }
   })
  }

  onSubmit(){

    console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);


    const postData: Post ={

      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category:{

        categoryId: splitted[0] ,
        category: splitted [1]
      },
      postImgPath:" ",
      except:   this.postForm.value.except,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: "new",
      createdAt: new Date()
      }

      this.ps.uploadImage(this.selectedImg, postData, this.formStatus, this.docId)
      this.postForm.reset();
      this.imgSrc = "./assets/plax.jpg";

  }


  onTitleChanged($event){

    const title1 = $event.target.value;
    this.permalink = title1.replace(/\s/g,'-');
    console.log(this.permalink)


  }

  showPreview($event){

    const reader = new FileReader()
    reader.onload = (e)=>{
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
