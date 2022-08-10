import { Injectable } from '@angular/core';
import { HttpClient,   HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Iresponse, UserLogin } from '../interfaces/myinterfaz'; 

@Injectable({
  providedIn: 'root'
})
export class CrudsService {
  isAuthenticate = false;

  private apiURL:  string = "";
  public IdEmp:number = 0;
  public IdUsuario:number = 0;

//--proxy-config proxy.conf.json
  constructor(private http : HttpClient) {
    let farchivo =  "./assets/url.txt";
    let arrayData = new Array();
      let archivoTxt = new XMLHttpRequest();
      archivoTxt.open("GET", farchivo, false);
      archivoTxt.send(null);
      let respt:any = archivoTxt.responseText; 
      let linea:string[] = respt.split("\n"); 
      
      this.apiURL = this.ConfigFile(linea, "[url]"); 
      this.IdEmp = parseInt(this.ConfigFile(linea, "[empresa]")); 
      this.IdUsuario = parseInt(this.ConfigFile(linea, "[usuario]")); 
   }

  readonly ISLOGGEDKEY = 'islogged';
  readonly TOKENVALIDO = 'TOKEN';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();
  
  public ConfigFile(data:string[], key:string):string{
    let returnKey : string = "";
    let registro = data.filter(frase => frase.includes(key));
    if(registro.length > 0 ){
      let valor:string[] = registro[0].split("]:");
      console.log(valor[1]);
      returnKey = valor[1];
    }else{
      returnKey = "No se encontro la llave " + key;
      console.log("No se encontro la llave " + key);
    }
    return returnKey;
  }

  public async ConsultasMaestros(Empresa:number, NumeroRegla:number, Llave:string, Condicion:string): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.get<any>(this.apiURL + "ReglaNegocio/" + Empresa + "/" + NumeroRegla + "/" + Llave + "/" + Condicion,  {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  
  public async GuardarIdiomaCandidato(ListIdioma:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/Idioma' , JSON.stringify(ListIdioma), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  public async GuardarEstudiosCandidato(ListEstudios:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/Estudios' , JSON.stringify(ListEstudios), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  public async GuardarReferenciasCandidato(ListReferencias:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/Referencias' , JSON.stringify(ListReferencias), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };

  public async GuardarCargosCandidato(ListCargos:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/Cargos' , JSON.stringify(ListCargos), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };
  public async GuardarFamiliarCandidato(ListFamiliar:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/Familiar' , JSON.stringify(ListFamiliar), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };
  public async GuardarLicCategoriaCandidato(ListCategoria:any): Promise<any> { 
    let Headerss= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/LicCategoria' , JSON.stringify(ListCategoria), {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };
  public async ArchivoHVCandidato(data:any): Promise<any> { 
    let Headerss= new HttpHeaders()            
      .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));
    
    return await this.http.post<any>(this.apiURL + 'Candidato/UploadFile' , data, {    
      headers: Headerss
    }).pipe(retry(3), catchError(this.handleError)).toPromise(); 
  };



  
  ConsultasMaestrosPais(idpais:number): Promise<any> {
    
    let Headerss = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));

    return this.http.get<any>(this.apiURL + `Pais/v1/${idpais}` ,  {
      headers: Headerss
    }).pipe
            (
                retry(3), 
                catchError(this.handleError)
            ).toPromise();
  };

  ConsultasMaestrosDepartamento(idEmp:number, idpais:number): Observable<any> {
    
    let Headerss = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));

    let params = new HttpParams()    
      .set('idpais', idpais.toString()); 

    return this.http.get<Iresponse>(this.apiURL + `Pais/departamentos/${idEmp}/${idpais}`,  {
      params,
      headers: Headerss
    }).pipe
            (
                retry(3), 
                catchError(this.handleError)
            )
  };
  ConsultasMaestrosCiudad(idEmp:number, iddepart:number): Observable<any> {
    
    let Headerss = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set("Authorization", "Bearer " + localStorage.getItem(this.TOKENVALIDO));

    return this.http.get<Iresponse>(this.apiURL + `Pais/ciudades/${idEmp}/${iddepart}`,  {
      headers: Headerss
    }).pipe
            (
                retry(3), 
                catchError(this.handleError)
            )
  };



  GetUsuarioLogin(registro:UserLogin): Observable<Iresponse> {
    return this.http.post<any>(this.apiURL + 'token', JSON.stringify(registro), {
                  headers:  new HttpHeaders().set("Content-Type", "application/json") 
            }).pipe(
              tap((dt: any) =>{
                
                  
                  localStorage.setItem(this.ISLOGGEDKEY, 'true');
                  localStorage.setItem(this.TOKENVALIDO, dt.token);
                
              })
        )   
  } 

  PostCandidato(registro:any): Observable<Iresponse> {

  
    let Headerss = new HttpHeaders()
    .set("Content-Type", "application/json") 
    .set('Authorization', "Bearer " + localStorage.getItem(this.TOKENVALIDO)) 

    return this.http.post<any>(this.apiURL + 'Candidato', registro, { 
              headers:Headerss
            }).pipe(
              retry(3), 
              catchError(this.handleError)
           )
         
  } 

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);  
  }

  log(data:string){
    console.log(data);
  }

  isLoggedIn(url:string):boolean{
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    debugger;
    if(!isLogged){
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

  
  handleError(error:any) {
    let errorMessage = ''; 
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if(error.status === 404){
        errorMessage = "Error 404 Se presento un problema con el consumo de la información \n POR FAVOR REPORTAR AL ADMINISTRADOR";
      }
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(`Error Code: ${error.status}\nMessage: ${error.message}`)
        
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
