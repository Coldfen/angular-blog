import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponce, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class  PostService {
  constructor(private _http: HttpClient) {
  }
  create(post: Post): Observable<Post> {
    return  this._http.post(`${environment.fbDBUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponce) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
      }))
  }
  getAll(): Observable<Post[]> {
    return this._http.get(`${environment.fbDBUrl}/posts.json`)
      .pipe(map((response:{[key: string]: any}) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))

      }))
  }

  getById(id: string): Observable<Post> {
    return this._http.get<Post>(`${environment.fbDBUrl}/posts/${id}.json`)
      .pipe(map((post:Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }
  remove(id: string): Observable<void> {
    return this._http.delete<void>(`${environment.fbDBUrl}/posts/${id}.json`)
  }

  update (post: Post): Observable<Post> {
    return this._http.patch<Post>(`${environment.fbDBUrl}/posts/${post.id}.json`, post)
  }
}
