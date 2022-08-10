import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import  Swal from 'sweetalert2';
declare var $:any;
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { CrudsService } from 'src/app/servicios/crud.service';
import { Iresponse } from 'src/app/interfaces/myinterfaz';
import * as _ from 'lodash';
import { RESTORED_VIEW_CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { retry } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';

defineLocale('es', esLocale);

@Component({
  selector: 'app-mod-candidato',
  templateUrl: './mod-candidato.component.html',
  styleUrls: ['./mod-candidato.component.css']
})
export class ModCandidatoComponent implements OnInit {

  public ImageBaseData:any  | ArrayBuffer=null;
  public formData = new FormData();
  public dataPickerConfig: Partial<BsDatepickerConfig>;

  // Pestaña Datos Basico

  public txtusuario:string = "";
  public CBOtipo_candidato:string = "";
  public txtidentificacion:string="";
  public cbopais:string="";
  public cbociudad:string="";
  public cboTipo:string="";
  public cboDpto:string="";
  public txtnombre:string="";
  public txtapellido:string="";
  public CBOentidad:string="";
  public CBOestadocivil:string="";
  public RadioSexo:string="";
  public txtfechanace:string="";
  public txtdireccion:string="";
  public txttelefono:string="";
  public txtcelular:string="";
  public txtcorreo:string="";
  public cbocargo:string="";
  public cbonivel_academico:string="";
  public cboexperiencia:string="";
  public cbolengua_extranjera:string="";

  public DisplayEntidad:string="";

 
  // Pestaña Datos Adicionales
  public CBOExpGeneral:string="";
  public CBOEPS:string="";
  public CBOExpOperationE:string="";
  public CBOFpension:string="";
  public CBORsalario:string="";
  public CBOFcaja:string="";
  public txtSalarioEsp:string="";
  public CBOFcesantias:string="";
  public TxtTProfesional:string="";
  public TxtNconduccion:string="";
  public txtfechavence:string="";
  public TxtFvence:string="";
  public CBOCategoria:string="0";
  public CBOFreclutamiento:string="";
  public CBOCpiel:string="";
  public CBOGsanguineo:string="";  
  public rdTipoLic:string="";
  public rdTipoSangre:string="";
  public chkParticipaAnterior:boolean=false;
  public chkRunt:boolean=false;
  public chkDisponibleViaja:boolean=false;
  public chkHojaVida:boolean=false;  
  public txtpeso:string="";
  public txtaltura:string="";

  // Pestañas Estudios
  public CBOinstitucional:string="";
  public CBOTitulo:string="";
  public txtfechadesde:string="";
  public txtfechahasta:string="";
  public CBOestado:string="-1";
  public CBOEstudioTipo:string="";
  public CBOTipoCurso:string="";
  public CBOTipoNiveles:string="1000";
  // Pestaña Referencias
  public txtmynombre:string="";
  public txtmycelular:string="";
  public txtmytelefono:string="";
  public txtmycorreo:string="";
  public txtmyempresa:string="";
  public txtmycargo:string="";
  public txtmyTimeLabor:string="";
  public txtmyMotivoRetiro:string="";
  public txtmynotaRef:string="";
  public rdTipoRef:number=0;

  // Pestaña Cargo
  public CbolistCargo:string="";

  // Pestaña Informacion Familiar
  public txtifidentificacion:string="";
  public txtifNombre:string="";
  public txtifnace:string="";
  public CBOifparentesco:string="";
  public txtIFtelefono:string="";

  // Validaciones
  public FormValida:any = [];
  public FormValida2:any = [];
  public FormValida3:any = [];
  public FormValida4:any = [];
  public FormValida5:any = [];
  public FormValida6:any = [];
  
  //Form Modal m1
  public m1txtfechaExp:string="";
  public m1cboPaisExp:string="";
  public m1cboDepartExp:string="";
  public m1cboCiudadExp:string="";
  public listPaisesExp:any = [];
  public listDeptosExp:any = [];
  public listCiudadesExp:any = [];

  // listas
  public listLenguaExtranjera:Array<any> = new Array();  
  public listTipoDocumento:any = [];
  public listTipoCandidato:any = [];
  public listPaises:any = [];
  public listDeptos:any = [];
  public listCiudades:any = [];
  public listEstado:any = [];
  public listCargos:any = [];
  public listEspecificaciones:any = [];
  public listNivelAcademico:any = [];
  public listEpses:any = [];
  public listFondoPensiones:any = [];
  public listFondoCaja:any = [];
  public listFondoCesantias:any = [];
  public listAspiracionSalarial:any = [];
  public listFuenteReclutamientos:any = [];
  public listCategorias:any = [];
  public listColodePiel:any = [];
  public listGrupoSanguineo:any = [];
  public listTipoCurso:any = [];
  public listTitulo:any = [];
  public listInstitucion:any = [];
  public listEntidades:any = [];
  public listEstadoCivil:any = [];
  
  public listAddLengua:Array<any> = new Array();
  public listAddEstudios:Array<any> = new Array();
  public listAddCategorias:Array<any> = new Array();
  public listAddReferencia:Array<any> = new Array();
  public listAddCargos:Array<any> = new Array();
  public listAddInfoFamiliar:Array<any> = new Array();
  public listAddParentescos:Array<any> = new Array();
  
  public FormViewReferenciaLaboral:boolean = false;


  // Variables de archivos adjuntos

  public ListArchivoAdjuntos:Array<any> = new Array();
  public FileSelected:string="Selecciona un archivo";
  public ImageFileSelected:string="sinSeleccionar.png";
  imageError: any = "";
  isImageSaved: boolean = false;
  cardImageBase64: any = "";

  // Variables modal npm install formdata - polyfills

  public closeResult: any;

  constructor(private localeService: BsLocaleService, private Httpdata: CrudsService, private modalService: NgbModal) {
    
    this.localeService.use('es');
    this.dataPickerConfig = Object.assign({}, {containerClass:'theme-red', isAnimated: true, dateInputFormat: 'YYYY-MM-DD' });
   }

  ngOnInit(): void {

    this.IniciarSession();    

    $('#myTab a').on('click', (e:any) => {
      e.preventDefault();
      console.log(e);
      console.log(e.target.attributes.href.value);
      let NameTab:string = e.target.attributes.href.value;

      // if (NameTab === '#adicionales'){
      //   if (!this.ValidaTab1()) {
      //     this.MensajesAlert('cancel', 'No puedes puedes ingresar a la pestaña Datos Adicionales si no diligencias todos los campos requeridos');
      //     return false;
      //   }
      //   let validaMensaje:string = this.ValidaDatosForm1();
      //   if (validaMensaje !== ''){
      //     this.MensajesAlert('cancel', validaMensaje);
      //     return false;
      //   }
      // }
      // if (NameTab === '#files'){
      //   if (!this.ValidaTab2()) {
      //     this.MensajesAlert('cancel', 'No puedes puedes ingresar a la pestaña Estudios si no diligencias todos los campos requeridos');
      //     return false;
      //   }
      //   let validaMensaje1:string = this.ValidaDatosForm2();
      //   if(validaMensaje1 !== '' ){
      //     this.MensajesAlert('cancel', validaMensaje1);
      //     return false;
      //   }
      // }
      // if(NameTab === '#estudios'){
      //   if (!this.ValidaTab2()) {
      //     this.MensajesAlert('cancel', 'No puedes puedes ingresar a la pestaña Referencias si no diligencias todos los campos requeridos');
      //     return false;
      //   } 
      // }
      // if(NameTab === '#referencia'){
      //   if(this.listAddEstudios.length === 0){
      //     this.MensajesAlert('cancel', 'En la pestaña <strong>Estudios</strong> no añadiste nada a la lista');
      //     return false;
      //   }
        
      // }
      
      
      return true;
    });
  }

  IniciarSession(){

    // let usuario:any = {
    //   Usuario: "UserDMSAdvance",
    //   clave: "b9f2764b5e883a107a5cb4c6ad52ea19004abffa1d8c4debca9c675032ea692d"
    // }
    let usuario:any = {
      usuario: "dms",
      password: "12345"
    }

    this.Httpdata.GetUsuarioLogin(usuario)
        .subscribe( 
        (datas : any)=> {                  
          console.log("cargar todos los maestros");
              this.ListarTodosMaestros();             
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }
  
  async ListarTodosMaestros(){
    let Empresa:number = this.Httpdata.IdEmp;

    this.listPaises = await this.Httpdata.ConsultasMaestrosPais(Empresa);
    this.listPaisesExp = await this.Httpdata.ConsultasMaestrosPais(Empresa);

    this.listTipoDocumento = await this.Httpdata.ConsultasMaestros(Empresa, 159, "tipo_documento", "subcriterio");
    this.listCargos = await this.Httpdata.ConsultasMaestros(Empresa, 0, "p", "perfil");
    this.listNivelAcademico = await this.Httpdata.ConsultasMaestros(Empresa, 159, "academico", "subcriterio");
    this.listLenguaExtranjera = await this.Httpdata.ConsultasMaestros(Empresa, 159, "idioma", "subcriterio");
    this.listEstado = await this.Httpdata.ConsultasMaestros(Empresa, 0, "p", "candidato");
      
    this.listEspecificaciones = await  this.Httpdata.ConsultasMaestros(Empresa, 159, "experiencia", "subcriterio");
      
      
    this.listEpses = await this.Httpdata.ConsultasMaestros(Empresa, 159, "eps", "subcriterio");
    this.listFondoPensiones = await this.Httpdata.ConsultasMaestros(Empresa, 159, "fondo_pension", "subcriterio");
    this.listFondoCaja = await this.Httpdata.ConsultasMaestros(Empresa, 159, "fondo_caja", "subcriterio");
    this.listFondoCesantias =  await this.Httpdata.ConsultasMaestros(Empresa, 159, "fondo_cesantias", "subcriterio");
    this.listAspiracionSalarial = await this.Httpdata.ConsultasMaestros(Empresa, 159, "rango_salario", "subcriterio");
    this.listFuenteReclutamientos = await this.Httpdata.ConsultasMaestros(Empresa, 159, "fuente_reclutamiento", "subcriterio");
    this.listCategorias = await this.Httpdata.ConsultasMaestros(Empresa, 159, "categoria_licencia", "subcriterio");
    this.listColodePiel = await this.Httpdata.ConsultasMaestros(Empresa, 159, "color_piel", "subcriterio");
    this.listGrupoSanguineo = await this.Httpdata.ConsultasMaestros(Empresa, 159, "grupo_sanguineo", "subcriterio");
    this.listTipoCurso = await this.Httpdata.ConsultasMaestros(Empresa, 159, "tipo_curso", "subcriterio");
    this.listTitulo = await this.Httpdata.ConsultasMaestros(Empresa, 159, "titulo", "subcriterio");
    this.listInstitucion = await this.Httpdata.ConsultasMaestros(Empresa, 159, "institucion", "subcriterio");
    this.listEntidades =  await this.Httpdata.ConsultasMaestros(Empresa, 159, "entidad", "subcriterio");
    this.listEstadoCivil = await this.Httpdata.ConsultasMaestros(Empresa, 159, "estado_civil", "subcriterio");

    this.listAddParentescos = await this.Httpdata.ConsultasMaestros(Empresa, 159, "parentesco", "subcriterio");
    console.log(this.listAddParentescos);
   
  }

  ListarDepartamento(e:any){
    console.log(e.target.value);
    let idpais = e.target.value;
    let IdEmp:number = this.Httpdata.IdEmp;
    this.Httpdata.ConsultasMaestrosDepartamento(IdEmp, idpais)
        .subscribe( 
          (datas : any)=> {      
            console.log(datas);
            this.listDeptos = datas;
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }
  ListarDepartamentoExp(e:any){
    console.log(e.target.value);
    let idpais = e.target.value;
    let IdEmp:number = this.Httpdata.IdEmp;
    this.Httpdata.ConsultasMaestrosDepartamento(IdEmp, idpais)
        .subscribe( 
          (datas : any)=> {      
            console.log(datas);
            this.listDeptosExp = datas;
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

  ListarCiudad(e:any){
    console.log(e.target.value);
    let iddepart = e.target.value;
    let IdEmp:number = this.Httpdata.IdEmp;
    this.Httpdata.ConsultasMaestrosCiudad(IdEmp, iddepart)
        .subscribe( 
        (datas : any)=> {      
            console.log(datas);
            this.listCiudades = datas;            
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

  ListarCiudadExp(e:any){
    console.log(e.target.value);
    let iddepart = e.target.value;
    let IdEmp:number = this.Httpdata.IdEmp;
    this.Httpdata.ConsultasMaestrosCiudad(IdEmp, iddepart)
        .subscribe( 
        (datas : any)=> {      
            console.log(datas);
            this.listCiudadesExp = datas;            
      }, 
      (error:any)=>console.log(error),()=>
      {
        console.log("Respuesta completa")
      }
    );
  }

  OnchangeEntidad():void{
    let index = ((document.getElementById("SLEntidad") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("SLEntidad") as HTMLInputElement).value);
    let Texto = ((document.getElementById("SLEntidad") as HTMLSelectElement).options[index].innerText);
    this.DisplayEntidad = "Entidad: " + Texto;
  }

  onItemChangeRdGenero(v:any){
    this.RadioSexo = v.target.defaultValue;
    console.log(this.RadioSexo);
  }
  onItemChangeRdLicencia(v:any){
    this.rdTipoLic = v.target.defaultValue;
    console.log(this.rdTipoLic);
  }
  onItemChangeRdTipoSangre(v:any){
    this.rdTipoSangre = v.target.defaultValue;
    console.log(this.rdTipoSangre);
  }
  onItemChangeRdTipoRef(v:any):void{
    this.rdTipoRef = parseInt(v.target.defaultValue);
  
    if(this.rdTipoRef === 1){
      this.FormViewReferenciaLaboral = true;
    }else{
      this.FormViewReferenciaLaboral = false;
    }
    
  }
  SelectTipoCandidato(e:any):void{
    let index = ((document.getElementById("cboi_tipo_candidato") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("cboi_tipo_candidato") as HTMLInputElement).value);
    let Texto = ((document.getElementById("cboi_tipo_candidato") as HTMLSelectElement).options[index].innerText);
    
    if (parseInt(valor) == 2){      
      (document.getElementById("icboExpOpEquipo") as HTMLInputElement).disabled = false;
    }else{
      (document.getElementById("icboExpOpEquipo") as HTMLInputElement).disabled = true;
    }


    console.log(this.CBOtipo_candidato);     
  }

  SelectTipoEstudio():void{
    let index = ((document.getElementById("icboTipo") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("icboTipo") as HTMLInputElement).value);
    let Texto = ((document.getElementById("icboTipo") as HTMLSelectElement).options[index].innerText);

    if (parseInt(valor) === 2){      
      (document.getElementById("icboTipoCurso") as HTMLInputElement).disabled = false;
      (document.getElementById("icboTipoNiveles") as HTMLInputElement).disabled = true;
    }else if(parseInt(valor) === 0){
      (document.getElementById("icboTipoNiveles") as HTMLInputElement).disabled = false;
      (document.getElementById("icboTipoCurso") as HTMLInputElement).disabled = true;
    }else{
      (document.getElementById("icboTipoNiveles") as HTMLInputElement).disabled = true;
      (document.getElementById("icboTipoCurso") as HTMLInputElement).disabled = true;
    }
  }

  /**
   * Validar pestañas
   * @returns boolean
   */

  ValidaTab1():boolean{
    if (this.ValidaFormularioTab1()){
      return false; 
    }    
    return true;
  }
  
  ValidaTab2():boolean{
    if (this.ValidaFormularioTab2()){
      return false; 
    }    
    return true;
  }

  ValidaTab3():boolean{
    this.ValidaFormularioTab3();
    if (this.listAddEstudios.length === 0){
      return false; 
    }    
    return true;
  }

  ValidaTab4():boolean{
    if (this.ValidaFormularioTab4()){
      return false; 
    }    
    return true;
  }
  
  ValidaTab5():boolean{
    if (this.ValidaFormularioTab5()){
      return false; 
    }    
    return true;
  }

  ValidaTab6():boolean{
    if (this.ValidaFormularioTab6()){
      return false; 
    }    
    return true;
  }
  
  /**
   * Valida que los campos no esten vacios o no seleccionados
   * Muestra en rojo los campos vacios
   * @returns boolean
   */

  ValidaFormularioTab1():boolean{

    let Retorna:boolean = false;

    this.FormValida.tipo_identificacion = false;
    this.FormValida.identificacion = false;
    this.FormValida.pais = false;
    this.FormValida.tipo = false;
    this.FormValida.departamento = false;
    this.FormValida.nombre = false;
    this.FormValida.ciudad = false;
    this.FormValida.apellido = false;
    this.FormValida.entidad = false;
    this.FormValida.estadocivil = false;
    this.FormValida.genero = false;
    this.FormValida.fnacimiento = false;
    this.FormValida.direccion = false;
    this.FormValida.telefono = false;
    this.FormValida.celular = false;
    this.FormValida.correo = false;
    this.FormValida.cargo = false;
    this.FormValida.nivelacad = false;
    this.FormValida.experiencia = false;
    this.FormValida.lenguaEx = false;

    if(this.txtidentificacion === ''){
      this.FormValida.identificacion = true;      
      Retorna = true;
    }
    
    if(this.CBOtipo_candidato === ''){
      this.FormValida.ftipo_candidato = true;      
      Retorna = true;
    }
    if(this.cbopais === ''){
      this.FormValida.pais = true;
      Retorna = true;
    }
    if(this.cboTipo === ''){
      this.FormValida.tipo = true;
      Retorna = true;
    }
    if(this.cboDpto === ''){
      this.FormValida.departamento = true;
      Retorna = true;
    }
    if(this.txtnombre === ''){
      this.FormValida.nombre = true;
      Retorna = true;
    }
    if(this.cbociudad === ''){
      this.FormValida.ciudad = true;
      Retorna = true;
    }
    if(this.txtapellido === ''){
      this.FormValida.apellido = true;
      Retorna = true;
    }
    // if(this.CBOentidad === ''){
    //   this.FormValida.entidad = true;
    //   Retorna = true;
    // }
    if(this.CBOestadocivil === ''){
      this.FormValida.estadocivil = true;
      Retorna = true;
    }
    if(this.RadioSexo === ''){
      this.FormValida.genero = true;
      Retorna = true;
    }
    if(this.txtfechanace === ''){
      this.FormValida.fnacimiento = true;
      Retorna = true;
    }
    if(this.txtdireccion === ''){
      this.FormValida.direccion = true;
      Retorna = true;
    }
    if(this.txttelefono === ''){
      this.FormValida.telefono = true;
      Retorna = true;
    }
    if(this.txtcelular === ''){
      this.FormValida.celular = true;
      Retorna = true;
    }
    if(this.txtcorreo === ''){
      this.FormValida.correo = true;
      Retorna = true;
    }
    if(this.cbocargo === ''){
      this.FormValida.cargo = true;
      Retorna = true;
    }
    if(this.cbonivel_academico === ''){
      this.FormValida.nivelacad = true;
      Retorna = true;
    }
    if(this.cboexperiencia === ''){
      this.FormValida.experiencia = true;
      Retorna = true;
    }
    if(this.cbolengua_extranjera === ''){
      this.FormValida.lenguaEx = true;
      Retorna = true;
    }
    
    return Retorna;
  }

  ValidaFormularioTab2():boolean{
    let Retorna:boolean = false;
    
    this.FormValida2.Experiencia = false;
    this.FormValida2.EPS = false;
    this.FormValida2.operaciones = false;
    this.FormValida2.Pension = false;
    this.FormValida2.Rsalarial = false;
    this.FormValida2.Caja = false;
    this.FormValida2.SalarioE = false;
    this.FormValida2.Cesantias = false;
    this.FormValida2.Tprofesional = false;
    this.FormValida2.Lconduccion = false;
    this.FormValida2.fvence = false;
    this.FormValida2.categoria = false;
    this.FormValida2.Reclutamiento = false;
    this.FormValida2.Cpiel = false;
    this.FormValida2.Gsanguineo = false;
    this.FormValida2.tiposangr = false;
    this.FormValida2.tipolic = false;
    this.FormValida2.peso = false;
    this.FormValida2.altura = false;

    if(this.CBOExpGeneral === ''){
      this.FormValida2.Experiencia = true;
      Retorna = true;
    }
    if(this.CBOEPS === ''){
      this.FormValida2.EPS = true;
      Retorna = true;
    }
    // if (parseInt(this.CBOtipo_candidato) === 2){
    //   if(this.CBOExpOperationE === ''){
    //     this.FormValida2.operaciones = true;
    //     Retorna = true;
    //   }
    // }
    if(this.CBOFpension === ''){
      this.FormValida2.Pension = true;
      Retorna = true;
    }
    if(this.CBORsalario === ''){
      this.FormValida2.Rsalarial = true;
      Retorna = true;
    }
    if(this.CBOFcaja === ''){
      this.FormValida2.Caja = true;
      Retorna = true;
    }
    
    if(this.txtSalarioEsp === '' || this.txtSalarioEsp === null){
      this.FormValida2.SalarioE = true;
      Retorna = true;
    }

    if(this.CBOFcesantias === ''){
      this.FormValida2.Cesantias = true;
      Retorna = true;
    }
    
    // if(this.TxtTProfesional === ''){
    //   this.FormValida2.Tprofesional = true;
    //   Retorna = true;
    // }
    // if(this.TxtNconduccion === ''){
    //   this.FormValida2.Lconduccion = true;
    //   Retorna = true;
    // }
    // if(this.txtfechavence === ''){
    //   this.FormValida2.fvence = true;
    //   Retorna = true;
    // }    
    // if(this.CBOCategoria === ''){
    //   this.FormValida2.categoria = true;
    //   Retorna = true;
    // }
    if(this.CBOFreclutamiento === ''){
      this.FormValida2.Reclutamiento = true;
      Retorna = true;
    }
    if(this.CBOCpiel === ''){
      this.FormValida2.Cpiel = true;
      Retorna = true;
    }
    if(this.CBOGsanguineo === ''){
      this.FormValida2.Gsanguineo = true;
      Retorna = true;
    }
    debugger;
    if(this.rdTipoSangre === ''){
      this.FormValida2.tiposangr = true;
      Retorna = true;
    }
    // if(this.rdTipoLic === ''){
    //   this.FormValida2.tipolic = true;
    //   Retorna = true;
    // }
    // if(this.txtpeso === ''){
    //   this.FormValida2.peso = true;
    //   Retorna = true;
    // }
    // if(this.txtaltura === ''){
    //   this.FormValida2.altura = true;
    //   Retorna = true;
    // }

    return Retorna;
  }

  ValidaFormularioTab3():boolean{ 
    
    let Retorna:boolean = false;

    this.FormValida3.Institucion = false;
    this.FormValida3.Titulo = false;
    this.FormValida3.Desde = false;
    this.FormValida3.Hasta = false;
    this.FormValida3.Estado = false;
    this.FormValida3.Tipo = false;
    this.FormValida3.TipoCurso = false;

    if(this.CBOinstitucional === ''){
      this.FormValida3.Institucion   = true;
      Retorna = true;  
    }
    if(this.CBOTitulo === ''){
      this.FormValida3.Titulo  = true;
      Retorna = true;  
    }
    if(this.txtfechadesde === ''){
      this.FormValida3.Desde   = true;
      Retorna = true;  
    }
    if(this.txtfechahasta === ''){
      this.FormValida3.Hasta   = true;
      Retorna = true;  
    }
    if(this.CBOestado === '-1'){
      this.FormValida3.Estado   = true;
      Retorna = true;  
    }
    if(this.CBOEstudioTipo === ''){
      this.FormValida3.Tipo   = true;
      Retorna = true;  
    }
    if(parseInt(this.CBOTipoCurso) === 2){
      if(this.CBOTipoCurso === ''){
        this.FormValida3.TipoCurso   = true;
        Retorna = true;  
      }
    }
    if (this.CBOEstudioTipo === ""){
      if (this.CBOTipoNiveles === '1000'){
        //this.FormValida3.Niveles = true;
        //Retorna = true;  
      }
    }
    
    

    return Retorna; 
  }

  ValidaFormularioTab4():boolean{ 
    let Retorna = false;

    this.FormValida4.Nombre = false;
    this.FormValida4.Celular = false;
    this.FormValida4.Telefono = false;
    this.FormValida4.Mail = false;
    this.FormValida4.Notas = false;
    this.FormValida4.TipoRef = false;

    this.FormValida4.Empresa = false;
    this.FormValida4.Cargo = false;
    this.FormValida4.TimeLabor = false;
    this.FormValida4.MotRetiro = false;

    if (this.txtmynombre === ''){
      this.FormValida4.Nombre = true;
      Retorna = true;
    }
    if (this.txtmycelular === ''){
      this.FormValida4.Celular = true;
      Retorna = true;
    }
    if (this.txtmytelefono === ''){
      this.FormValida4.Telefono = true;
      Retorna = true;
    }
    if (this.txtmycorreo === ''){
      this.FormValida4.Mail = true;
      Retorna = true;
    }
    // if (this.txtmynotaRef === ''){
    //   this.FormValida4.Notas = true;
    //   Retorna = true;
    // }
    // if (this.rdTipoRef === 0){
    //   this.FormValida4.TipoRef = true;
    //   Retorna = true;
    // }

    if (this.rdTipoRef === 1){
      if (this.txtmyempresa === ''){
        this.FormValida4.Empresa = true;
        Retorna = true;
      }
      if (this.txtmycargo === ''){
        this.FormValida4.Cargo = true;
        Retorna = true;
      }
      if (this.txtmyTimeLabor === ''){
        this.FormValida4.TimeLabor = true;
        Retorna = true;
      }
      if (this.txtmyMotivoRetiro === ''){
        this.FormValida4.MotRetiro = true;
        Retorna = true;
      }

    }

    return Retorna;
  }

  ValidaFormularioTab5():boolean{
    let Retorna:boolean = false;

    this.FormValida5.cargos = false;
    if (this.CbolistCargo === ''){
      this.FormValida5.cargos = true;
      Retorna = true;
    }
    return Retorna;
  }
  ValidaFormularioTab6():boolean{
    let Retorna:boolean = false;

    this.FormValida6.identificacion = false;
    this.FormValida6.nombre = false;
    this.FormValida6.nace = false;
    this.FormValida6.parentesco = false;
    this.FormValida6.telefono = false;    

    if(this.txtifidentificacion === ''){
      this.FormValida6.identificacion =  true;
      Retorna = true;
    }
    if(this.txtifNombre === ''){
      this.FormValida6.nombre =  true;
      Retorna = true;
    }
    debugger;
    if(this.txtifnace === '' || this.txtifnace === null || this.txtifnace === undefined){
      this.FormValida6.nace =  true;
      Retorna = true;
    }
    if(this.CBOifparentesco === ''){
      this.FormValida6.parentesco =  true;
      Retorna = true;
    }
    if(this.txtIFtelefono === ''){
      this.FormValida6.telefono =  true;
      Retorna = true;
    }

    return Retorna;
  }

/**
 * Valida los campos Tipo Numero y Correo
 * @returns String
 */

  ValidaDatosForm1():string{
    
    let mensaje:string = "";
    debugger;
    if(!this.ValidarNumero(this.txtidentificacion)){
      this.txtidentificacion = "";
      mensaje = "El N° de identificación debe ser un número";
    }
    
    if(!this.ValidarNumero(this.txttelefono)){
      this.txttelefono = "";
      mensaje = "El N° de telefono debe ser un número";
    }

    if(!this.ValidarNumero(this.txtcelular)){
      this.txtcelular = "";
      mensaje = "El N° de celular debe ser un número";
    }

    if(!this.ValidarEmail(this.txtcorreo)){
      this.txtcorreo = "";
      mensaje = "El correo ingresado no es válido";
    }

    this.ValidaFormularioTab1();
    return mensaje;
  }

  ValidaDatosForm2():string{
    let contadorChk:number = 0;
    let mensaje:string = "";
    debugger;
    if(this.chkParticipaAnterior === true){ contadorChk++;}
    if(this.chkRunt === true){ contadorChk++;}
    if(this.chkDisponibleViaja === true){ contadorChk++;}
    if(this.chkHojaVida === true){ contadorChk++;}

    if(contadorChk === 0){
      mensaje = "Debes marcar al marcar unas de las opciones \n * Participacion Anterior \n * Runt \n * Disponibilidad para viajar \n * Hoja de vida";
    }
    if (this.TxtNconduccion !== ""){
      if(!this.ValidarNumero(this.TxtNconduccion)){
        this.TxtNconduccion = "";
        mensaje = "El N° de la licencia debe ser un número";
      }
    }
    if(!this.ValidarNumero(this.TxtTProfesional)){
      this.TxtTProfesional = "";
      mensaje = "La tarjeta profesional debe ser un número";
    }
    this.ValidaFormularioTab2();
    return mensaje;
  }

  ValidaDatosForm4():string{

    let mensaje:string = "";
    if(!this.ValidarNumero(this.txtmycelular)){
      this.txtmycelular = "";
      mensaje = "El N° de celular debe ser un número";
    }
    if(!this.ValidarNumero(this.txtmytelefono)){
      this.txtmytelefono = "";
      mensaje = "El N° de teléfono debe ser un número";
    }
    if(!this.ValidarEmail(this.txtmycorreo)){
      this.txtmycorreo = "";
      mensaje = "El correo no es válido";
    }
    if (this.rdTipoRef !== 0 ){
      if(this.txtmyTimeLabor === ''){
        this.txtmyTimeLabor = "";
        mensaje = "Ingresa valor tiempo laborado";
      }
    }
    this.ValidaFormularioTab4();
    return mensaje;
  }

  ValidaDatosForm6():string{

    let mensaje:string = "";
    if(!this.ValidarNumero(this.txtifidentificacion)){
      this.txtifidentificacion = "";
      mensaje = "El N° de identificación debe ser un número";
    }
    
    if(!this.ValidarNumero(this.txtIFtelefono)){
      this.txtIFtelefono = "";
      mensaje = "El N° de teléfono debe ser un número";
    }
    
    this.ValidaFormularioTab6();
    return mensaje;
  }

  ValidaDatosModal():string{
    let mensaje:string = "";
    if(this.m1txtfechaExp === ''){      
      mensaje = "Ingresa la Fecha Expedición (opción 'Más' se encuentrá en la pestaña Datos Básicos)";
    }
    if (this.m1cboPaisExp === ''){
      mensaje = "Selecciona el pais de expedición (opción 'Más' se encuentrá en la pestaña Datos Básicos)";
    }
    if (this.m1cboDepartExp === ''){
      mensaje = "Selecciona el departamento de expedición (opción 'Más' se encuentrá en la pestaña Datos Básicos)";
    }
    if (this.m1cboCiudadExp === ''){
      mensaje = "Selecciona el ciudad de expedición (opción 'Más' se encuentrá en la pestaña Datos Básicos)";
    }
    return mensaje;
  }

  AddLenguaExtranjera():void{
    let index = ((document.getElementById("inputLenguaExtranjera") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("inputLenguaExtranjera") as HTMLInputElement).value);
    let Texto = ((document.getElementById("inputLenguaExtranjera") as HTMLSelectElement).options[index].innerText);
    
    if(index === 0) return;

    let ItemLengua = this.listAddLengua.filter((item) =>{ 
      return item.IdIdi == valor ;
    });

    if (ItemLengua.length > 0){
      this.MensajesAlert("cancel", "El Idioma ya se agregó");
      return;
    }

    let objecto:any = {
      IdIdi: parseInt(valor),      
      IdCandidato: 0,      
      IdUsuario: 0,      
      Id: 0,      
      Accion: 0,      
      descripcion:Texto
    }
    
    this.listAddLengua.push(objecto);
    console.log(this.listAddLengua);

  }

  RemoveLenguaExtranjera(posicion:number):void{
    console.log(posicion);
    this.listAddLengua.splice(posicion,1);
  }

  RemoveCategoria(posicion:number):void{    
    this.listAddCategorias.splice(posicion,1);
  }

  AddCategorias():void{
    let CatIndex = ((document.getElementById("icboCategoria") as HTMLSelectElement).selectedIndex);
    let CatValor = ((document.getElementById("icboCategoria") as HTMLInputElement).value);
    let CatTexto = ((document.getElementById("icboCategoria") as HTMLSelectElement).options[CatIndex].innerText);

    const Fvence = new Date(this.txtfechavence);        
    let LicFechaVence:string = this.GetStringLong(Fvence.toISOString(), 0, 10);
    

    let objecto:any = {   
      IdCategoria:  parseInt(CatValor),
      NomCategoria:CatTexto,
      FechaVence:LicFechaVence     
    }
    
    this.listAddCategorias.push(objecto);
    this.LimpiarFormCategorias();
  }

  AddEstudios():void{

    //Seleccionar Institucion (Censa)
    let Instindex = ((document.getElementById("icboInstitucion") as HTMLSelectElement).selectedIndex);
    let InstValor = ((document.getElementById("icboInstitucion") as HTMLInputElement).value);
    let InstTexto = ((document.getElementById("icboInstitucion") as HTMLSelectElement).options[Instindex].innerText);
    
    //Seleccionar Titulo profesional (Ingeniero de Sistema)
    let Tituloindex = ((document.getElementById("icboTitulo") as HTMLSelectElement).selectedIndex);
    let TituloValor = ((document.getElementById("icboTitulo") as HTMLInputElement).value);
    let TituloTexto = ((document.getElementById("icboTitulo") as HTMLSelectElement).options[Tituloindex].innerText);
    
    //Seleccionar Estado (culminado - En Curso - Abandonado - Aplazado )
    let Estadoindex = ((document.getElementById("icboEstado") as HTMLSelectElement).selectedIndex);
    let EstadoValor = ((document.getElementById("icboEstado") as HTMLInputElement).value);
    let EstadoTexto = ((document.getElementById("icboEstado") as HTMLSelectElement).options[Estadoindex].innerText);
    
    //Seleccionar Tipo (Pregrado - Especializacion)
    let Tipoindex = ((document.getElementById("icboTipo") as HTMLSelectElement).selectedIndex);
    let TipoValor = ((document.getElementById("icboTipo") as HTMLInputElement).value);
    let TipoTexto = ((document.getElementById("icboTipo") as HTMLSelectElement).options[Tipoindex].innerText);
    
    //Seleccionar Tipo (Curso Seminario - Diplomado)
    let TipoCursoindex = ((document.getElementById("icboTipoCurso") as HTMLSelectElement).selectedIndex);
    let TipoCursoValor = ((document.getElementById("icboTipoCurso") as HTMLInputElement).value);
    let TipoCursoTexto = ((document.getElementById("icboTipoCurso") as HTMLSelectElement).options[TipoCursoindex].innerText);
    

    

    if (this.ValidaFormularioTab3()){
      this.MensajesAlert("cancel", "Aún hay campos vacíos requeridos");
      return ; 
    }    

    const Fdesde = new Date(this.txtfechadesde);    
    const Fhasta = new Date(this.txtfechahasta);    
    let FechaDesde:string = this.GetStringLong(Fdesde.toISOString(), 0, 10);
    let FechaHasta:string = this.GetStringLong(Fhasta.toISOString(), 0, 10);

    let objecto:any = {   

      IdUsuario: this.Httpdata.IdUsuario,
      IdEstudio:  parseInt(TituloValor),

      IdInstitucion: parseInt(InstValor),
      InstitucionText:InstTexto,

      Id_nivel_estudio: parseInt(TipoValor),
      TituloText: TituloTexto,

      Id_estado_estudio: parseInt(EstadoValor),
      EstadoText: EstadoTexto,

      Id_tipo_estudio: parseInt(TipoValor),
      TipoText: TipoTexto,

      Id_tipo_curso:  (TipoCursoValor ? parseInt(TipoCursoValor) : 0) ,
      TipoCursoText: TipoCursoTexto,
      
      Fecha_Desde: FechaDesde,
      Fecha_Hasta: FechaHasta,
    }
    
    this.listAddEstudios.push(objecto);
    this.LimpiarFormEstudios();
    console.log(this.listAddEstudios);
  }

  RemoveEstudios(posicion:number):void{
    this.listAddEstudios.splice(posicion, 1);
  }

  AddReferencias():void{
    
    let nombre = this.txtmynombre;
    let celular = this.txtmycelular;
    let telefono = this.txtmytelefono;
    let correo = this.txtmycorreo;
    let nota = this.txtmynotaRef;

    let tiporef = this.rdTipoRef;
    let empresa = this.txtmyempresa;
    let cargo = this.txtmycargo;
    let TiempoLabor = this.txtmyTimeLabor;
    let motivoRetiro = this.txtmyMotivoRetiro;

    if (this.ValidaFormularioTab4()){
      this.MensajesAlert("cancel", "Aun hay campos vacios requeridos");
      return ; 
    } 

    let validatos = this.ValidaDatosForm4();
    if(validatos !== '' ){
      this.MensajesAlert("cancel", validatos);
      return ; 
    }
    

    let objecto:any = {
        Nombre : nombre,
        Celular : celular,
        Telefono : telefono,
        Mail : correo,
        Tipo: tiporef,
        Observaciones : nota,
        IdUsuario : this.Httpdata.IdUsuario,
        Empresa : empresa,
        Cargo : cargo,
        TiempoLaborado : TiempoLabor,
        MotivoRetiro : motivoRetiro

    }
    
    this.listAddReferencia.push(objecto);
    this.LimpiarFormReferencias();
    console.log(this.listAddReferencia);

  }

  RemoveReferencia(posicion:number):void{
    console.log(posicion);
    this.listAddReferencia.splice(posicion,1);
  }

  AddCargos():void{

    if (!this.ValidaTab5()){
      this.MensajesAlert("cancel", "Aun hay campos vacios requeridos");
      return ; 
    } 

    let index = ((document.getElementById("icbocargo") as HTMLSelectElement).selectedIndex);
    let valor = ((document.getElementById("icbocargo") as HTMLInputElement).value);
    let Texto = ((document.getElementById("icbocargo") as HTMLSelectElement).options[index].innerText);
    
    if(index === 0) return;
    console.log(parseInt(valor));
    let ItemCargos = this.listAddCargos.filter((item) =>{ 
      return item.IdPerfil ===  parseInt(valor);
    });
    console.log(ItemCargos);
    if (ItemCargos.length > 0){
      this.MensajesAlert("cancel", "Este cargo ya fue agregado");
      return;
    }
   
    let objecto:any = {
      IdPerfil: parseInt(valor),
      IdUsuario:this.Httpdata.IdUsuario,
      descripcion:Texto
    }
    
    this.listAddCargos.push(objecto);
    this.CbolistCargo = "";
    //console.log(this.listAddCargos);
  }
  
  RemoveCargos(posicion:number):void{
    this.listAddCargos.splice(posicion, 1);
  }

  AddInfoFamiliar():void{

    if (!this.ValidaTab6()){
      this.MensajesAlert("cancel", "Aun hay campos vacios requeridos");
      return ; 
    } 

    let ifidentificacion =  this.txtifidentificacion;
    let ifNombre =  this.txtifNombre;
    let ifnace =  (document.getElementById('inputIFNace') as HTMLInputElement).value;
    let IFtelefono =  this.txtIFtelefono;
    
    //Seleccionar parentesco
    let Tparentescoindex = ((document.getElementById("IFcboTparentesco") as HTMLSelectElement).selectedIndex);
    let TparentescoValor = ((document.getElementById("IFcboTparentesco") as HTMLInputElement).value);
    let TparentescoTexto = ((document.getElementById("IFcboTparentesco") as HTMLSelectElement).options[Tparentescoindex].innerText);
    
    let ifparentesco =  parseInt(TparentescoValor);
   
    console.log(ifparentesco);

    let validatos = this.ValidaDatosForm6();
    if(validatos !== '' ){
      this.MensajesAlert("cancel", validatos);
      return ; 
    }

    let objecto:any = {
        Nit : ifidentificacion,
        Nombre : ifNombre,
        FechaNace : ifnace,
        Id_Parentesco : ifparentesco, //  Parentesco : ifparentesco,
        TelResidencia : IFtelefono
    }
    console.log(objecto);
    this.listAddInfoFamiliar.push(objecto);
    this.LimpiarFormInfoFamiliar();
    console.log(this.listAddReferencia);

  }

  RemoveFamiliar(posicion:number):void{
    console.log(posicion);
    this.listAddInfoFamiliar.splice(posicion,1);
  }

  LimpiarFormInfoFamiliar(){
    this.txtifidentificacion = "";
    this.txtifNombre = "";
    this.txtifnace = ""; 
    this.CBOifparentesco = "";
    this.txtIFtelefono = "";
  }

  LimpiarFormEstudios():void{
    this.CBOinstitucional = "";
    this.CBOTitulo = "";
    this.txtfechadesde = "";
    this.txtfechahasta = "";
    this.CBOestado = "-1";
    this.CBOEstudioTipo = "";
    this.CBOTipoCurso = "";
  }

  LimpiarFormReferencias():void{
    this.txtmynombre = '';
    this.txtmycelular = '';
    this.txtmytelefono = '';
    this.txtmycorreo = '';
    this.txtmynotaRef = '';
    
    
    this.rdTipoRef = 0;
    this.txtmyempresa = '';
    this.txtmycargo = '';
    this.txtmyTimeLabor = '';
    this.txtmyMotivoRetiro = '';
      
      
  }

  LimpiarDatosBasico():void{
    this.txtusuario = "";
    this.CBOtipo_candidato = "";
    this.txtidentificacion = "";
    this.cbopais = "";
    this.cbociudad ="";
    this.cboTipo = "";
    this.cboDpto = "";
    this.txtnombre = "";
    this.txtapellido = "";
    this.CBOentidad = "";
    this.CBOestadocivil = "";
    this.RadioSexo = "";
    this.txtfechanace = "";
    this.txtdireccion = "";
    this.txttelefono = "";
    this.txtcelular = "";
    this.txtcorreo = "";
    this.cbocargo = "";
    this.cbonivel_academico = "";
    this.cboexperiencia = "";
    this.cbolengua_extranjera = "";
    this.m1txtfechaExp = "";
    this.CBOTipoNiveles = ""
    //radio Basico
    document.querySelectorAll("[name=rdsexo]").forEach((x:any) => x.checked=false);

  }

  LimpiarFormCategorias():void{
    this.txtfechavence = "";
    this.CBOCategoria = "0";
    (document.getElementById("icboCategoria") as HTMLInputElement).value = "0";        
    (document.getElementById("txtfecha_venc") as HTMLInputElement).value = "";        
  }
  LimpiarDatosAdicionales():void{
    this.CBOExpGeneral = "";
    this.CBOEPS = "";
    this.CBOExpOperationE = "";
    this.CBOFpension = "";
    this.CBORsalario = "";
    this.CBOFcaja = "";
    this.txtSalarioEsp = "";
    this.CBOFcesantias = "";
    this.TxtTProfesional = "";
    this.TxtNconduccion = "";
    this.txtfechavence = "";
    this.TxtFvence = "";
    this.CBOCategoria = "";
    this.CBOFreclutamiento = "";
    this.CBOCpiel = "";
    this.CBOGsanguineo = "";  
    this.rdTipoLic = "";
    this.rdTipoSangre = "";
    this.chkParticipaAnterior = false;
    this.chkRunt = false;
    this.chkDisponibleViaja = false;
    this.chkHojaVida = false;
    this.txtpeso = "";
    this.txtaltura = "";

    (document.getElementById("chkPartAnterior") as  HTMLInputElement).checked = false;
    (document.getElementById("chkRunt")  as  HTMLInputElement).checked = false;
    (document.getElementById("chkviajar")  as  HTMLInputElement).checked = false;
    (document.getElementById("chkHoja")  as  HTMLInputElement).checked = false;

    document.querySelectorAll("[name=rdlicencia]").forEach((x:any) => x.checked=false);
    document.querySelectorAll("[name=inlineRadioOptions]").forEach((x:any) => x.checked=false);
    
    this.DisplayEntidad = "";

    this.CbolistCargo = "";

  }
  LimpiarListas():void{
    this.listAddLengua = [];
    this.listAddEstudios = [];
    this.listAddReferencia = [];
    this.listAddCargos = [];
    this.listAddInfoFamiliar = [];
    this.listAddCategorias = [];
    this.RemoveFileUpload();
    for(let key in this.formData){
      this.formData.delete(key);
    }
  }
  GuardarInformacionCandidato():void{
    
    
    debugger;
    let valida = this.ValidaTodoPestañasFormulario();
    if (!valida) {
      this.MensajesAlert("cancel", "Aún tienes campos vacíos en una de las pestañas");
      return;
    }
    debugger;
    let validaMensaje:string = this.ValidaDatosForm1();
    if (validaMensaje !== ''){
      this.MensajesAlert('cancel', "En la pestaña 'Datos Básicos' falta " + validaMensaje);
      return ;
    }
    let validaMensaje1:string = this.ValidaDatosForm2();
    if (validaMensaje1 !== ''){
      this.MensajesAlert('cancel', "En la pestaña 'Datos Adicionales' falta " + validaMensaje1);
      return ;
    }
    if (this.listAddEstudios.length === 0){
      this.MensajesAlert('cancel', "En la pestaña 'Estudios' no añadiste nada a la lista");
      return ;
    }
    if(this.listAddReferencia.length === 0){
      this.MensajesAlert('cancel', "En la pestaña 'Referencias' no añadiste nada a la lista");
      return ;
    }
    if(this.listAddCargos.length === 0){
      this.MensajesAlert('cancel', "En la pestaña 'Cargos' no añadiste nada a la lista");
      return ;
    }
    if(this.listAddInfoFamiliar.length === 0){
      this.MensajesAlert('cancel', "En la pestaña 'Información Familiar' no añadiste nada a la lista");
      return ;
    }
    let validatosModal = this.ValidaDatosModal();
    if(validatosModal !== '' ){
      this.MensajesAlert("cancel", validatosModal);
      return ; 
    }
    console.log("Llego aquí parametros");

    debugger;
    
    const fechaExp = new Date(this.m1txtfechaExp);    
    let FechaExpedicion:string = this.GetStringLong(fechaExp.toISOString(), 0, 10);
    console.log(this.ListArchivoAdjuntos);
    debugger;
    let objetoWs:any = {
      emp: this.Httpdata.IdEmp,
      nit: this.txtidentificacion,
      id_rh_tipo_documento: parseInt(this.cboTipo),
      nombre: this.txtnombre,
      apellido: this.txtapellido,
      id_usuario: this.Httpdata.IdUsuario, //preguntar como va a ser el tema del id usuario si va a ser quemado o que
      genero: parseInt(this.RadioSexo),
      fecha_nacimiento: (document.getElementById("txtfecha_nace") as HTMLInputElement).value,  //this.txtfechanace,
      id_cot_cliente_pais: parseInt(this.cbopais),
      direccion: this.txtdireccion,
      telefono: this.txttelefono,
      celular: this.txtcelular,
      mail: this.txtcorreo,
      id_rh_perfil: parseInt(this.cbocargo),
      id_cot_cliente: 0,
      id_rh_requisicion_personal: 0,
      id_rh_nivel_academico: parseInt(this.cbonivel_academico),
      id_rh_experiencia: parseInt(this.cboexperiencia),
      observaciones: "",
      id_tipo_candidato: parseInt(this.CBOtipo_candidato),
      id_rh_experiencia_sector: parseInt(this.CBOExpGeneral),
      id_disponibilidad_viaje: this.convertBoolToInt(this.chkDisponibleViaja),
      id_participacion_anterior: this.convertBoolToInt(this.chkParticipaAnterior),
      id_salario: parseInt(this.CBORsalario),
      id_rh_fuente_reclutamiento: parseInt(this.CBOFreclutamiento),
      id_trajo_hoja_vida: this.convertBoolToInt(this.chkHojaVida),
      estado: 0,
      bloqueado: 0,
      motivo: "",
      licencia: this.TxtNconduccion,
      tarjeta: this.TxtTProfesional,
      tipo_licencia: parseInt(this.rdTipoLic),
      fecha_vence_licencia: (document.getElementById("txtfecha_venc") as HTMLInputElement).value, //this.txtfechavence
      runt: this.convertBoolToInt(this.chkRunt),
      id_rh_categoria: parseInt(this.CBOCategoria),
      id_rh_color_piel: parseInt(this.CBOCpiel),
      id_rh_grupo_sanguineo: parseInt(this.CBOGsanguineo),
      rh: this.rdTipoSangre,
      id_rh_experiencia_equipo: (this.CBOExpOperationE ? parseInt(this.CBOExpOperationE) : 0 ),
      peso: (this.txtpeso ? parseFloat(this.txtpeso) : 0 ),
      altura: (this.txtaltura ? parseFloat(this.txtaltura) : 0 ),
      salario: this.txtSalarioEsp,
      id: 0,
      accion: 0,
      id_Usuario_Asociado: 0,
      id_con_cco: 0,
      id_Entidad: parseInt(this.CBOentidad),
      fecExpedicion: FechaExpedicion, 
      lugarExpedicion: "lugar",
      idRhEstadoCivil: parseInt(this.CBOestadocivil),
      idRhEps: parseInt(this.CBOEPS),
      idRhFondoPension: parseInt(this.CBOFpension),
      idRhFondoCaja: parseInt(this.CBOFcaja),
      idRhFondoCesantias: parseInt(this.CBOFcesantias)
  
      //Archivo_base64 : this.ListArchivoAdjuntos[0].FileBase64,

      // ListLenguaExtranjeras : this.listAddLengua, 
      // p4estudio : this.listAddEstudios,
      // p5referencia : this.listAddReferencia,
      // p6cargo : this.listAddCargos,
      // p7InfoFamiliar : this.listAddInfoFamiliar 
      
    };    
    this.MensajesAlert("starloading");
    console.log(JSON.stringify(objetoWs));
    this.Httpdata.PostCandidato(objetoWs)
        .subscribe( 
        (datas : any)=> {      
            console.log(datas);
            

              //Guardar Idioma
              for (let i = 0; i < this.listAddLengua.length; i++) {
                this.listAddLengua[i].IdCandidato = datas.response.valor;
                this.listAddLengua[i].IdUsuario = this.Httpdata.IdUsuario;                
              }
              // Guardar Estudios
              for (let j = 0; j < this.listAddEstudios.length; j++) {
                this.listAddEstudios[j].IdCandidato = datas.response.valor;                
              }
              // Guardar Referencias
              for (let k = 0; k < this.listAddReferencia.length; k++) {
                this.listAddReferencia[k].IdCandidato = datas.response.valor;                
              }
              // Guardar Cargos
              for (let l = 0; l < this.listAddCargos.length; l++) {
                this.listAddCargos[l].IdCandidato = datas.response.valor;                
              }
              // Guardar Familiar
              for (let l = 0; l < this.listAddInfoFamiliar.length; l++) {
                this.listAddInfoFamiliar[l].Id_candidato = datas.response.valor;                
              }
              // Guardar Lic Categoria
              for (let k = 0; k < this.listAddCategorias.length; k++) {
                this.listAddCategorias[k].Id_candidato = datas.response.valor;                
              }
              // Guardar Archivo
              this.formData.append('Emp', this.Httpdata.IdEmp.toString());
              this.formData.append('IdUsuario', this.Httpdata.IdUsuario.toString());
              this.formData.append('IdCandidato', datas.response.valor);
              this.guardarMaestrosCandidato();

              //Limpiar Campos
              // this.LimpiarDatosBasico();
              // this.LimpiarDatosAdicionales();
              // this.LimpiarListas();

                                       
            
      }, 
      (error:any)=>console.log(error),()=>
      {
        
        console.log("Respuesta completa")
      }
    );
  }

  async guardarMaestrosCandidato(){
    if (this.listAddLengua.length !== 0){
      let idioma = await this.Httpdata.GuardarIdiomaCandidato(this.listAddLengua);    
    }
    let estudios = await this.Httpdata.GuardarEstudiosCandidato(this.listAddEstudios);
    let referencias = await this.Httpdata.GuardarReferenciasCandidato(this.listAddReferencia);
    let cargos = await this.Httpdata.GuardarCargosCandidato(this.listAddCargos);
    let familiar = await this.Httpdata.GuardarFamiliarCandidato(this.listAddInfoFamiliar);
    if (this.listAddCategorias.length !== 0) {
      let categoria = await this.Httpdata.GuardarLicCategoriaCandidato(this.listAddCategorias);
    }
    if (this.ListArchivoAdjuntos.length !== 0 ){
      let archivo = this.Httpdata.ArchivoHVCandidato(this.formData);
    }

    this.LimpiarDatosBasico();
    this.LimpiarDatosAdicionales();
    this.LimpiarListas();
    this.MensajesAlert("stoploading");
    this.MensajesAlert("ok", "Se guardo correctamente la información") 
  }
  
  BorrarTodoFormulario():void{
    this.LimpiarDatosBasico();
    this.LimpiarDatosAdicionales();
    this.LimpiarListas();
    this.MensajesAlert("ok", "Limpiaron los campos correctamente!!") 
  }
  

  ValidaTodoPestañasFormulario():boolean{
  
    if (this.ValidaFormularioTab1()){
      return false; 
    }    	
    if (this.ValidaFormularioTab2()){
        return false; 
    }    	
    
    return true;  
  }

  mostrarmensaje(){
    this.ValidaFormularioTab1();
    this.MensajesAlert('ok', 'Información correctamente');
  }
  mostrarmensajeErr(){
    this.MensajesAlert('cancel', 'Información correctamente');
  }

  MensajesAlert(tipo:string, msg?:string, time?:number):void{
    switch (tipo) {
      case 'ok':
        Swal.fire({
          title: "Mensaje",
          text: msg,
          icon:'success',
          confirmButtonText: "Aceptar",
        });    
        break;
      case 'cancel':
        Swal.fire({
          title: "Error!",
          text: msg,
          icon: 'error',
          confirmButtonText: "Aceptar",
        });    
        break;
      case 'timer':

        let timerInterval:any;
        Swal.fire({
          title: 'Procesando',
          html: msg,
          timer: time,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b:any = Swal.getHtmlContainer()?.querySelector("b")
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
            this.MensajesAlert("ok", msg)
          }
        })
        break;
        case 'starloading':
          Swal.fire({
              title: 'Un momento por favor !',
              html: 'Procesando...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading()
            }
          });
          break;
        case 'stoploading':
          Swal.hideLoading()
          break;
    
      default:
        break;
    }
    
  }
  
/* *************************************************************************************************************** */

handleFileInputArchivos(fileInput: any) {
  
  let me = this;
  var target = fileInput.target || fileInput.srcElement;
  let file = fileInput.target.files;
  
  if (target.value.length == 0) {    
    this.FileSelected = "Seleccionar un Archivo";
    this.ListArchivoAdjuntos = [];
    me.VerImageFileSelected('vacio');
  } else {    
    this.FileSelected = target.value;  
  }

  if (file && file[0]) {

      const allowed_types = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',        
        'application/msword'
      ];
      
      if(this.ListArchivoAdjuntos.length === 1){
        this.MensajesAlert("cancel", "Ya tienes un archivo adjunto no se permiten más");
        return;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Archivos permitos (PDF | DOC)';     
        this.MensajesAlert("cancel", this.imageError);
        return;
      } 

      me.VerImageFileSelected(file[0].type);
      me.formData.append('Archivo', file[0]);

      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {        
        me.ImageBaseData=reader.result;        
        let objeto:any = {
          FileBase64:me.ImageBaseData
        };
        console.log(objeto);
        console.log(me.formData);
        me.ListArchivoAdjuntos.push(objeto);

        
        //me.MensajesAlert("starloading", "Se guardo correctamente la información") 
        me.MensajesAlert("ok","Archivo Adjunto Correctamente");
      };      
      
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  };
}

RemoveFileUpload():void{
    this.FileSelected = "Seleccionar un Archivo";
    this.ListArchivoAdjuntos = [];
    for(let key in this.formData){
      this.formData.delete(key);
    }
    this.VerImageFileSelected('vacio');
}

VerImageFileSelected(key:string):void{
    let PDF = 'application/pdf';
    let WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    let WORD2 = 'application/msword';
debugger;
  switch (key) {
    case PDF:
      this.ImageFileSelected = "seleccionarPDF.png";
      break;  
    case WORD: case WORD2:
      this.ImageFileSelected = "selecionadoWORD.png";
      break;
  
    default:
      this.ImageFileSelected = "sinSeleccionar.png";
      break;
  }
}

fileChangeEventImagenes(fileInput: any):void {
  this.imageError = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = [
              'image/png', 
              'image/jpeg'
            ];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';          
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';          
      }
      console.log("paso");
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs;
              console.log(img_height);
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}  

removeImage() {
  this.cardImageBase64 = null;
  this.isImageSaved = false;
}



/* *************************************************************************************************************** */

  ValidarNumero(numero:string):boolean{
    let dato:string = numero;
    let valoresAceptados = /^([0-9])*$/;
        if (!valoresAceptados.test(numero)){
            return false;
        } else {
          return true;
        }
  }

  ValidarEmail(valor:string) {
    
      let re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if(!re.exec(valor)){
        return false;
      }
      else {
        return true;
      }

  }


  openTipoDoc(content:any):void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  GetStringLong(cadena:string, IniLong:number, FinLong:number):string{
    debugger;
    let str:string = cadena.substring(IniLong, FinLong);
    return str;
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  convertBoolToInt(valor:boolean):number{
    return (valor === true ? 1 : 0);
  }
}
