
// ═══════════════════ CONSTANTS ═════════════════════════════════
const MES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MSH=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const DIAS=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const WA_CATS={
 consulta_actividades:{lbl:'Consulta actividades',ic:'🔵',bg:'#EBF5FB',col:'#2E86C1'},
 inscripcion:{lbl:'Inscripción / Alta',ic:'🟢',bg:'#EAFAF1',col:'#239B56'},
 precios:{lbl:'Precios / Tarifas',ic:'🟡',bg:'#FEFCE8',col:'#B7950B'},
 pago:{lbl:'Cobro / Pago',ic:'🔴',bg:'#FDEDEC',col:'#C0392B'},
 baja:{lbl:'Baja / Cancelación',ic:'⭕',bg:'#F4F6F7',col:'#717D7E'},
 agradecimiento:{lbl:'Agradecimiento',ic:'💜',bg:'#F5EEF8',col:'#884EA0'},
 otro:{lbl:'Otro',ic:'⚪',bg:'#F8F9FA',col:'#718096'}
};
const ALT_CATS={
 fin:{lbl:'Financiero',ic:'💰',cls:'fin'},
 act:{lbl:'Actividades',ic:'📅',cls:'act'},
 fam:{lbl:'Familias',ic:'👨‍👩‍👧',cls:'fam'},
 mkt:{lbl:'Marketing',ic:'📣',cls:'mkt'},
 adm:{lbl:'Administrativo',ic:'⚙️',cls:'adm'}
};
const DACTS=['Inglés','Inglés+MOV','Inglés+MOV 1 DÍA','Inglés + 1 DÍA MODELADO','Inglés+MOV+1 DÍA MODELADO','Refuerzo 1/Semana','Refuerzo 1,5H/Semana','Refuerzo 2H/Semana','Refuerzo 3H/Semana','Bebés mañana','Movimiento','Cerámica infantil','Apoyo Escolar','Talleres sábado','Cuidado','Taller de Música','Taller San Valentín','Taller Invierno Sensorial','Taller Primavera','Taller Pascua','Taller Semana Santa','Actividad Especial','Otros'];
const DTIPOS=['Taller','Escuela de Verano','Pago/Renovación','Especial','Cumpleaños','Excursión','Otro'];
const DGAST=['Alquiler','Luz','Agua','Internet','Seguro','Cuota autónomos','Asesoría','Materiales didácticos','Materiales cerámica','Limpieza','Publicidad/RRSS','Nóminas','Banco','Imprevistos','Otros'];
const CATS=['bebes','refuerzo','actividad','cuidado','extra','otro'];
const CLBL={bebes:'Bebés',refuerzo:'Refuerzo',actividad:'Actividad',cuidado:'Cuidado',extra:'Extra',otro:'Otro'};
const CCOL={bebes:'#7ECEC4',refuerzo:'#B0A3D4',actividad:'#F9D471',cuidado:'#6BC583',extra:'#F4976A',otro:'#A8A5C0'};
const DCATS={'Bebés mañana':'bebes','Inglés':'actividad','Inglés+MOV':'actividad','Inglés+MOV 1 DÍA':'actividad','Inglés + 1 DÍA MODELADO':'actividad','Inglés+MOV+1 DÍA MODELADO':'actividad','Refuerzo 1/Semana':'refuerzo','Refuerzo 1,5H/Semana':'refuerzo','Refuerzo 2H/Semana':'refuerzo','Refuerzo 3H/Semana':'refuerzo','Movimiento':'actividad','Cerámica infantil':'actividad','Apoyo Escolar':'refuerzo','Cuidado':'cuidado','Taller de Música':'extra','Taller San Valentín':'extra','Taller Invierno Sensorial':'extra','Taller Primavera':'extra','Taller Pascua':'extra','Taller Semana Santa':'extra','Talleres sábado':'actividad','Actividad Especial':'extra','Otros':'otro'};
const DWTS={bebes:.10,refuerzo:.20,actividad:.50,cuidado:.10,extra:.10};
const PAL=['#7ECEC4','#F4976A','#B0A3D4','#F9D471','#6BC583','#E87070','#5FBAB0','#84CC16','#F97316','#14B8A6'];
const BVARS=[{k:'ingresos',l:'Ingresos cobrados'},{k:'gastos',l:'Gastos totales'},{k:'beneficio',l:'Beneficio'},{k:'pendiente',l:'Pendiente cobro'},{k:'n_alumnos',l:'Nº Alumnos'},{k:'nmn',l:'NMN'},{k:'ing_medio',l:'Ingreso medio/alumno'},{k:'gasto_medio',l:'Gasto medio/alumno'},{k:'margen',l:'Margen (%)'}];

// ═══════════════════ STATE ═════════════════════════════════════
let cM=new Date().getMonth()+1,cY=new Date().getFullYear(),cYr=new Date().getFullYear();
let cTab='inicio',regTab='ing',asiTab='wa',waTab='hist';
let cCY=new Date().getFullYear(),cCM=new Date().getMonth()+1;
let Rs={mes:6,nmn:6,res:6};
let eChId=null,eAlId=null,eNtId=null,eEvId=null,eIngId=null,eGastId=null,ePpId=null,qFrom=null;
let crOpen=false,waAnalyzing=false,feedLoading=false;
let pendingWAResp='',pendingWACat='otro',pendingWAName='';
const CHS={};

// ═══════════════════ DATA LAYER ════════════════════════════════
const ld=k=>{try{return JSON.parse(localStorage.getItem('lms_'+k)||'[]')}catch{return[]}};
const sv=(k,v)=>localStorage.setItem('lms_'+k,JSON.stringify(v));
const ldO=(k,d)=>{try{const r=localStorage.getItem('lms_'+k);return r?JSON.parse(r):d}catch{return d}};
const svO=(k,v)=>localStorage.setItem('lms_'+k,JSON.stringify(v));
const gE=()=>ld('ext');    const sE=d=>sv('ext',d);
const gG=()=>ld('gst');    const sG=d=>sv('gst',d);
const gAl=()=>ld('alm');   const sAl=d=>sv('alm',d);
const gEv=()=>ld('evs');   const sEv=d=>sv('evs',d);
const gAlt=()=>ld('alt');  const sAlt=d=>sv('alt',d);
const gNt=()=>ld('nts');   const sNt=d=>sv('nts',d);
const gAC=()=>ld('ach');   const sAC=d=>sv('ach',d);
const gWAH=()=>ld('wah');  const sWAH=d=>sv('wah',d);
const gDN=()=>ldO('dyn',{});const sDN=d=>svO('dyn',d);
const gTmpl=()=>ld('tmpl');const sTmpl=d=>sv('tmpl',d);
const gFeed=()=>ldO('feed_items',[]);   const sFeed=d=>svO('feed_items',d);
const gFeedP=()=>ldO('feed_prefs',{liked:[],saved:[],skipped:[],kw:{}}); 
const sFeedP=d=>svO('feed_prefs',d);
const gSet=k=>ldO('set_'+k,null); const sSet=(k,v)=>svO('set_'+k,v);
const getApiKey=()=>gSet('apikey')||'';

const INIT_SECS_DEF=[
 {id:'stats',label:'📊 Resumen del mes',enabled:true},
 {id:'cumpleanos',label:'🎂 Cumpleaños',enabled:true},
 {id:'alertas',label:'🔔 Alertas del sistema',enabled:true},
 {id:'hoy',label:'📅 Agenda de hoy',enabled:true},
 {id:'pendientes',label:'⏳ Pagos pendientes',enabled:true},
 {id:'notas_top',label:'📝 Notas prioritarias',enabled:false},
 {id:'salud',label:'💚 Salud del negocio',enabled:false},
];
const INIT_STATS_DEF=[
 {id:'cobrado',label:'Cobrado',cls:'gr',enabled:true},
 {id:'pendiente',label:'Pendiente',cls:'co',enabled:true},
 {id:'gastos',label:'Gastos',cls:'nt',enabled:true},
 {id:'beneficio',label:'Beneficio',cls:'bc',enabled:true},
 {id:'ninos',label:'Niños',cls:'lv',enabled:true},
 {id:'nmn',label:'NMN',cls:'nt',enabled:false},
 {id:'margen',label:'Margen %',cls:'gr',enabled:false},
 {id:'ninos_ant',label:'Niños mes ant.',cls:'lv',enabled:false},
];
function gCfg(){
 try{const r=localStorage.getItem('lms_cfg');if(r){const c=JSON.parse(r);
  c.actividades=c.actividades||DACTS.slice();c.gastos=c.gastos||DGAST.slice();
  c.cats=c.cats||{...DCATS};c.wts=c.wts||{...DWTS};c.nmn_obj=c.nmn_obj||20;
  c.tipos_evento=c.tipos_evento||DTIPOS.slice();c.max_ninos_dia=c.max_ninos_dia||20;
  c.inicio_secs=c.inicio_secs||INIT_SECS_DEF.map(s=>({...s}));
  c.inicio_stats=c.inicio_stats||INIT_STATS_DEF.map(s=>({...s}));
  return c;}}catch{}
 return{actividades:DACTS.slice(),gastos:DGAST.slice(),cats:{...DCATS},wts:{...DWTS},nmn_obj:20,tipos_evento:DTIPOS.slice(),max_ninos_dia:20,inicio_secs:INIT_SECS_DEF.map(s=>({...s})),inicio_stats:INIT_STATS_DEF.map(s=>({...s}))};
}
function sCfg(c){localStorage.setItem('lms_cfg',JSON.stringify(c))}
function getAllData(){return{extras:gE(),gastos:gG(),alumnos:gAl(),eventos:gEv(),alertas:gAlt(),notas:gNt(),config:gCfg(),adv_charts:gAC(),wa_history:gWAH(),templates:gTmpl(),feed_items:gFeed(),feed_prefs:gFeedP(),day_notes:gDN(),v:4,ts:new Date().toISOString()}}
function loadAll(d){
 if(d.extras)sE(d.extras);if(d.gastos)sG(d.gastos);if(d.alumnos)sAl(d.alumnos);
 if(d.eventos)sEv(d.eventos);if(d.alertas)sAlt(d.alertas);if(d.notas)sNt(d.notas);
 if(d.config)sCfg(d.config);if(d.adv_charts)sAC(d.adv_charts);
 if(d.wa_history)sWAH(d.wa_history);if(d.templates)sTmpl(d.templates);
 if(d.feed_items)sFeed(d.feed_items);if(d.feed_prefs)sFeedP(d.feed_prefs);
 if(d.day_notes)sDN(d.day_notes);
}
let _id=Date.now(); const gid=()=>(++_id).toString(36)+Math.random().toString(36).slice(2,5);

// ═══════════════════ COMPUTED ══════════════════════════════════
const extM=(y,m)=>gE().filter(e=>e.año==y&&e.mes==m);
const gastM=(y,m)=>gG().filter(g=>g.año==y&&g.mes==m);
const gastT=(y,m)=>gastM(y,m).reduce((s,g)=>s+(+g.importe||0),0);

/* ═════════════════════════════════════════════════════════════════════════
   MOTOR DE CÁLCULO ÚNICO (V9) — SINGLE POINT OF TRUTH
   Todas las cifras de dinero y de nº de niños de TODA la app salen de aquí.
   Ninguna pantalla vuelve a sumar cuotas por su cuenta.

   REGLAS DE NEGOCIO:
    · cuota    = precio total de la línea (facturado).
    · anticipo = dinero YA cobrado por adelantado.
    · pagado   = ✅ significa "ya no queda nada pendiente".
        → pagado === true  : cobrado = cuota           , pendiente = 0
        → pagado === false : cobrado = anticipo         , pendiente = cuota - anticipo
      INVARIANTE: cobrado + pendiente = cuota (en toda línea y en todo mes).
    · Un ingreso con hermanos (hermanoIngIds) es UN pago que cubre a VARIOS
      niños: el dinero cuenta UNA vez, pero los niños cuentan TODOS.
    · Nº de niños del mes = niños DISTINTOS con algún ingreso ese mes.
      Un niño con 2 actividades cuenta 1. Dos hermanos cuentan 2.
   ═════════════════════════════════════════════════════════════════════════ */
const CALC={
 num(v){const n=parseFloat(v);return Number.isFinite(n)?n:0;},
 r2(n){return Math.round((n+Number.EPSILON)*100)/100;},
 // ── Importes por línea de ingreso ──
 cuota(e){return Math.max(0,CALC.num(e&&e.cuota));},
 anticipo(e){return Math.min(CALC.cuota(e),Math.max(0,CALC.num(e&&e.anticipo)));},
 cobrado(e){return(e&&e.pagado)?CALC.cuota(e):CALC.anticipo(e);},
 pendiente(e){return(e&&e.pagado)?0:CALC.r2(CALC.cuota(e)-CALC.anticipo(e));},
 // ── Niños cubiertos por una línea (titular + hermanos del pago conjunto) ──
 ninosDe(e){
  const ids=[];if(!e)return ids;
  if(e.alumnoId)ids.push(e.alumnoId);
  (e.hermanoIngIds||(e.hermanoIngId?[e.hermanoIngId]:[])).forEach(id=>{if(id&&ids.indexOf(id)<0)ids.push(id);});
  return ids;
 },
 // ── Unidades de inscripción de una línea (titular + hermanos) ──
 unidades(e){const n=CALC.ninosDe(e).length;return n>0?n:1;},
 // ── Agregado de una lista de ingresos ──
 agregar(list){
  const ids=new Set();let total=0,cobrado=0,pendiente=0,insc=0;
  (list||[]).forEach(e=>{
   total+=CALC.cuota(e);cobrado+=CALC.cobrado(e);pendiente+=CALC.pendiente(e);
   insc+=CALC.unidades(e);
   CALC.ninosDe(e).forEach(id=>ids.add(id));
  });
  return{total:CALC.r2(total),cobrado:CALC.r2(cobrado),pendiente:CALC.r2(pendiente),
         ninos:ids.size,ninosIds:ids,inscripciones:insc,lineas:(list||[]).length};
 },
 // ── Resumen completo de un mes (ÚNICA fuente para Inicio/Ingresos/Resumen/Análisis) ──
 mes(y,m){
  const a=CALC.agregar(extM(y,m));
  const gastos=CALC.r2(gastT(y,m));
  const beneficio=CALC.r2(a.cobrado-gastos);
  const margen=a.cobrado>0?Math.round(beneficio/a.cobrado*100):null;
  const ingMedio=a.ninos>0?a.cobrado/a.ninos:null;
  const gastoMedio=a.ninos>0?gastos/a.ninos:null;
  const nmn=(gastos>0&&ingMedio>0)?gastos/ingMedio:null;
  return{y,m,...a,gastos,beneficio,margen,ingMedio,gastoMedio,nmn};
 }
};
// ── API pública (compatibilidad con el resto de la app) ──
const ingM=(y,m)=>CALC.mes(y,m).cobrado;
const pendM=(y,m)=>CALC.mes(y,m).pendiente;
const factM=(y,m)=>CALC.mes(y,m).total;
const benM=(y,m)=>CALC.mes(y,m).beneficio;
const mgM=(y,m)=>CALC.mes(y,m).margen;
const nNinos=(y,m)=>CALC.mes(y,m).ninos;
const nAl=(y,m)=>CALC.mes(y,m).ninos;
const nInscr=(y,m)=>CALC.mes(y,m).inscripciones;
const nPag=(y,m)=>extM(y,m).filter(e=>CALC.pendiente(e)===0).length;
const imM=(y,m)=>CALC.mes(y,m).ingMedio;
const gmM=(y,m)=>CALC.mes(y,m).gastoMedio;
function nmnCalc(y,m){return CALC.mes(y,m).nmn;}
function nmnByCat(y,m){
 const cfg=gCfg(),wts=cfg.wts;const ext=extM(y,m);const g=gastT(y,m);if(!g)return{};
 const gMat=gastM(y,m).filter(g=>['Materiales didácticos','Materiales cerámica'].includes(g.concepto)).reduce((s,g)=>s+(+g.importe||0),0);
 const gNM=g-gMat;const res={};
 const totalNinos=CALC.agregar(ext).ninos||1;
 CATS.forEach(cat=>{const al=ext.filter(e=>(cfg.cats[e.actividad]||'otro')===cat);if(!al.length)return;
  const ag=CALC.agregar(al);const ic=ag.cobrado,nc=ag.ninos||ag.inscripciones,imc=nc>0?ic/nc:null;
  const wt=wts[cat]||0,ge=gNM*wt+gMat*(nc/totalNinos);
  res[cat]={nmn:imc&&ge?ge/imc:null,n:nc,imc,ge};});
 return res;
}
function ingByAct(y,m){const r={};extM(y,m).forEach(e=>{const c=CALC.cobrado(e);if(c>0)r[e.actividad]=(r[e.actividad]||0)+c;});return r}
function annData(y){const rows=[];for(let m=1;m<=12;m++){const s=CALC.mes(y,m);if(s.cobrado>0||s.gastos>0||s.total>0||s.ninos>0)rows.push({m,mes:MES[m-1],i:s.cobrado,g:s.gastos,ben:s.beneficio,n:s.ninos,ins:s.inscripciones,pend:s.pendiente,fact:s.total,nmn:s.nmn,mg:s.margen});}return rows;}
function salud(y){const d=annData(y);if(!d.length)return null;const tI=d.reduce((s,r)=>s+r.i,0),tG=d.reduce((s,r)=>s+r.g,0),ben=tI-tG,mg=tI>0?Math.round(ben/tI*100):0;if(ben<0)return{t:'REVISAR',c:'warn',e:'⚠️',d:'Gastos superiores a ingresos en '+y};if(mg>=35)return{t:'EXCELENTE',c:'excel',e:'🌟',d:'Margen del '+mg+'% — Negocio muy sano'};return{t:'SANO',c:'ok',e:'✅',d:'Margen del '+mg+'% — Negocio positivo'};}
function ts(n){const p=[];for(let i=n-1;i>=0;i--){let m=cM-i,y=cY;while(m<1){m+=12;y--;}p.push({y,m,l:MSH[m-1]+"'"+String(y).slice(2)});}return p;}
function getVV(k,y,m){
 if(k==='ingresos')return ingM(y,m);if(k==='gastos')return gastT(y,m);if(k==='beneficio')return benM(y,m);
 if(k==='pendiente')return pendM(y,m);if(k==='n_alumnos')return nAl(y,m);if(k==='nmn')return nmnCalc(y,m)||0;
 if(k==='ing_medio')return imM(y,m)||0;if(k==='gasto_medio')return gmM(y,m)||0;if(k==='margen')return mgM(y,m)||0;
 if(k.startsWith('a:'))return CALC.agregar(extM(y,m).filter(e=>e.actividad===k.slice(2))).cobrado;
 if(k.startsWith('g:'))return gastM(y,m).filter(g=>g.concepto===k.slice(2)).reduce((s,g)=>s+(+g.importe||0),0);
 return 0;
}
function aVars(){const cfg=gCfg(),v=[...BVARS];cfg.actividades.forEach(a=>v.push({k:'a:'+a,l:'Ing · '+a}));cfg.gastos.forEach(c=>v.push({k:'g:'+c,l:'Gasto · '+c}));return v;}
function alSt(id){const ex=gE().filter(e=>e.alumnoId===id&&CALC.cobrado(e)>0);if(!ex.length)return{total:0,last:null,lastA:null};const tot=CALC.r2(ex.reduce((s,e)=>s+CALC.cobrado(e),0));const sr=ex.slice().sort((a,b)=>b.año*12+b.mes-(a.año*12+a.mes));return{total:tot,last:sr[0]?MES[sr[0].mes-1]+' '+sr[0].año:null,lastA:sr[0]?.actividad||null};}
function edad(fn){if(!fn)return null;const b=new Date(fn),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a>=0?a:null;}

// Detect unpaid students (smart alerts)
let iSortCol=null,iSortDir=1;
function sortIng(col){if(iSortCol===col)iSortDir*=-1;else{iSortCol=col;iSortDir=1;}rIng();}

// Normalizar IDs de hermanos: siempre devuelve array (compat V6)
function normHIds(al){return al.hermanoIds||(al.hermanoId?[al.hermanoId]:[]);}
function normHIngIds(e){return e.hermanoIngIds||(e.hermanoIngId?[e.hermanoIngId]:[]);}
// Nombre combinado para un ingreso con hermanos
function alumnoNombreCombinado(e,alms){
 const hIds=normHIngIds(e);
 if(!hIds.length)return e.nombre||'—';
 const partes=[e.nombre||'—',...hIds.map(id=>{const a=alms.find(x=>x.id===id);return a?a.nombre:null;}).filter(Boolean)];
 return partes.join(' + ');
}
function buildWABtn(alumnoId,hermanoIngIds,alumnoNom,actividad,mes,pendiente,size){
 const alms=gAl();let tel='';
 const ids=[alumnoId,...(Array.isArray(hermanoIngIds)?hermanoIngIds:hermanoIngIds?[hermanoIngIds]:[])].filter(Boolean);
 for(const id of ids){const a=alms.find(x=>x.id===id);if(a?.telefono){tel=a.telefono.replace(/[\s\-]/g,'');break;}}
 const msg=encodeURIComponent('Hola! Te recordamos que la cuota de '+alumnoNom+' ('+actividad+') del mes de '+mes+' está pendiente ('+fmt(pendiente)+'). Un saludo, La Mar de Salaos 🌊');
 const cls='btn bco '+(size||'btn-xs');
 if(tel)return`<a href="https://wa.me/34${tel}?text=${msg}" target="_blank" class="${cls}" style="text-decoration:none">📲</a>`;
 return`<button class="${cls}" onclick="toast('Sin teléfono registrado')">📲</button>`;
}

function getUnpaidByMonth(){
 const alms=gAl(),all=gE().filter(e=>CALC.pendiente(e)>0);
 const groups={};
 all.forEach(e=>{
  const key=`${e.año}-${String(e.mes).padStart(2,'0')}`;
  if(!groups[key])groups[key]={key,año:e.año,mes:e.mes,label:MES[e.mes-1]+' '+e.año,items:[],total:0};
  const pend=CALC.pendiente(e);
  const hIds=normHIngIds(e);
  const esHermanos=hIds.length>0;
  const alumno=alumnoNombreCombinado(e,alms);
  groups[key].items.push({id:e.id,alumno,actividad:e.actividad,pendiente:pend,esHermanos,alumnoId:e.alumnoId,hermanoIngIds:hIds});
  groups[key].total+=pend;
 });
 return Object.values(groups).sort((a,b)=>(a.año*12+a.mes)-(b.año*12+b.mes));
}

function getUnpaidAlerts(){
 const today=new Date(),d=today.getDate();
 const alms=gAl();const alerts=[];const seenIds=new Set();
 const buildAlert=(e,mes,urgency)=>{
  const pend=CALC.pendiente(e);
  const hIds=normHIngIds(e);
  const esHermanos=hIds.length>0;
  const alumno=alumnoNombreCombinado(e,alms);
  return{type:'unpaid',alumno,actividad:e.actividad,cuota:e.cuota,pendiente:pend,id:e.id,mes,urgency,esHermanos,alumnoId:e.alumnoId,hermanoIngIds:hIds};
 };
 extM(cY,cM).filter(e=>CALC.pendiente(e)>0).forEach(e=>{if(seenIds.has(e.id))return;seenIds.add(e.id);alerts.push(buildAlert(e,MES[cM-1]+' '+cY,d>10?'urgent':'warn'));});
 let pm=cM-1,py=cY;if(pm<1){pm=12;py--;}
 extM(py,pm).filter(e=>CALC.pendiente(e)>0).forEach(e=>{if(seenIds.has(e.id))return;seenIds.add(e.id);alerts.push(buildAlert(e,MES[pm-1]+' '+py,'urgent'));});
 return alerts;
}

// ═══════════════════ FORMAT ════════════════════════════════════
const fmt=n=>n===null||n===undefined?'—':(Math.round(n*100)/100).toLocaleString('es-ES',{minimumFractionDigits:0,maximumFractionDigits:2})+' €';
const fN=(n,d=1)=>n===null||n===undefined?'—':(Math.round(n*Math.pow(10,d))/Math.pow(10,d)).toLocaleString('es-ES');
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const el=id=>document.getElementById(id);
const st=(id,v)=>{const e=el(id);if(e)e.textContent=v;};
const fDate=iso=>{if(!iso)return'';try{return new Date(iso).toLocaleDateString('es-ES',{day:'numeric',month:'short'})}catch{return''}};

// ═══════════════════ CHART HELPERS ═════════════════════════════
const CF={family:'Nunito',weight:'700'};
function dc(id){if(CHS[id]){CHS[id].destroy();delete CHS[id];}}
function mkC(id,type,data,extra={}){
 dc(id);const cv=el(id);if(!cv)return;
 CHS[id]=new Chart(cv.getContext('2d'),{type,data,options:{responsive:true,
  plugins:{legend:{labels:{font:{...CF,size:12},boxWidth:12,boxHeight:12}},tooltip:{titleFont:CF,bodyFont:{family:'Nunito'},callbacks:{label:c=>' '+fmt(c.raw)}}},
  scales:{x:{grid:{display:false},ticks:{font:{...CF,size:11}}},y:{grid:{color:'rgba(126,206,196,.1)'},ticks:{font:{family:'Nunito',size:11},callback:v=>v+'€'}}},
  ...extra}});
}

// ═══════════════════ NAVIGATION ════════════════════════════════
function go(tab){
 cTab=tab;
 document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
 el('tab-'+tab)?.classList.add('active');
 document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
 el('panel-'+tab)?.classList.add('active');
 // FABs
 document.querySelectorAll('.fabs').forEach(f=>f.style.display='none');
 const fm={inicio:'fab-inicio',alumnos:'fab-alumnos',agenda:'fab-agenda',asistente:'fab-asistente'};
 if(fm[tab])el(fm[tab]).style.display='flex';
 // Period selector visibility + label
 const rp=el('reg-psel');
 if(rp){rp.style.display=(tab==='registro'&&regTab!=='res')?'flex':'none';}
 st('plbl',MES[cM-1]+' '+cY);
 render();
}
function setRegTab(t){
 regTab=t;['ing','gast','res'].forEach(x=>{el('ri-'+x)?.classList.toggle('active',x===t);el('reg-'+x)&&(el('reg-'+x).style.display=t===x||t==='res'&&x==='res'?'block':'none');});
 el('reg-ing').style.display=t==='ing'?'block':'none';
 el('reg-gast').style.display=t==='gast'?'block':'none';
 el('reg-res').style.display=t==='res'?'block':'none';
 if(t==='ing')rIng();else if(t==='gast')rGast();else if(t==='res')rRes();
}
function setAsiTab(t){
 asiTab=t;['wa','alt','notas','feed'].forEach(x=>{el('asi-'+x)?.classList.toggle('active',x===t);el('asi-panel-'+x)&&(el('asi-panel-'+x).style.display=t===x?'block':'none');});
 if(t==='wa')rWA();else if(t==='alt')rAltCats();else if(t==='notas')renderNotas();else if(t==='feed')rFeed();
 // Update FAB
 const icons={wa:'📲',alt:'🔔',notas:'📝',feed:'💡'};
 if(el('asi-fab'))el('asi-fab').textContent=icons[t]||'＋';
}
function asistFAB(){
 if(asiTab==='notas')openMod('modal-nota');
 else if(asiTab==='alt')openMod('modal-alerta');
 else if(asiTab==='wa')el('wa-msg-input')?.focus();
 else if(asiTab==='feed')refreshFeed();
}
function setWATab(t){waTab=t;el('wa-tab-hist')?.classList.toggle('active',t==='hist');el('wa-tab-tmpl')?.classList.toggle('active',t==='tmpl');el('wa-panel-hist').style.display=t==='hist'?'block':'none';el('wa-panel-tmpl').style.display=t==='tmpl'?'block':'none';if(t==='hist')rWAHist();else rWATmpl();}
function prevP(){cM--;if(cM<1){cM=12;cY--;}render();}
function nextP(){cM++;if(cM>12){cM=1;cY++;}render();}
function prevYear(){cYr--;rRes();}
function nextYear(){cYr++;rRes();}
function prevCal(){cCM--;if(cCM<1){cCM=12;cCY--;}renderCal();}
function nextCal(){cCM++;if(cCM>12){cCM=1;cCY++;}renderCal();}
function setR(k,n){Rs[k]=n;document.querySelectorAll('#'+k+'-pills .rp').forEach(p=>{const t=p.textContent.replace('m','');p.classList.toggle('active',parseInt(t)===n);});if(k==='mes')rAnalisisMes();else if(k==='nmn')rNMN();else if(k==='res')rRes();}

// ═══════════════════ RENDER MASTER ═════════════════════════════
function render(){
 updateHeader();
 if(cTab==='inicio')rInicio();
 else if(cTab==='registro'){st('plbl',MES[cM-1]+' '+cY);if(regTab==='ing')rIng();else if(regTab==='gast')rGast();else rRes();}
 else if(cTab==='alumnos')renderAlumnos();
 else if(cTab==='agenda')renderCal();
 else if(cTab==='asistente'){if(asiTab==='wa')rWA();else if(asiTab==='alt')rAltCats();else if(asiTab==='notas')renderNotas();else rFeed();}
 else if(cTab==='analisis')rAnalisis();
 updateAlertBadge();
}

function updateHeader(){
 const now=new Date();
 const hr=now.getHours();
 const greeting=hr<12?'Buenos días, Ana ☀️':hr<19?'Buenas tardes, Ana 🌤':'Buenas noches, Ana 🌙';
 st('hdr-greeting',greeting);st('pulse-name',greeting);
 const dateStr=now.toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long'});
 const cap=dateStr.charAt(0).toUpperCase()+dateStr.slice(1);
 st('hdr-date',cap);st('pulse-date',cap);
}

// ═══════════════════ RENDER: INICIO ════════════════════════════
// Contar niños únicos del mes → delega en el motor único (CALC)
function nNinosMes(y,m){return CALC.mes(y,m).ninos;}

function rInicio(){
 const y=cY,m=cM;
 const cfg=gCfg();
 const secs=cfg.inicio_secs||INIT_SECS_DEF.map(s=>({...s}));
 const stats=cfg.inicio_stats||INIT_STATS_DEF.map(s=>({...s}));
 let html='';

 secs.filter(s=>s.enabled).forEach(sec=>{

  // ── RESUMEN DEL MES ──
  if(sec.id==='stats'){
   const ing=ingM(y,m),pend=pendM(y,m),gast=gastT(y,m),ben=ing-gast;
   const bc=ben>0?'gr':ben<0?'rd':'nt';
   const ninos=nNinosMes(y,m);
   const nmn=gCfg().nmn_obj||20;
   let pm=m-1,py=y;if(pm<1){pm=12;py--;}
   const ninos_ant=nNinosMes(py,pm);
   const margen=ing>0?Math.round(ben/ing*100):0;
   const getVal=(id)=>{
    if(id==='cobrado')return{v:fmtK(ing),cls:'gr'};
    if(id==='pendiente')return{v:fmtK(pend),cls:'co'};
    if(id==='gastos')return{v:fmtK(gast),cls:'nt'};
    if(id==='beneficio')return{v:fmtK(ben,true),cls:bc};
    if(id==='ninos')return{v:ninos,cls:'lv'};
    if(id==='nmn')return{v:ninos+'/'+nmn,cls:ninos>=nmn?'gr':'rd'};
    if(id==='margen')return{v:margen+'%',cls:margen>=30?'gr':margen>0?'co':'rd'};
    if(id==='ninos_ant')return{v:ninos_ant,cls:'lv'};
    return{v:'—',cls:'nt'};
   };
   // Header del mes con flechas
   html+=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
    <button onclick="prevP();rInicio()" style="background:var(--tll);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:14px;color:var(--tdd);display:flex;align-items:center;justify-content:center">‹</button>
    <div style="font-size:13px;font-weight:800;color:var(--txm);text-align:center">📊 ${MES[m-1]} ${y}</div>
    <button onclick="nextP();rInicio()" style="background:var(--tll);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:14px;color:var(--tdd);display:flex;align-items:center;justify-content:center">›</button>
   </div>`;
   html+='<div class="stats-row" style="margin-bottom:14px">';
   stats.filter(s=>s.enabled).forEach(s=>{
    const {v,cls}=getVal(s.id);
    html+=`<div class="stat-box"><div class="stat-val ${cls}">${v}</div><div class="stat-lbl">${s.label}</div></div>`;
   });
   html+='</div>';
  }

  // ── CUMPLEAÑOS ──
  else if(sec.id==='cumpleanos'){
   const today=new Date();today.setHours(0,0,0,0);
   const alms=gAl().filter(a=>a.fechaNac);
   const todayD=today.getDate(),todayM=today.getMonth();
   const todayBdays=[],weekBdays=[];
   alms.forEach(a=>{
    const fn=new Date(a.fechaNac);
    const bDay=fn.getDate(),bMonth=fn.getMonth();
    const thisYearBday=new Date(today.getFullYear(),bMonth,bDay);
    if(thisYearBday<today)thisYearBday.setFullYear(today.getFullYear()+1);
    const diff=Math.floor((thisYearBday-today)/86400000);
    const age=today.getFullYear()-fn.getFullYear()-(thisYearBday.getFullYear()>today.getFullYear()?0:0);
    // Calcular edad correcta
    const turningAge=thisYearBday.getFullYear()-fn.getFullYear();
    if(diff===0)todayBdays.push({...a,age:turningAge});
    else if(diff>0&&diff<=7)weekBdays.push({...a,age:turningAge,days:diff,bday:thisYearBday});
   });
   weekBdays.sort((a,b)=>a.days-b.days);
   if(!todayBdays.length&&!weekBdays.length){
    // No mostrar nada si no hay cumples próximos
   } else {
    html+='<div class="today-sec" style="margin-bottom:12px">';
    html+='<div class="today-hdr"><div class="today-hdr-t">🎂 Cumpleaños</div></div>';
    todayBdays.forEach(a=>{
     html+=`<div style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-bottom:1px solid var(--bdr);background:var(--sunl)">
      <span style="font-size:24px">🎉</span>
      <div><div style="font-size:14px;font-weight:800;color:var(--txt)">${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))} cumple ${a.age} años HOY</div>
      ${a.telefono?`<a href="https://wa.me/34${a.telefono.replace(/\s/g,'')}?text=${encodeURIComponent('🎂 ¡Feliz cumpleaños '+a.nombre+'! Desde La Mar de Salaos te deseamos un día muy especial 🎉')}" target="_blank" style="font-size:12px;font-weight:700;color:var(--tdd);text-decoration:none">📲 Enviar felicitación</a>`:''}</div>
     </div>`;
    });
    weekBdays.forEach(a=>{
     const dayLabel=a.days===1?'mañana':'en '+a.days+' días';
     html+=`<div style="display:flex;align-items:center;gap:10px;padding:9px 13px;border-bottom:1px solid var(--bdr)">
      <span style="font-size:18px">🎈</span>
      <div style="font-size:13px;font-weight:700;color:var(--txt)">${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))} · ${a.age} años <span style="color:var(--txmu);font-weight:600">${dayLabel}</span></div>
     </div>`;
    });
    html+='</div>';
   }
  }

  // ── ALERTAS DEL SISTEMA ──
  else if(sec.id==='alertas'){
   const altPend=gAlt().filter(a=>a.estado==='pendiente'&&new Date(a.fecha+'T'+(a.hora||'00:00'))<=new Date(Date.now()+86400000));
   if(altPend.length){
    html+='<div class="alert-strip" style="margin-bottom:12px"><div class="alert-strip-hdr info">🔔 Alertas para hoy ('+altPend.length+')</div>';
    altPend.slice(0,3).forEach(a=>{
     html+=`<div class="alert-item"><div class="alert-item-icon" style="background:var(--tl)">🔔</div><div class="alert-item-text"><div class="alert-item-title">${esc(a.titulo)}</div><div class="alert-item-sub">${esc(a.fecha)+' '+(a.hora||'')}</div></div><div class="alert-item-action"><button class="btn bt2 btn-xs" onclick="actAl('${a.id}','aceptada')">✓</button></div></div>`;
    });
    html+='</div>';
   }
  }

  // ── AGENDA DE HOY ──
  else if(sec.id==='hoy'){
   const todayStr=new Date().toISOString().slice(0,10);
   const alms=gAl();
   const evs=getEvsForMonth(cCY,cCM).filter(e=>e.fecha===todayStr).sort((a,b)=>(a.horaInicio||'').localeCompare(b.horaInicio||''));
   let th='<div class="today-sec"><div class="today-hdr"><div class="today-hdr-t">📅 Hoy — '+(evs.length?evs.length+' actividad'+(evs.length>1?'es':''):'Sin actividades programadas')+'</div>'+(evs.length?'':`<button class="btn bg btn-xs" onclick="go('agenda')">Ver agenda</button>`)+'</div>';
   evs.forEach(e=>{
    const alE=(e.alumnosIds||[]).map(id=>alms.find(a=>a.id===id)).filter(Boolean);
    th+=`<div class="today-event"><div class="ev-time">${e.horaInicio||'—'}</div><div class="ev-info"><div class="ev-title">${esc(e.titulo)}</div>${alE.length?`<div class="ev-students">${alE.slice(0,3).map(a=>esc(a.nombre)).join(', ')}${alE.length>3?' +'+(alE.length-3)+' más':''}</div>`:''}</div></div>`;
   });
   th+='</div>';
   html+=th;
  }

  // ── PAGOS PENDIENTES POR MES ──
  else if(sec.id==='pendientes'){
   const byMonth=getUnpaidByMonth();
   if(!byMonth.length){
    html+='<div style="text-align:center;padding:16px;background:var(--okl);border-radius:var(--r);color:var(--ok);font-weight:700;font-size:13.5px;margin-bottom:12px">✅ ¡Todo al día!</div>';
   } else {
    html+='<div style="font-size:12px;font-weight:800;color:var(--txmu);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">⏳ Pendientes de cobro</div>';
    byMonth.forEach(grp=>{
     const isPast=(grp.año*12+grp.mes)<(cY*12+cM);
     const dotColor=isPast?'var(--rd)':'var(--co)';
     html+=`<div class="pend-month-hdr" id="pmh-${grp.key}" onclick="togPendMonth('${grp.key}')">
      <div style="display:flex;align-items:center;gap:8px">
       <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};flex-shrink:0;display:inline-block"></span>
       <span style="font-size:13.5px;font-weight:800">${esc(grp.label)}</span>
       ${isPast?'<span style="font-size:11px;font-weight:800;background:var(--rdl);color:var(--rd);padding:1px 6px;border-radius:8px">vencido</span>':''}
      </div>
      <div style="display:flex;align-items:center;gap:10px">
       <span style="font-size:12px;font-weight:700;color:var(--txm)">${grp.items.length} pago${grp.items.length!==1?'s':''}</span>
       <span style="font-size:13px;font-weight:900;color:${dotColor}">${fmt(grp.total)}</span>
       <span style="font-size:11px;color:var(--txmu)">▶</span>
      </div>
     </div>
     <div class="pend-month-body" id="pmb-${grp.key}">`;
     grp.items.forEach(a=>{
      const wa=buildWABtn(a.alumnoId,a.hermanoIngIds||[],a.alumno,a.actividad,grp.label,a.pendiente);
      const icono=a.esHermanos?'👨‍👧 ':'';
      const e2=gE().find(x=>x.id===a.id);
      const regBtn=e2?`<button class="btn bg btn-xs" onclick="goToIngReg(${e2.año},${e2.mes})" title="Ver en Registro">📋</button>`:'';
      html+=`<div class="alert-item"><div class="alert-item-icon" style="background:${isPast?'var(--rdl)':'var(--col)'}">${isPast?'⭕':'⏳'}</div><div class="alert-item-text"><div class="alert-item-title">${icono}${esc(a.alumno)} · <span style="color:${isPast?'var(--rd)':'var(--co)'}">${fmt(a.pendiente)} pendiente</span></div><div class="alert-item-sub">${esc(a.actividad)}</div></div><div class="alert-item-action" style="display:flex;gap:4px;flex-shrink:0">${wa}${regBtn}<button class="btn bok2 btn-xs" onclick="marcarPagado('${a.id}')">✓ Pagado</button></div></div>`;
     });
     html+='</div>';
    });
   }
  }

  // ── NOTAS PRIORITARIAS ──
  else if(sec.id==='notas_top'){
   const top=gNt().filter(n=>n.prioridad==='alta').slice(0,3);
   if(top.length){
    html+='<div class="today-sec" style="margin-bottom:12px"><div class="today-hdr"><div class="today-hdr-t">📝 Notas prioritarias</div><button class="btn bg btn-xs" onclick="go(\'asistente\')">Ver todas</button></div>';
    top.forEach(n=>{ html+=`<div style="padding:9px 13px;border-bottom:1px solid var(--bdr);font-size:13px;font-weight:700;color:var(--txt)">🔴 ${esc(n.texto||n.titulo||'Nota')}</div>`; });
    html+='</div>';
   }
  }

  // ── SALUD DEL NEGOCIO ──
  else if(sec.id==='salud'){
   const s=salud(cY);
   if(s)html+=`<div class="salud ${s.c}" style="margin-bottom:12px"><div class="salud-ic">${s.e}</div><div class="salud-t">${s.t}</div><div class="salud-d">${s.d}</div></div>`;
  }
 });

 el('inicio-content').innerHTML=html;
}

function togPendMonth(key){
 const hdr=el('pmh-'+key),body=el('pmb-'+key);if(!hdr||!body)return;
 const isOpen=body.classList.contains('show');
 body.classList.toggle('show',!isOpen);hdr.classList.toggle('open',!isOpen);
}
function goToIngReg(año,mes){cY=año;cM=mes;go('registro');setRegTab('ing');}

// ── PERSONALIZADOR DE INICIO ──
function openInicioCustomizer(){
 const cfg=gCfg();
 const secs=cfg.inicio_secs||INIT_SECS_DEF.map(s=>({...s}));
 const stats=cfg.inicio_stats||INIT_STATS_DEF.map(s=>({...s}));
 const mo=document.createElement('div');
 mo.style.cssText='position:fixed;inset:0;background:rgba(60,58,94,.5);z-index:300;display:flex;align-items:flex-end;justify-content:center';
 mo.innerHTML=`<div style="background:var(--wh);border-radius:var(--r) var(--r) 0 0;width:100%;max-width:520px;max-height:88vh;display:flex;flex-direction:column">
  <div style="padding:14px 17px;background:var(--tll);border-bottom:1.5px solid var(--bdr);display:flex;align-items:center;justify-content:space-between">
   <div style="font-size:15px;font-weight:800">⚙️ Personalizar Inicio</div>
   <button style="background:none;border:none;color:var(--txmu);font-size:22px;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%" onclick="this.closest('[style*=fixed]').remove()">×</button>
  </div>
  <div style="overflow-y:auto;flex:1;padding:14px 16px">
   <div style="font-size:11px;font-weight:800;color:var(--txmu);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Secciones visibles y orden</div>
   <div id="cust-secs">
    ${secs.map((s,i)=>`<div class="cust-row" id="cs-${s.id}">
     <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1"><input type="checkbox" class="cust-sec-chk" data-id="${s.id}" ${s.enabled?'checked':''} style="accent-color:var(--t);width:16px;height:16px"> <span class="cust-row-lbl">${s.label}</span></label>
     <div class="cust-arrows">
      ${i>0?`<button class="cust-arr" onclick="moveSec('${s.id}',-1)">▲</button>`:'<span></span>'}
      ${i<secs.length-1?`<button class="cust-arr" onclick="moveSec('${s.id}',1)">▼</button>`:'<span></span>'}
     </div>
    </div>`).join('')}
   </div>
   <div style="font-size:11px;font-weight:800;color:var(--txmu);text-transform:uppercase;letter-spacing:.5px;margin-top:16px;margin-bottom:8px">Tarjetas del resumen</div>
   <div style="display:flex;flex-wrap:wrap;gap:7px">
    ${stats.map(s=>`<label style="display:flex;align-items:center;gap:5px;padding:6px 10px;background:${s.enabled?'var(--tl)':'var(--cr)'};border:1.5px solid ${s.enabled?'var(--t)':'var(--bdr)'};border-radius:var(--rs);cursor:pointer;font-size:12.5px;font-weight:700"><input type="checkbox" class="cust-stat-chk" data-id="${s.id}" ${s.enabled?'checked':''} style="accent-color:var(--t);width:14px;height:14px"> ${s.label}</label>`).join('')}
   </div>
  </div>
  <div style="padding:12px 17px;border-top:1.5px solid var(--bdr);display:flex;gap:8px;justify-content:flex-end;background:var(--tll)">
   <button class="btn bg btn-sm" onclick="this.closest('[style*=fixed]').remove()">Cancelar</button>
   <button class="btn bt2 btn-sm" onclick="saveInicioConfig(this)">💾 Guardar</button>
  </div>
 </div>`;
 document.body.appendChild(mo);
}
let _custSecsOrder=null;
function moveSec(id,dir){
 const cfg=gCfg();
 const secs=cfg.inicio_secs||INIT_SECS_DEF.map(s=>({...s}));
 const i=secs.findIndex(s=>s.id===id);if(i<0)return;
 const j=i+dir;if(j<0||j>=secs.length)return;
 [secs[i],secs[j]]=[secs[j],secs[i]];
 cfg.inicio_secs=secs;sCfg(cfg);
 // Re-render just the secs list in the open modal
 const cont=el('cust-secs');if(!cont)return;
 cont.innerHTML=secs.map((s,idx)=>`<div class="cust-row" id="cs-${s.id}">
  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1"><input type="checkbox" class="cust-sec-chk" data-id="${s.id}" ${s.enabled?'checked':''} style="accent-color:var(--t);width:16px;height:16px"> <span class="cust-row-lbl">${s.label}</span></label>
  <div class="cust-arrows">
   ${idx>0?`<button class="cust-arr" onclick="moveSec('${s.id}',-1)">▲</button>`:'<span></span>'}
   ${idx<secs.length-1?`<button class="cust-arr" onclick="moveSec('${s.id}',1)">▼</button>`:'<span></span>'}
  </div>
 </div>`).join('');
}
function saveInicioConfig(btn){
 const mo=btn.closest('[style*=fixed]');
 const cfg=gCfg();
 // Sections
 const secs=cfg.inicio_secs||INIT_SECS_DEF.map(s=>({...s}));
 mo.querySelectorAll('.cust-sec-chk').forEach(chk=>{
  const s=secs.find(x=>x.id===chk.dataset.id);if(s)s.enabled=chk.checked;
 });
 cfg.inicio_secs=secs;
 // Stats
 const stats=cfg.inicio_stats||INIT_STATS_DEF.map(s=>({...s}));
 mo.querySelectorAll('.cust-stat-chk').forEach(chk=>{
  const s=stats.find(x=>x.id===chk.dataset.id);if(s)s.enabled=chk.checked;
 });
 cfg.inicio_stats=stats;
 sCfg(cfg);mo.remove();markDirty();rInicio();toast('✅ Inicio personalizado guardado');
}

function fmtK(n,sign=false){const abs=Math.abs(n);const s=sign&&n>=0?'+':'';if(abs>=1000)return s+(abs/1000).toFixed(1).replace('.',',')+' k€';return s+(Math.round(n*100)/100).toLocaleString('es-ES',{minimumFractionDigits:0,maximumFractionDigits:0})+'€';}

// ═══════════════════ RENDER: REGISTRO ══════════════════════════
function rIng(){
 let list=extM(cY,cM),alms=gAl();
 st('ibadge',list.length);
 const _sN=el('ing-ninos-mes');if(_sN)_sN.textContent=CALC.mes(cY,cM).ninos;
 const tb=el('ibody'),em=el('iempty'),tot=el('itotal');
 if(!list.length){tb.innerHTML='';em.style.display='block';tot.style.display='none';
  ['alumno','actividad','cuota','anticipo','pendiente'].forEach(c=>{const e=el('isrt-'+c);if(e)e.textContent='';});return;}
 em.style.display='none';
 // Ordenar según columna activa
 if(iSortCol){
  const getV=(e,col)=>{
   if(col==='alumno'){const a=alms.find(x=>x.id===e.alumnoId);return(a?a.nombre:e.nombre||'').toLowerCase();}
   if(col==='actividad')return(e.actividad||'').toLowerCase();
   if(col==='cuota')return+e.cuota||0;
   if(col==='anticipo')return CALC.cobrado(e);
   if(col==='pendiente')return CALC.pendiente(e);
   return 0;
  };
  list=[...list].sort((a,b)=>{const va=getV(a,iSortCol),vb=getV(b,iSortCol);return(va<vb?-1:va>vb?1:0)*iSortDir;});
 }
 // Actualizar indicadores visuales
 ['alumno','actividad','cuota','anticipo','pendiente'].forEach(c=>{
  const e=el('isrt-'+c);if(!e)return;
  e.textContent=iSortCol===c?(iSortDir===1?'▲':'▼'):'⇅';
  e.style.color=iSortCol===c?'var(--tdd)':'var(--txmu)';
 });
 // Agrupar hermanos: marcar cuáles ya han sido procesados como pareja
 const shownIds=new Set();
 const rows=[];
 list.forEach(e=>{
  if(shownIds.has(e.id))return;
  if(normHIngIds(e).length>0){
   // Es una fila conjunta de hermanos
   shownIds.add(e.id);
   const al=e.alumnoId?alms.find(a=>a.id===e.alumnoId):null;
   const nom=esc(alumnoNombreCombinado(e,alms));
   const pend=CALC.pendiente(e);
   const anticipo=CALC.cobrado(e);
   rows.push(`<tr style="background:var(--lvl)"><td style="font-weight:800">👨‍👧 ${nom}</td><td style="font-size:13px;color:var(--txm)">${esc(e.actividad||'—')}</td><td style="font-weight:900;color:var(--tdd)">${fmt(e.cuota)}</td><td style="font-size:12px;color:var(--txm)">${anticipo>0?fmt(anticipo):'—'}</td><td style="font-weight:800;color:${pend>0?'var(--co)':'var(--ok)'}">${pend>0?fmt(pend):'✅'}</td><td><button class="tpay ${e.pagado?'p':'u'}" onclick="togP('${e.id}')">${e.pagado?'✅ Pagado':'⏳ Pendiente'}</button></td><td style="white-space:nowrap">${e.obs?`<span title="${esc(e.obs)}" style="cursor:help;margin-right:4px;font-size:14px">💬</span>`:''}<button class="edit-btn" onclick="editIngEntry('${e.id}')" title="Editar">✎</button><button class="btn bdr2 btn-xs" style="margin-left:4px" onclick="delIng('${e.id}')">✕</button></td></tr>`);
  } else {
   shownIds.add(e.id);
   const al=e.alumnoId?alms.find(a=>a.id===e.alumnoId):null;
   const nom=al?(esc(al.nombre+(al.apellidos?' '+al.apellidos:''))):esc(e.nombre||'—');
   const pend=CALC.pendiente(e);
   const anticipo=CALC.cobrado(e);
   rows.push(`<tr><td style="font-weight:800">${nom}</td><td style="font-size:13px;color:var(--txm)">${esc(e.actividad||'—')}</td><td style="font-weight:900;color:var(--tdd)">${fmt(e.cuota)}</td><td style="font-size:12px;color:var(--txm)">${anticipo>0?fmt(anticipo):'—'}</td><td style="font-weight:800;color:${pend>0?'var(--co)':'var(--ok)'}">${pend>0?fmt(pend):'✅'}</td><td><button class="tpay ${e.pagado?'p':'u'}" onclick="togP('${e.id}')">${e.pagado?'✅ Pagado':'⏳ Pendiente'}</button></td><td style="white-space:nowrap">${e.obs?`<span title="${esc(e.obs)}" style="cursor:help;margin-right:4px;font-size:14px">💬</span>`:''}<button class="edit-btn" onclick="editIngEntry('${e.id}')" title="Editar">✎</button><button class="btn bdr2 btn-xs" style="margin-left:4px" onclick="delIng('${e.id}')">✕</button></td></tr>`);
  }
 });
 tb.innerHTML=rows.join('');
 // ── Sumatorios: SIEMPRE desde el motor único (CALC). Cobrado+Pendiente=Total ──
 const S=CALC.mes(cY,cM);
 tot.style.display='block';
 tot.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><span style="font-size:12px;color:var(--txmu);font-weight:600">${S.lineas} entrada${S.lineas!==1?'s':''} · 👧 ${S.ninos} niño${S.ninos!==1?'s':''}${S.inscripciones!==S.ninos?` · ${S.inscripciones} inscr.`:''}</span><div style="display:flex;gap:12px;font-size:13px;font-weight:800"><span style="color:var(--ok)">✅ ${fmt(S.cobrado)}</span>${S.pendiente>0?`<span style="color:var(--co)">⏳ ${fmt(S.pendiente)}</span>`:''}<span>Total: ${fmt(S.total)}</span></div></div>`;
}
function rGast(){
 const list=gastM(cY,cM);
 st('gbadge',list.length);
 const co=el('glist'),em=el('gempty'),tot=el('gtotal');
 if(!list.length){co.innerHTML='';em.style.display='block';tot.style.display='none';return;}
 em.style.display='none';
 co.innerHTML=list.map(g=>`<div class="li"><div style="flex:1;min-width:0"><div style="font-weight:800;font-size:14px">${esc(g.concepto)}</div>${g.desc?`<div style="font-size:12px;color:var(--txmu);font-weight:600;margin-top:1px">${esc(g.desc)}</div>`:''}</div><div style="display:flex;align-items:center;gap:8px;flex-shrink:0"><span style="font-weight:900;font-size:14px">${fmt(g.importe)}</span><button class="edit-btn" onclick="editGastEntry('${g.id}')" title="Editar">✎</button><button class="btn bdr2 btn-xs" onclick="delG('${g.id}')">✕</button></div></div>`).join('');
 const tv=list.reduce((s,g)=>s+(+g.importe||0),0);
 tot.style.display='block';
 tot.innerHTML=`<div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--txmu);font-weight:600">${list.length} concepto${list.length!==1?'s':''}</span><span style="font-size:15px;font-weight:900">Total: ${fmt(tv)}</span></div>`;
}
function rRes(){
 const y=cYr,d=annData(y),sl=salud(y);
 st('yrplbl',y);
 const tI=d.reduce((s,r)=>s+r.i,0),tG=d.reduce((s,r)=>s+r.g,0),tB=tI-tG,nM=d.length;
 const mg=tI>0?Math.round(tB/tI*100):null;
 const aN=d.filter(r=>r.nmn).length?d.filter(r=>r.nmn).reduce((s,r)=>s+r.nmn,0)/d.filter(r=>r.nmn).length:null;
 const sw=el('salud-wrap');
 if(sl)sw.innerHTML=`<div class="salud ${sl.c}"><div class="si">${sl.e}</div><div><div class="st">${sl.t}</div><div class="sd">${sl.d}</div></div></div>`;
 else sw.innerHTML='<div class="salud"><div class="si">📭</div><div><div class="st">Sin datos</div></div></div>';
 const bc=tB>0?'gr':tB<0?'rd':'nt';
 el('res-top').innerHTML=`<div class="card hl"><div class="lbl">Ingresos ${y}</div><div class="val wh">${fmt(tI)}</div><div class="sub">${nM} meses</div></div><div class="card"><div class="lbl">Gastos ${y}</div><div class="val nt">${fmt(tG)}</div><div class="sub">&nbsp;</div></div>`;
 el('res-mid').innerHTML=`<div class="card"><div class="lbl">Beneficio</div><div class="val ${bc}">${(tB>=0?'+':'')+fmt(tB)}</div><div class="sub">${mg!==null?'Margen '+mg+'%':'—'}</div></div><div class="card"><div class="lbl">Prom. ing./mes</div><div class="val nt">${nM?fmt(tI/nM):'—'}</div><div class="sub">${nM} meses</div></div><div class="card"><div class="lbl">NMN medio</div><div class="val lv">${aN?fN(aN,1):'—'}</div><div class="sub">break-even</div></div>`;
 const rn=Rs.res||6;
 el('res-pills').innerHTML=[6,12,24].map(n=>`<button class="rp${rn===n?' active':''}" onclick="setR('res',${n})">${n}m</button>`).join('')+`<button class="rp${rn===0?' active':''}" onclick="setR('res',0)">Todo</button>`;
 el('res-nbadge').textContent=nM;
 el('res-tbody').innerHTML=d.map(r=>{const bc2=r.ben>0?'tp':r.ben<0?'tn':'';return `<tr><td style="font-weight:700">${r.mes}</td><td>${r.n}</td><td>${fmt(r.i)}</td><td>${fmt(r.g)}</td><td class="${bc2}">${(r.ben>=0?'+':'')+fmt(r.ben)}</td><td>${r.mg!==null?r.mg+'%':'—'}</td><td>${r.nmn?fN(r.nmn,1):'—'}</td></tr>`;}).join('');
 setTimeout(()=>{
  const pts=getTSRes(y,rn||6);
  mkC('chart-res','bar',{labels:pts.map(p=>p.l),datasets:[{label:'Ingresos',data:pts.map(p=>ingM(p.y,p.m)),backgroundColor:'rgba(126,206,196,.85)',borderRadius:5,borderSkipped:false},{label:'Gastos',data:pts.map(p=>gastT(p.y,p.m)),backgroundColor:'rgba(244,151,106,.75)',borderRadius:5,borderSkipped:false}]});
  const bd=pts.map(p=>benM(p.y,p.m));
  mkC('chart-ben','bar',{labels:pts.map(p=>p.l),datasets:[{label:'Beneficio',data:bd,backgroundColor:bd.map(v=>v>=0?'rgba(107,197,131,.8)':'rgba(232,112,112,.7)'),borderRadius:5,borderSkipped:false}]},{plugins:{legend:{display:false}}});
 },50);
}
function getTSRes(y,n){if(n===0){const m=new Set([...gE().map(e=>e.año+'-'+e.mes),...gG().map(g=>g.año+'-'+g.mes)]);return[...m].sort().map(s=>{const[yr,mo]=s.split('-').map(Number);return{y:yr,m:mo,l:MSH[mo-1]+"'"+String(yr).slice(2)};});}const pts=[];for(let i=n-1;i>=0;i--){let m=cM-i,yr=cY;while(m<1){m+=12;yr--;}pts.push({y:yr,m,l:MSH[m-1]+"'"+String(yr).slice(2)});}return pts;}

// ═══════════════════ RENDER: ALUMNOS ═══════════════════════════
function renderAlumnos(){
 const all=gAl(),q=(el('alum-q')?.value||'').toLowerCase();
 const list=q?all.filter(a=>(a.nombre+' '+(a.apellidos||'')+' '+(a.actividadFavorita||'')).toLowerCase().includes(q)):all;
 st('abadge',all.length);
 const cont=el('alum-list'),em=el('aempty');
 if(!list.length){cont.innerHTML='';em.style.display='block';return;}
 em.style.display='none';
 cont.innerHTML=list.map(a=>{
  const ag=edad(a.fechaNac),st2=alSt(a.id);
  const ini=(a.nombre||'?').charAt(0).toUpperCase()+(a.apellidos||'').charAt(0).toUpperCase();
  const unpaid=extM(cY,cM).filter(e=>e.alumnoId===a.id&&CALC.pendiente(e)>0);
  const tel=a.telefono?a.telefono.replace(/\s/g,''):'';
  const waLink=tel?`href="https://wa.me/34${tel}" target="_blank"`:'onclick="toast(\'Sin teléfono registrado\')"';
  return `<div class="alum-row" onclick="showAlDet('${a.id}')">
   <div class="av">${esc(ini)}</div>
   <div class="alum-info">
    <div class="alum-name">${esc(a.nombre)}${a.apellidos?' '+esc(a.apellidos):''} ${normHIds(a).length>0?`<span class="badge blv" style="font-size:10px" title="${normHIds(a).length} hermano${normHIds(a).length!==1?'s':''} en La Mar">👨‍👧 Herm.${normHIds(a).length>1?' ('+normHIds(a).length+')':''}</span>`:''} ${unpaid.length?`<span class="badge brd" style="font-size:10px">${unpaid.length} pend.</span>`:''}</div>
    <div class="alum-detail">${ag!==null?ag+' años · ':''}${esc(a.actividadFavorita||'—')} · ${st2.last||'Sin actividad'}</div>
   </div>
   <div class="alum-actions">
    ${unpaid.length?`<button class="tpay u" onclick="event.stopPropagation();togP('${unpaid[0].id}')">✓ Cobrar</button>`:''}
    <a class="btn bg btn-xs" style="text-decoration:none;display:flex;align-items:center" ${waLink} onclick="event.stopPropagation()">📲</a>
    <button class="edit-btn" onclick="event.stopPropagation();editAl('${a.id}')" title="Editar">✎</button>
   </div>
  </div>`;
 }).join('');
}

// COBRO RÁPIDO
function openCR(){crOpen=true;el('cobro-rapido-sec').style.display='block';st('cr-mes-lbl',MES[cM-1]+' '+cY);rCR();}
function closeCR(){crOpen=false;el('cobro-rapido-sec').style.display='none';}
function rCR(){
 const alms=gAl(),mes=extM(cY,cM);
 const rows=alms.map(a=>{const e=mes.find(x=>x.alumnoId===a.id);return{a,e};}).filter(x=>x.e);
 const noEntry=alms.filter(a=>!mes.find(e=>e.alumnoId===a.id));
 let h=rows.map(({a,e})=>`<div class="alum-row"><div class="av" style="width:32px;height:32px;font-size:12px">${(a.nombre||'?').charAt(0).toUpperCase()}</div><div class="alum-info"><div class="alum-name" style="font-size:13.5px">${esc(a.nombre)} <span style="color:var(--txmu);font-weight:600;font-size:12px">${fmt(e.cuota)}</span></div><div class="alum-detail">${esc(e.actividad)}</div></div><button class="tpay ${e.pagado?'p':'u'}" onclick="togPQuick('${e.id}')" style="flex-shrink:0">${e.pagado?'✅ Cobrado':'⏳ Cobrar'}</button></div>`).join('');
 if(noEntry.length)h+=`<div style="padding:10px 13px;background:var(--sunl);font-size:12px;font-weight:700;color:var(--txm)">⚠️ Sin registro este mes: ${noEntry.map(a=>esc(a.nombre)).join(', ')}</div>`;
 el('cobro-rapido-list').innerHTML=h||'<div class="empty" style="padding:20px"><div class="empty-d">Sin alumnos registrados este mes</div></div>';
}
function togPQuick(id){togP(id);if(crOpen)rCR();}

// ═══════════════════ RENDER: CALENDARIO ════════════════════════
function getEvsForMonth(y,m){
 const evs=gEv(),res=[],pad=n=>String(n).padStart(2,'0');
 evs.forEach(ev=>{
  const ed=new Date(ev.fecha+'T00:00:00');
  // Multi-day: generate one entry per day between fecha and fechaFin
  if(ev.fechaFin && ev.fechaFin>ev.fecha){
   let cur=new Date(ev.fecha+'T00:00:00');
   const endD=new Date(ev.fechaFin+'T00:00:00');
   while(cur<=endD){
    const cy=cur.getFullYear(),cm=cur.getMonth()+1,cd=cur.getDate();
    const ds=`${cy}-${pad(cm)}-${pad(cd)}`;
    if(cy===y&&cm===m){
     // Check if there's a day-specific override for this event+day
     const dayKey=ev.id+'_'+ds;
     const dayOverride=ev.dayOverrides&&ev.dayOverrides[ds];
     const alumnosIds=dayOverride!==undefined?dayOverride:(ev.alumnosIds||[]);
     res.push({...ev,fecha:ds,alumnosIds,_multiday:true,_dayKey:dayKey,_origId:ev.id});
    }
    cur.setDate(cur.getDate()+1);
   }
  } else {
   if(ed.getFullYear()===y&&ed.getMonth()+1===m)res.push({...ev,_v:false});
  }
  if(ev.recurrencia?.tipo){
   let cur=new Date(ev.fecha+'T00:00:00');const end=ev.recurrencia.fechaFin?new Date(ev.recurrencia.fechaFin+'T00:00:00'):new Date(y+2,0,1);const si=ev.recurrencia.intervalo||1;
   if(ev.recurrencia.tipo==='diario')cur.setDate(cur.getDate()+si);else if(ev.recurrencia.tipo==='semanal')cur.setDate(cur.getDate()+7*si);else cur.setMonth(cur.getMonth()+si);
   while(cur<=end){const cy=cur.getFullYear(),cm=cur.getMonth()+1;if(cy===y&&cm===m)res.push({...ev,fecha:`${cy}-${pad(cm)}-${pad(cur.getDate())}`,_v:true});if(cy>y||(cy===y&&cm>m))break;
    if(ev.recurrencia.tipo==='diario')cur.setDate(cur.getDate()+si);else if(ev.recurrencia.tipo==='semanal')cur.setDate(cur.getDate()+7*si);else cur.setMonth(cur.getMonth()+si);}
  }});return res;
}
function renderCal(){
 const y=cCY,m=cCM,pad=n=>String(n).padStart(2,'0');
 st('cal-lbl',MES[m-1]+' '+y);
 const dim=new Date(y,m,0).getDate(),fd=new Date(y,m-1,1).getDay();
 const evs=getEvsForMonth(y,m),today=new Date().toISOString().slice(0,10);
 const maxNinos=gCfg().max_ninos_dia||20;
 let h='';
 DIAS.forEach(d=>{h+=`<div class="cdh">${d}</div>`;});
 for(let i=0;i<fd;i++)h+='<div class="cc2 empty"></div>';
 for(let d=1;d<=dim;d++){
  const ds=`${y}-${pad(m)}-${pad(d)}`;
  const de=evs.filter(e=>e.fecha===ds),isT=ds===today;
  // Calcular total niños ese día
  const totalNinos=de.reduce((s,e)=>{const ids=e.alumnosIds||[];return s+ids.length;},0);
  let dayBg='',dayBorder='';
  if(totalNinos>0&&maxNinos>0){
   const ratio=totalNinos/maxNinos;
   if(ratio>=0.85){dayBg='background:rgba(232,112,112,.13);';dayBorder='border-color:#E87070;';}
   else if(ratio>=0.5){dayBg='background:rgba(249,212,113,.15);';dayBorder='border-color:#F9D471;';}
   else{dayBg='background:rgba(107,197,131,.12);';dayBorder='border-color:#6BC583;';}
  }
  h+=`<div class="cc2${isT?' today':''}" style="${dayBg}${dayBorder}" onclick="showCalDay('${ds}')"><div class="cdn">${d}</div>`;
  de.slice(0,2).forEach(e=>{const col=e.color||'#7ECEC4';h+=`<div class="ev-chip" style="background:${col}22;color:${col}">${esc((e.titulo||'').slice(0,12))}</div>`;});
  if(de.length>2)h+=`<div style="font-size:9px;font-weight:700;color:var(--txmu);text-align:center">+${de.length-2}</div>`;
  if(totalNinos>0)h+=`<div style="font-size:9px;font-weight:800;color:${totalNinos/maxNinos>=0.85?'#E87070':totalNinos/maxNinos>=0.5?'#B7950B':'#239B56'};text-align:right;padding-right:2px">👥${totalNinos}</div>`;
  h+='</div>';
 }
 el('cal-grid').innerHTML=h;el('cal-month').style.display='';el('cal-day').style.display='none';
}
function showCalDay(ds){
 const alms=gAl();const[y,m,d]=ds.split('-').map(Number);
 const evs=getEvsForMonth(y,m).filter(e=>e.fecha===ds);
 const dn=new Date(ds+'T12:00:00').toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const cap=dn.charAt(0).toUpperCase()+dn.slice(1);
 const totalNinos=evs.reduce((s,e)=>{return s+(e.alumnosIds||[]).length;},0);
 const maxNinos=gCfg().max_ninos_dia||20;
 const ratio=totalNinos/maxNinos;
 const cargaCol=ratio>=0.85?'var(--rd)':ratio>=0.5?'#B7950B':'var(--ok)';
 const cargaLbl=ratio>=0.85?'🔴 Día ocupado':'🟢 Día tranquilo';
 let h=`<button class="day-back" onclick="el('cal-month').style.display='';el('cal-day').style.display='none'">← Volver al mes</button>`;
 h+=`<div class="day-ttl">${cap}</div>`;
 if(totalNinos>0){
  h+=`<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--wh);border-radius:var(--rs);border:1.5px solid var(--bdr);margin-bottom:10px">
   <span style="font-size:22px;font-weight:900;color:${cargaCol}">${totalNinos}</span>
   <div><div style="font-size:12px;font-weight:800;color:var(--txt)">niños hoy</div><div style="font-size:11px;font-weight:700;color:${cargaCol}">${cargaLbl} (máx ${maxNinos})</div></div>
  </div>`;
 }
 if(!evs.length){
  h+=`<div class="empty"><div class="empty-i">📅</div><div class="empty-t">Sin actividades</div><div class="empty-d">Pulsa "＋" para añadir</div></div>`;
 } else {
  evs.sort((a,b)=>(a.horaInicio||'').localeCompare(b.horaInicio||'')).forEach(e=>{
   const alE=(e.alumnosIds||[]).map(id=>alms.find(a=>a.id===id)).filter(Boolean);
   const col=e.color||'#7ECEC4';
   const isMultiday=e._multiday||false;
   const origId=e._origId||e.id;
   // Agrupar por edad
   const byAge={};
   alE.forEach(a=>{
    const ag=a.fechaNac?edad(a.fechaNac):null;
    const key=ag!==null?ag+'':'-';
    if(!byAge[key])byAge[key]=[];byAge[key].push(a);
   });
   const ageGroups=Object.keys(byAge).sort((a,b)=>a==='-'?1:b==='-'?-1:+a-+b);
   const ageHtml=ageGroups.length>0?`<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:5px">${ageGroups.map(k=>`<span style="background:var(--lvl);color:var(--lvdd);border-radius:var(--rp);padding:2px 8px;font-size:11px;font-weight:800">${k=== '-'?'Sin edad':k+' años'}: ${byAge[k].length}</span>`).join('')}</div>`:'';
   h+=`<div class="dev" style="border-left-color:${col}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
     <div class="dev-time">${e.horaInicio||''}${e.horaFin?' – '+e.horaFin:''}</div>
     <div style="display:flex;gap:5px">
      ${isMultiday?`<button class="btn bg btn-xs" onclick="editDayAlumnos('${origId}','${ds}')" title="Editar alumnos de este día">✎ Alumnos hoy</button>`:''}
      <button class="btn bt2 btn-xs" onclick="editEv('${origId}')">✎ Evento</button>
      <button class="btn bdr2 btn-xs" onclick="delEv('${origId}')">✕</button>
     </div>
    </div>
    <div class="dev-title" style="font-size:15px">${esc(e.titulo)}</div>
    ${e.actividad?`<div class="dev-act">📌 ${esc(e.actividad)}</div>`:''}
    ${alE.length?`<div style="margin-top:8px"><div style="font-size:11px;font-weight:800;color:var(--txmu);text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px">👥 ${alE.length} alumno${alE.length!==1?'s':''}</div><div class="dev-alumnos">${alE.map(a=>`<span class="ach">${esc(a.nombre)}</span>`).join('')}</div>${ageHtml}</div>`:'<div style="font-size:12px;color:var(--txmu);margin-top:6px">Sin alumnos asignados</div>'}
    ${e.notas?`<div style="font-size:12px;color:var(--txmu);margin-top:6px;font-style:italic">${esc(e.notas)}</div>`:''}
   </div>`;
  });
 }
 h+=`<div style="margin-top:12px"><button class="btn btl btn-sm" style="background:var(--t);color:#fff;width:100%;justify-content:center" onclick="openEvModal('${ds}')">＋ Añadir actividad este día</button></div>`;
 // Nota del día
 const dnStore=gDN();const dnObj=dnStore[ds]||{text:'',alerta:{active:false,fecha:ds,hora:'09:00'}};
 const actCtx=evs.map(e=>{
  const alE=(e.alumnosIds||[]).map(id=>gAl().find(a=>a.id===id)).filter(Boolean);
  const ages=alE.map(a=>a.fechaNac?edad(a.fechaNac):null).filter(n=>n!==null);
  return{act:(e.titulo||e.actividad||'Actividad'),n:alE.length,ages};
 });
 // Guardar actCtx en global para evitar problemas de escape en onclick HTML
 if(!window._dayActCtx)window._dayActCtx={};
 window._dayActCtx[ds]=actCtx;
 h+=`<div style="margin-top:18px;background:var(--wh);border-radius:var(--r);border:1.5px solid var(--bdr);overflow:hidden">
  <div style="padding:10px 14px;font-size:12px;font-weight:800;color:var(--txmu);background:var(--tll);text-transform:uppercase;letter-spacing:.5px">📝 Nota del día</div>
  <div class="dn-tabs">
   <button class="dn-tab active" id="dnt-btn-nota-${ds}" onclick="setDayNoteTab('nota','${ds}')">📝 Nota</button>
   <button class="dn-tab" id="dnt-btn-ideas-${ds}" onclick="setDayNoteTab('ideas','${ds}')">✨ Ideas IA</button>
  </div>
  <div id="dnt-panel-nota-${ds}" style="padding:12px">
   <textarea id="dnt-text-${ds}" rows="4" placeholder="Ideas, tareas, recordatorios para este día…" style="width:100%;border:1.5px solid var(--bdr);border-radius:var(--rs);padding:8px 10px;font-family:inherit;font-size:13px;resize:vertical;outline:none">${esc(dnObj.text||'')}</textarea>
   <div style="margin-top:8px">
    <label class="cb" style="font-size:13px;font-weight:700"><input type="checkbox" id="dnt-alrt-${ds}" ${dnObj.alerta?.active?'checked':''} onchange="togDNAlert('${ds}')"> 🔔 Crear alerta recordatorio</label>
    <div id="dnt-alrt-opts-${ds}" style="display:${dnObj.alerta?.active?'flex':'none'};gap:8px;margin-top:7px;flex-wrap:wrap">
     <input type="date" id="dnt-alrt-f-${ds}" value="${dnObj.alerta?.fecha||ds}" style="flex:1;min-width:130px;padding:7px 9px;border:1.5px solid var(--bdr);border-radius:var(--rs);font-family:inherit;font-size:13px">
     <input type="time" id="dnt-alrt-h-${ds}" value="${dnObj.alerta?.hora||'09:00'}" style="width:110px;padding:7px 9px;border:1.5px solid var(--bdr);border-radius:var(--rs);font-family:inherit;font-size:13px">
    </div>
   </div>
   <button class="btn bt2 btn-sm" style="margin-top:10px;width:100%;justify-content:center" onclick="saveDayNote('${ds}')">💾 Guardar nota</button>
   ${dnObj.text?`<div style="font-size:11px;font-weight:700;color:var(--txmu);margin-top:6px;text-align:right">Última nota guardada</div>`:''}
  </div>
  <div id="dnt-panel-ideas-${ds}" style="display:none;padding:12px">
   <div style="font-size:12.5px;font-weight:700;color:var(--txm);margin-bottom:10px">La IA tendrá en cuenta las actividades del día, edades y volumen de niños, y evitará repetir lo que ya hayas apuntado en notas anteriores.</div>
   <button class="btn blv btn-sm" style="width:100%;justify-content:center;margin-bottom:10px" onclick="genDayIdeas('${ds}')">✨ Generar ideas para este día</button>
   <div style="display:flex;gap:6px;margin-bottom:10px">
    <button id="ia-day-claude-${ds}" class="btn btn-xs" style="flex:1;justify-content:center;border:1.5px solid var(--t);background:var(--tll);color:var(--tdd);font-weight:800" onclick="setDayIAPref('claude','${ds}')">🤖 Claude</button>
    <button id="ia-day-gpt-${ds}" class="btn btn-xs" style="flex:1;justify-content:center;border:1.5px solid var(--bdr);background:var(--wh);color:var(--txm);font-weight:700" onclick="setDayIAPref('chatgpt','${ds}')">🟢 ChatGPT</button>
   </div>
   <div id="dnt-ideas-res-${ds}"><div style="font-size:12px;color:var(--txmu);text-align:center;padding:10px">Pulsa el botón para obtener ideas personalizadas</div></div>
   <div id="dnt-ideas-sel-${ds}"></div>
   <div id="dnt-ideas-add-${ds}" style="display:none;margin-top:8px"><button class="btn bok2 btn-sm" style="width:100%;justify-content:center" onclick="addIdeasToNote('${ds}')">➕ Añadir seleccionadas a la nota</button></div>
  </div>
 </div>`;
 el('cal-day').innerHTML=h;el('cal-month').style.display='none';el('cal-day').style.display='block';
}

// Editar alumnos de un día concreto de un evento multi-día
// ═══════════════════ NOTA DEL DÍA ══════════════════════════════
function setDayNoteTab(tab,ds){
 ['nota','ideas'].forEach(t=>{
  const btn=el(`dnt-btn-${t}-${ds}`),panel=el(`dnt-panel-${t}-${ds}`);
  if(btn)btn.classList.toggle('active',t===tab);
  if(panel)panel.style.display=t===tab?'block':'none';
 });
}
function togDNAlert(ds){
 const chk=el(`dnt-alrt-${ds}`),opts=el(`dnt-alrt-opts-${ds}`);
 if(opts)opts.style.display=chk?.checked?'flex':'none';
}
function saveDayNote(ds){
 const text=(el(`dnt-text-${ds}`)?.value||'').trim();
 const alertActive=el(`dnt-alrt-${ds}`)?.checked||false;
 const alertFecha=el(`dnt-alrt-f-${ds}`)?.value||ds;
 const alertHora=el(`dnt-alrt-h-${ds}`)?.value||'09:00';
 const dnStore=gDN();
 dnStore[ds]={text,alerta:{active:alertActive,fecha:alertFecha,hora:alertHora},ts:new Date().toISOString()};
 sDN(dnStore);
 if(alertActive&&text){
  const alts=gAlt().filter(a=>a._dayNote!==ds);
  alts.push({id:gid(),titulo:'📝 Nota del día '+ds,desc:text.slice(0,80),cat:'act',fecha:alertFecha,hora:alertHora,estado:'pendiente',_dayNote:ds});
  sAlt(alts);updateAlertBadge();
 }
 markDirty();toast('📝 Nota guardada');
}
let _dayIdeasSel={};
let _dayIAPref={};
async function genDayIdeas(ds){
 const resEl=el(`dnt-ideas-res-${ds}`);if(!resEl)return;
 resEl.innerHTML='<div style="text-align:center;padding:14px;font-size:13px;color:var(--txm);font-weight:700">✨ Generando ideas…</div>';
 _dayIdeasSel[ds]=new Set();
 const actCtx=(window._dayActCtx&&window._dayActCtx[ds])||[];
 const allNotes=gDN();
 const prevNotes=Object.entries(allNotes).filter(([d,n])=>d!==ds&&n.text).map(([d,n])=>d+': '+n.text.slice(0,100)).slice(-5).join(' | ')||'ninguna';
 const actDesc=actCtx.map(a=>{const avg=a.ages?.length?Math.round(a.ages.reduce((s,x)=>s+x,0)/a.ages.length):null;return`${a.act} (${a.n} niños${avg?', media '+avg+' años':''})`;}).join('; ')||'Sin actividades programadas';
 const prompt=`Eres asistente de una escuela infantil "La Mar de Salaos". Genera exactamente 5 ideas de actividades para el día ${ds}.\n\nCONTEXTO:\n- Actividades: ${actDesc}\n- Notas previas (evitar repetir): ${prevNotes}\n\nCada idea debe ser concreta y creativa, adaptada a las edades indicadas.\n\nResponde ÚNICAMENTE con este JSON exacto, sin backticks ni texto adicional:\n{"ideas":[{"nombre":"...","descripcion":"...","materiales":"...","coste":"...","edad":"..."}]}`;
 const pref=_dayIAPref[ds]||getDayIAPref();
 try{
  let txt='';
  if(pref==='chatgpt'){
   const oaiKey=getOpenAIKey();
   if(!oaiKey){resEl.innerHTML='<div style="padding:10px;font-size:12px;color:var(--rd);font-weight:700">Configura tu clave de ChatGPT en ⚙️ Config → IA.</div>';return;}
   const resp=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+oaiKey},body:JSON.stringify({model:'gpt-4o-mini',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
   const data=await resp.json();
   if(data.error)throw new Error(data.error.message);
   txt=data.choices?.[0]?.message?.content||'';
  } else {
   const claudeKey=getApiKey();
   const headers={'Content-Type':'application/json','anthropic-dangerous-direct-browser-access':'true'};
   if(claudeKey)headers['x-api-key']=claudeKey;
   const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers,body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
   const data=await resp.json();
   if(data.error)throw new Error(data.error?.message||JSON.stringify(data.error));
   txt=(data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');
  }
  const parsed=JSON.parse(txt.replace(/```json|```/g,'').trim());
  const ideas=parsed.ideas||[];if(!ideas.length)throw new Error('Sin ideas en respuesta');
  const addBtn=el(`dnt-ideas-add-${ds}`);if(addBtn)addBtn.style.display='block';
  resEl.innerHTML=ideas.map((idea,i)=>`<div class="dn-idea-card" id="di-${ds}-${i}" onclick="togDayIdea('${ds}',${i})"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div style="font-size:13.5px;font-weight:800;color:var(--txt);flex:1">${esc(idea.nombre)}</div><input type="checkbox" id="dic-${ds}-${i}" style="accent-color:var(--ok);width:16px;height:16px;flex-shrink:0;margin-top:2px" onclick="event.stopPropagation()"></div><div style="font-size:12px;color:var(--txm);margin-top:4px;line-height:1.5">${esc(idea.descripcion)}</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;font-size:11.5px;font-weight:700"><span style="color:var(--txmu)">📦 ${esc(idea.materiales)}</span><span style="color:var(--tdd)">💶 ${esc(idea.coste)}/niño</span><span style="color:var(--lvdd)">👶 ${esc(idea.edad)}</span></div></div>`).join('');
 }catch(e){
  console.error('genDayIdeas:',e);
  resEl.innerHTML=`<div style="padding:10px;font-size:12px;color:var(--rd);font-weight:700">Error: ${esc(String(e.message||e))} — Comprueba la clave IA en ⚙️ Config.</div>`;
 }
}
function togDayIdea(ds,i){
 const card=el(`di-${ds}-${i}`),chk=el(`dic-${ds}-${i}`);if(!card||!chk)return;
 const sel=!chk.checked;chk.checked=sel;card.classList.toggle('sel',sel);
 if(!_dayIdeasSel[ds])_dayIdeasSel[ds]=new Set();sel?_dayIdeasSel[ds].add(i):_dayIdeasSel[ds].delete(i);
}
function addIdeasToNote(ds){
 const sel=_dayIdeasSel[ds];if(!sel||!sel.size){toast('Selecciona al menos una idea');return;}
 const lines=[...sel].sort().map(i=>{const card=el(`di-${ds}-${i}`);if(!card)return null;const nom=card.querySelector('[style*="font-weight:800"]')?.textContent||'';const desc=card.querySelector('[style*="line-height:1.5"]')?.textContent||'';return`• ${nom}: ${desc}`;}).filter(Boolean);
 const ta=el(`dnt-text-${ds}`);if(!ta)return;
 ta.value=(ta.value?ta.value+'\n\n':'')+lines.join('\n');
 setDayNoteTab('nota',ds);toast('✅ Ideas añadidas a la nota');
}

function editDayAlumnos(evId,ds){
 const ev=gEv().find(e=>e.id===evId);if(!ev)return;
 const alms=gAl();
 const currentIds=(ev.dayOverrides&&ev.dayOverrides[ds]!==undefined)?ev.dayOverrides[ds]:(ev.alumnosIds||[]);
 const fecha=new Date(ds+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'long'});
 // Día anterior del mismo evento
 const prevDs=(()=>{const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-1);const p=d.toISOString().slice(0,10);return(p>=ev.fecha&&(!ev.fechaFin||p<=ev.fechaFin))?p:null;})();
 const mo=document.createElement('div');
 mo.style.cssText='position:fixed;inset:0;background:rgba(60,58,94,.5);z-index:300;display:flex;align-items:flex-end;justify-content:center;padding:0';
 mo.innerHTML=`<div style="background:var(--wh);border-radius:var(--r) var(--r) 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column">
  <div style="padding:13px 17px;background:rgba(243,251,250,.8);border-bottom:1.5px solid var(--bdr);display:flex;align-items:center;justify-content:space-between">
   <div><div style="font-size:15px;font-weight:800">✎ Alumnos · ${esc(fecha)}</div><div style="font-size:12px;color:var(--txmu);font-weight:600">${esc(ev.titulo)}</div></div>
   <button style="background:none;border:none;color:var(--txmu);font-size:22px;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%" onclick="this.closest('div[style*=fixed]').remove()">×</button>
  </div>
  <div style="padding:10px 15px;border-bottom:1px solid var(--bdr);display:flex;gap:7px;align-items:center">
   <input type="text" id="day-al-search" placeholder="🔍 Buscar alumno…" oninput="filterDayAl(this)" autocomplete="off" style="flex:1;height:36px;padding:0 10px;border:1.5px solid var(--bdr);border-radius:var(--rs);font-family:inherit;font-size:13px">
   ${prevDs?`<button class="btn bt2 btn-xs" onclick="copyPrevDay('${evId}','${ds}','${prevDs}',this)" style="white-space:nowrap;flex-shrink:0">📋 Copiar día anterior</button>`:''}
  </div>
  <div style="padding:12px 15px;overflow-y:auto;flex:1">
   <div style="font-size:12px;font-weight:700;color:var(--txmu);margin-bottom:8px">Selecciona quién viene hoy (los demás días no se ven afectados)</div>
   <div id="day-al-list">${alms.map(a=>`<label style="display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--bdr);cursor:pointer;font-size:14px;font-weight:600;min-height:44px" data-name="${esc((a.nombre+' '+(a.apellidos||'')).toLowerCase())}"><input type="checkbox" value="${a.id}" ${currentIds.includes(a.id)?'checked':''} style="accent-color:var(--t);width:18px;height:18px;flex-shrink:0"> <div style="flex:1"><div>${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))}</div>${a.fechaNac?`<div style="font-size:11px;color:var(--txmu);font-weight:500">${edad(a.fechaNac)} años</div>`:''}</div></label>`).join('')}</div>
  </div>
  <div style="padding:12px 17px;border-top:1.5px solid var(--bdr);display:flex;gap:8px;justify-content:flex-end;background:rgba(243,251,250,.8)">
   <button class="btn bg btn-sm" onclick="this.closest('div[style*=fixed]').remove()">Cancelar</button>
   <button class="btn bt2 btn-sm" onclick="saveDayAlumnos('${evId}','${ds}',this)">💾 Guardar</button>
  </div>
 </div>`;
 document.body.appendChild(mo);
}
function filterDayAl(inp){
 const q=inp.value.toLowerCase().trim();
 el('day-al-list').querySelectorAll('label').forEach(lbl=>{lbl.style.display=(!q||lbl.dataset.name.includes(q))?'':'none';});
}
function copyPrevDay(evId,ds,prevDs,btn){
 const ev=gEv().find(e=>e.id===evId);if(!ev)return;
 const prevIds=(ev.dayOverrides&&ev.dayOverrides[prevDs]!==undefined)?ev.dayOverrides[prevDs]:(ev.alumnosIds||[]);
 const mo=btn.closest('div[style*=fixed]');
 mo.querySelectorAll('#day-al-list input[type=checkbox]').forEach(cb=>{cb.checked=prevIds.includes(cb.value);});
 toast('📋 Alumnos del día anterior copiados');
}
function saveDayAlumnos(evId,ds,btn){
 const mo=btn.closest('div[style*=fixed]');
 const ids=[...mo.querySelectorAll('#day-al-list input:checked')].map(i=>i.value);
 const evs=gEv();const idx=evs.findIndex(e=>e.id===evId);if(idx<0)return;
 if(!evs[idx].dayOverrides)evs[idx].dayOverrides={};
 evs[idx].dayOverrides[ds]=ids;
 sEv(evs);mo.remove();toast('✅ Alumnos de este día actualizados');markDirty();showCalDay(ds);
}

// ═══════════════════ RENDER: WHATSAPP AI ═══════════════════════
function rWA(){rWAHist();rWATmpl();}
function rWAHist(){
 const hist=gWAH().slice(-20).reverse();
 if(!hist.length){el('wa-panel-hist').innerHTML='<div class="empty" style="padding:24px"><div class="empty-i">💬</div><div class="empty-t">Sin mensajes analizados</div><div class="empty-d">Pega un mensaje arriba para empezar</div></div>';return;}
 el('wa-panel-hist').innerHTML=hist.map(h=>{const cat=WA_CATS[h.cat]||WA_CATS.otro;return`<div class="wa-hist-item" onclick="showWAHist('${h.id}')"><div class="wa-hist-cat" style="background:${cat.bg};color:${cat.col}">${cat.ic} ${cat.lbl}</div><div class="wa-hist-msg">${esc(h.msg.slice(0,80))}${h.msg.length>80?'…':''}</div><div class="wa-hist-meta">${h.nombre?esc(h.nombre)+' · ':''} ${fDate(h.fecha)}</div></div>`;}).join('');
}
function rWATmpl(){
 const tmpls=gTmpl();
 if(!tmpls.length){el('wa-panel-tmpl').innerHTML='<div class="empty" style="padding:24px"><div class="empty-i">💾</div><div class="empty-t">Sin plantillas guardadas</div><div class="empty-d">Guarda respuestas que funcionen para reutilizarlas</div></div>';return;}
 el('wa-panel-tmpl').innerHTML=tmpls.map(t=>{const cat=WA_CATS[t.cat]||WA_CATS.otro;return`<div class="wa-tmpl"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><div style="flex:1"><div class="wa-tmpl-title">${esc(t.name)}</div><div style="font-size:11px;margin:3px 0;padding:2px 7px;border-radius:10px;display:inline-block;background:${cat.bg};color:${cat.col};font-weight:700">${cat.ic} ${cat.lbl}</div><div class="wa-tmpl-preview">${esc(t.text.slice(0,80))}…</div><div class="wa-tmpl-uses">Usado ${t.uses||0} vece${(t.uses||0)!==1?'s':'z'}</div></div><div style="display:flex;gap:5px;flex-shrink:0"><button class="btn bt2 btn-xs" onclick="useTmpl('${t.id}')">Usar</button><button class="btn bdr2 btn-xs" onclick="delTmpl('${t.id}')">✕</button></div></div></div>`;}).join('');
}
function showWAHist(id){
 const h=gWAH().find(x=>x.id===id);if(!h)return;
 const cat=WA_CATS[h.cat]||WA_CATS.otro;
 el('wa-result').innerHTML=buildWAResultHTML(h.msg,h.cat,h.nombre,h.resumen,h.respuesta,h.alerta,id);
}
function buildWAResultHTML(msg,cat,nombre,resumen,respuesta,alerta,histId=''){
 const catInfo=WA_CATS[cat]||WA_CATS.otro;
 return `<div class="wa-result"><div class="wa-result-hdr"><div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;opacity:.8;margin-bottom:4px">Análisis IA</div><div style="display:flex;align-items:center;gap:8px"><span class="wa-cat" style="background:rgba(255,255,255,.2);color:#fff">${catInfo.ic} ${catInfo.lbl}</span>${nombre?`<span style="font-weight:700">${esc(nombre)}</span>`:''}</div></div>
  <div class="wa-result-section"><div class="wa-label">Mensaje recibido</div><div style="font-size:13px;color:var(--txm);font-weight:600;background:var(--tll);padding:9px;border-radius:var(--rs)">${esc(msg)}</div></div>
  <div class="wa-result-section"><div class="wa-label">Qué piden</div><div style="font-size:14px;font-weight:700;color:var(--txt)">${esc(resumen||'—')}</div></div>
  <div class="wa-result-section"><div class="wa-label">Propuesta de respuesta <span style="font-size:10px;font-weight:600;color:var(--txmu)">(editable)</span></div>
   <textarea class="wa-resp-area" id="wa-resp-edit" oninput="pendingWAResp=this.value">${esc(respuesta||'')}</textarea>
   <div class="wa-actions">
    <button class="btn bt2 btn-sm" onclick="sendViaWA()">📤 Responder en WhatsApp</button>
    <button class="btn blv btn-sm" onclick="openSaveTmpl()">💾 Guardar plantilla</button>
    <button class="btn bdr2 btn-sm" onclick="openMod('modal-alerta');el('alt-titulo').value='Seguimiento: '+(pendingWAName||'familiar')">🔔 Crear alerta</button>
   </div>
  </div>
  ${alerta?`<div class="wa-result-section"><div class="wa-label">Próxima acción sugerida</div><div style="display:flex;align-items:center;gap:8px"><div style="font-size:13.5px;font-weight:700;flex:1">${esc(alerta)}</div><button class="btn bt2 btn-xs" onclick="createAlertFromWA('${esc(alerta)}')">🔔 Crear alerta</button></div></div>`:''}
 </div>`;
}

// WA ANALYSIS
async function analyzeWA(){
 const msg=el('wa-msg-input').value.trim();
 if(!msg){toast('⚠️ Escribe o pega un mensaje primero');return;}
 el('wa-result').innerHTML='<div class="ai-loader"><div class="ai-dots"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div>Analizando con IA…</div>';
 waAnalyzing=true;
 const apiKey=getApiKey();
 let result;
 if(apiKey){
  try{result=await callClaudeWA(msg,apiKey);}catch(e){result=fallbackWA(msg);}
 } else {result=fallbackWA(msg);}
 pendingWAResp=result.respuesta;pendingWACat=result.categoria;pendingWAName=result.nombre||'';
 el('wa-result').innerHTML=buildWAResultHTML(msg,result.categoria,result.nombre,result.resumen,result.respuesta,result.alerta);
 // Save to history
 const hist=gWAH();
 hist.push({id:gid(),msg,cat:result.categoria,nombre:result.nombre,resumen:result.resumen,respuesta:result.respuesta,alerta:result.alerta,fecha:new Date().toISOString()});
 sWAH(hist);waAnalyzing=false;markDirty();
}

async function callClaudeWA(msg,apiKey){
 const sysPrompt=`Eres el asistente de Ana, dueña de La Mar de Salaos, una ludoteca multisensorial en La Manga, Murcia. Ana es educadora de infantil y trabaja sola. Analiza el siguiente mensaje de WhatsApp recibido y devuelve SOLO un JSON válido sin backticks con estos campos exactos: {"nombre": "nombre detectado o null", "categoria": "consulta_actividades|inscripcion|precios|pago|baja|agradecimiento|otro", "resumen": "qué pide en 1 frase corta", "respuesta": "respuesta cálida, cariñosa, proactiva y breve en nombre de Ana usando emojis y firmando con 'Un abrazo, Ana 🌊'", "alerta": "siguiente acción concreta que debe hacer Ana (ej: Llamar a Marta el lunes) o null"}`;
 const waH={'Content-Type':'application/json','anthropic-dangerous-direct-browser-access':'true'};if(apiKey)waH['x-api-key']=apiKey;
 const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:waH,body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,system:sysPrompt,messages:[{role:'user',content:msg}]})});;
 const data=await resp.json();
 const text=data.content[0].text.trim().replace(/```json|```/g,'').trim();
 return JSON.parse(text);
}

function fallbackWA(msg){
 const ml=msg.toLowerCase();
 let cat='otro',resumen='Mensaje general',nombre=null;
 // Extract name pattern "soy [name]" or "me llamo [name]" or starts with "Hola,? [Name]"
 const nm=msg.match(/(?:soy|llamo|llama)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
 if(nm)nombre=nm[1];
 const nm2=msg.match(/^Hola[!,.]?\s+(?:me llamo\s+)?([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
 if(nm2)nombre=nm2[1];
 if(ml.includes('precio')||ml.includes('cuánto')||ml.includes('tarifa')||ml.includes('coste')){cat='precios';resumen='Consulta sobre precios o tarifas';}
 else if(ml.includes('apuntar')||ml.includes('inscri')||ml.includes('matricul')||ml.includes('empezar')){cat='inscripcion';resumen='Solicitud de inscripción o alta';}
 else if(ml.includes('actividad')||ml.includes('qué hacéis')||ml.includes('talleres')||ml.includes('información')||ml.includes('info')||ml.includes('programación')){cat='consulta_actividades';resumen='Consulta sobre actividades o programación';}
 else if(ml.includes('pago')||ml.includes('pagar')||ml.includes('transferencia')||ml.includes('recibo')){cat='pago';resumen='Consulta o gestión de pago';}
 else if(ml.includes('baja')||ml.includes('cancelar')||ml.includes('dejar')||ml.includes('ya no')){cat='baja';resumen='Solicitud de baja o cancelación';}
 else if(ml.includes('gracias')||ml.includes('encantada')||ml.includes('perfecto')||ml.includes('genial')){cat='agradecimiento';resumen='Mensaje de agradecimiento';}
 const responses={
  consulta_actividades:`Hola${nombre?' '+nombre:''}! 🌊 Qué alegría que te intereses por La Mar de Salaos. Tenemos actividades para todas las edades: inglés con movimiento, talleres creativos, bebés mañana y mucho más 🎨\n\n¿Me dices qué edad tiene tu peque para orientarte mejor? ¡Te cuento todo!\n\nUn abrazo, Ana 🌊`,
  inscripcion:`Hola${nombre?' '+nombre:''}! 🌊 Me alegra mucho que quieras unirte a La Mar de Salaos ⭐ Cuéntame: ¿qué edad tiene tu niño/a y qué actividad te interesa? Así te explico cómo apuntarse fácilmente.\n\nUn abrazo, Ana 🌊`,
  precios:`Hola${nombre?' '+nombre:''}! 🌊 Claro, te paso info sobre las cuotas. Depende de la actividad, pero están pensadas para ser muy accesibles 💛\n\n¿Me dices qué actividades te interesan y la edad de tu peque? Te mando los precios concretos.\n\nUn abrazo, Ana 🌊`,
  pago:`Hola${nombre?' '+nombre:''}! 🌊 Sin problema, hablamos sobre el pago sin ninguna preocupación. ¿Me dices de qué se trata para que te lo gestione cuanto antes?\n\nUn abrazo, Ana 🌊`,
  baja:`Hola${nombre?' '+nombre:''}! 🌊 Entiendo perfectamente, ¡ha sido un placer teneros en La Mar de Salaos! Si en algún momento queréis volver, aquí estaré 💛 ¿Hay algo que hubiera podido mejorar?\n\nUn abrazo, Ana 🌊`,
  agradecimiento:`Hola${nombre?' '+nombre:''}! 🌊 Muchas gracias a vosotros/as, sois los que hacéis que esto tenga sentido cada día 💛 ¡Es un placer teneros en La Mar de Salaos!\n\nUn abrazo, Ana 🌊`,
  otro:`Hola${nombre?' '+nombre:''}! 🌊 Gracias por escribirme. En cuanto pueda te atiendo, aunque si es urgente también puedes llamarme.\n\nUn abrazo, Ana 🌊`,
 };
 const alertas={consulta_actividades:'Responder y hacer seguimiento a consulta de '+(nombre||'familiar'),inscripcion:'Gestionar inscripción de '+(nombre||'familiar'),pago:'Verificar pago de '+(nombre||'familiar'),baja:'Tramitar baja de '+(nombre||'familiar')};
 return{nombre,categoria:cat,resumen,respuesta:responses[cat]||responses.otro,alerta:alertas[cat]||null};
}

function sendViaWA(){
 const resp=el('wa-resp-edit')?.value||pendingWAResp;if(!resp)return;
 window.open('https://wa.me/?text='+encodeURIComponent(resp),'_blank');
}
function openSaveTmpl(){
 el('tmpl-cat').value=pendingWACat;
 el('tmpl-text').value=el('wa-resp-edit')?.value||pendingWAResp;
 el('tmpl-name').value='';openMod('modal-wa-save');
}
function confirmSaveTmpl(){
 const name=el('tmpl-name').value.trim()||'Plantilla sin nombre';
 const cat=el('tmpl-cat').value,text=el('tmpl-text').value.trim();
 if(!text){toast('⚠️ Escribe el texto de la plantilla');return;}
 const tmpls=gTmpl();tmpls.push({id:gid(),name,cat,text,uses:0,fecha:new Date().toISOString()});
 sTmpl(tmpls);clm('modal-wa-save');toast('✅ Plantilla guardada');markDirty();rWATmpl();
}
function useTmpl(id){
 const t=gTmpl().find(x=>x.id===id);if(!t)return;
 const tmpls=gTmpl().map(x=>x.id===id?{...x,uses:(x.uses||0)+1}:x);sTmpl(tmpls);
 pendingWAResp=t.text;pendingWACat=t.cat;
 // Show in result area
 el('wa-result').innerHTML=buildWAResultHTML('(Plantilla)',t.cat,'',t.name,t.text,null);
 setWATab('hist');toast('✅ Plantilla cargada — edita y envía');
}
function delTmpl(id){if(!confirm('¿Eliminar plantilla?'))return;sTmpl(gTmpl().filter(t=>t.id!==id));toast('🗑️');markDirty();rWATmpl();}
function createAlertFromWA(texto){openMod('modal-alerta');el('alt-titulo').value=texto;}

// ═══════════════════ RENDER: ALERTAS CATEGORIZADAS ═════════════
function rAltCats(){
 const all=gAlt().filter(a=>a.estado==='pendiente');
 if(!all.length){el('alertas-cats').innerHTML='<div class="empty"><div class="empty-i">✅</div><div class="empty-t">Sin alertas pendientes</div><div class="empty-d">¡Todo al día!</div></div>';return;}
 let h='';
 Object.entries(ALT_CATS).forEach(([key,info])=>{
  const items=all.filter(a=>(a.cat||'fin')===key);
  if(!items.length)return;
  h+=`<div class="alert-cat-section"><div class="alert-cat-hdr ${info.cls}" onclick="toggleCatSection('${key}')">${info.ic} ${info.lbl}<span class="alert-cat-count">${items.length}</span></div>`;
  h+=`<div class="alert-cat-body" id="cat-body-${key}">`;
  items.sort((a,b)=>a.fecha.localeCompare(b.fecha)).forEach(a=>{
   h+=`<div class="alert-cat-item"><div class="aci-ico" style="background:rgba(0,0,0,.05)">${info.ic}</div>
    <div class="aci-body"><div class="aci-title">${esc(a.titulo)}</div>
    ${a.desc?`<div class="aci-desc">${esc(a.desc)}</div>`:''}
    <div class="aci-meta">📅 ${esc(a.fecha)} ${a.hora?'⏰ '+esc(a.hora):''}</div>
    <div class="aci-actions">
     <button class="btn bok2 btn-xs" onclick="actAl('${a.id}','aceptada')">✓ Hecha</button>
     <button class="btn bg btn-xs" onclick="openPP('${a.id}')">⏰ Posponer</button>
     <button class="btn bdr2 btn-xs" onclick="actAl('${a.id}','cancelada')">✕</button>
     <button class="btn bg btn-xs" onclick="dlICS('${a.id}')">📅 .ics</button>
    </div></div></div>`;
  });
  h+='</div></div>';
 });
 el('alertas-cats').innerHTML=h;
}
function toggleCatSection(key){const b=el('cat-body-'+key);if(b)b.style.display=b.style.display==='none'?'block':'none';}

// ═══════════════════ RENDER: NOTAS ═════════════════════════════
function renderNotas(){
 const all=gNt(),q=(el('nota-q')?.value||'').toLowerCase();
 const list=q?all.filter(n=>(n.titulo+' '+n.texto).toLowerCase().includes(q)):all;
 list.sort((a,b)=>({alta:0,media:1,baja:2}[a.prioridad||'media']||1)-({alta:0,media:1,baja:2}[b.prioridad||'media']||1));
 el('nempty').style.display=list.length?'none':'block';
 el('ngrid').innerHTML=list.map(n=>`<div class="nc ${n.prioridad==='alta'?'pa':n.prioridad==='baja'?'pb':'pm'}" onclick="showNota('${n.id}')"><div class="nt">${esc(n.titulo)}</div><div class="np">${esc(n.texto||'')}</div><div class="nm">${n.enlaceTipo&&n.enlaceTipo!=='libre'?`<span class="ntag">${esc(n.enlaceTipo)}</span>`:''}<span style="font-size:10px;color:var(--txmu);font-weight:600;margin-left:auto">${fDate(n.fechaCreacion)}</span></div></div>`).join('');
}

// ═══════════════════ RENDER: FEED IDEAS ════════════════════════
function rFeed(){
 const items=gFeed(),prefs=gFeedP(),last=gSet('feed_last');
 const saved=items.filter(i=>prefs.saved.includes(i.id));
 // Last update info
 if(last){const d=new Date(last),now=new Date(),diff=Math.round((now-d)/(1000*60*60*24));st('feed-last-update',diff===0?'Actualizado hoy':diff===1?'Actualizado hace 1 día':'Actualizado hace '+diff+' días');}
 // Enable refresh after 3 days
 if(el('feed-refresh-btn')){const canRef=!last||((new Date()-new Date(last))/(1000*60*60*24))>=1;el('feed-refresh-btn').disabled=!canRef;el('feed-refresh-btn').style.opacity=canRef?'1':'0.5';}
 // Saved
 if(saved.length){el('feed-saved-section').style.display='block';el('feed-saved-list').innerHTML=saved.map(i=>`<div class="feed-saved-card"><div class="feed-saved-em">${i.em||'🎨'}</div><div class="feed-saved-info"><div style="font-size:13.5px;font-weight:800;color:var(--txt)">${esc(i.title)}</div><div style="font-size:12px;color:var(--txmu);font-weight:600">${esc(i.tags?.join(' · ')||'')}</div></div><button class="btn bdr2 btn-xs" onclick="feedInteract('${i.id}','unsave');rFeed()">✕</button></div>`).join('');}
 else el('feed-saved-section').style.display='none';
 // Suggestions (not yet saved or skipped)
 const shown=items.filter(i=>!prefs.saved.includes(i.id)&&!prefs.skipped.includes(i.id));
 el('feed-empty').style.display=shown.length?'none':'block';
 el('feed-grid').innerHTML=shown.map(i=>{const c=i.color||'#7ECEC4';return`<div class="feed-card" style="border-top-color:${c}"><span class="feed-card-emoji">${i.em||'🎨'}</span><div class="feed-card-title">${esc(i.title)}</div><div class="feed-card-desc">${esc(i.desc)}</div><div class="feed-tags">${(i.tags||[]).map(t=>`<span class="feed-tag">${esc(t)}</span>`).join('')}</div><div class="feed-actions"><button class="feed-btn fb-like${prefs.liked.includes(i.id)?' active':''}" onclick="feedInteract('${i.id}','like')">💙 Me gusta</button><button class="feed-btn fb-save" onclick="feedInteract('${i.id}','save')">💾 Guardar</button><button class="feed-btn fb-skip" onclick="feedInteract('${i.id}','skip');rFeed()">✕</button></div></div>`;}).join('');
}
async function refreshFeed(){
 if(feedLoading)return;feedLoading=true;
 el('feed-loading').style.display='flex';el('feed-grid').innerHTML='';
 const apiKey=getApiKey();let ideas;
 if(apiKey){try{ideas=await callClaudeFeed(apiKey);}catch(e){ideas=getDefaultFeedIdeas();}}
 else ideas=getDefaultFeedIdeas();
 sFeed(ideas);sSet('feed_last',new Date().toISOString());
 // Reset skipped
 const prefs=gFeedP();prefs.skipped=[];sFeedP(prefs);
 feedLoading=false;el('feed-loading').style.display='none';
 if(el('feed-refresh-btn')){el('feed-refresh-btn').disabled=true;el('feed-refresh-btn').style.opacity='0.5';}
 rFeed();markDirty();
}
async function callClaudeFeed(apiKey){
 const prefs=gFeedP();const liked=gFeed().filter(i=>prefs.liked.includes(i.id)).map(i=>i.title);
 const prompt=`Genera 8 ideas de actividades creativas y sensoriales para una ludoteca multisensorial en Murcia (La Mar de Salaos). Los niños tienen entre 0 y 9 años. ${liked.length?'A Ana le han gustado especialmente: '+liked.join(', ')+'. Propón ideas similares pero nuevas.':''} Devuelve SOLO JSON válido: [{"id":"1","title":"Título actividad","desc":"Descripción breve (2 líneas)","em":"emoji","tags":["edad:3-6","tipo:sensorial","material:pintura"],"color":"#7ECEC4"}]. Usa estos colores: #7ECEC4 (sensorial), #B0A3D4 (música/movimiento), #F4976A (arte/manualidades), #F9D471 (naturaleza/exterior), #6BC583 (yoga/bienestar).`;
 const feedH={'Content-Type':'application/json','anthropic-dangerous-direct-browser-access':'true'};if(apiKey)feedH['x-api-key']=apiKey;
 const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:feedH,body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1500,messages:[{role:'user',content:prompt}]})});;
 const data=await resp.json();
 const text=data.content[0].text.trim().replace(/```json|```/g,'').trim();
 const ideas=JSON.parse(text);return ideas.map(i=>({...i,id:gid()}));
}
function getDefaultFeedIdeas(){
 return[
  {id:gid(),title:'Pintura dactilar sensorial',desc:'Exploración táctil con pinturas no tóxicas en papel grande. Estimula la creatividad y los sentidos.',em:'🎨',tags:['edad:0-3','sensorial','materiales:pintura'],color:'#F4976A'},
  {id:gid(),title:'Yoga y cuento para peques',desc:'Sesión de yoga narrada con historia. Los niños imitan animales y posturas mientras escuchan el cuento.',em:'🧘',tags:['edad:3-6','movimiento','relajación'],color:'#B0A3D4'},
  {id:gid(),title:'Taller de arcilla para emociones',desc:'Modelar con arcilla para expresar emociones. Activa la creatividad y la gestión emocional.',em:'🏺',tags:['edad:4-9','emocional','materiales:arcilla'],color:'#7ECEC4'},
  {id:gid(),title:'Circuito psicomotricidad',desc:'Estaciones de saltar, gatear y equilibrio con materiales cotidianos y aros de colores.',em:'🏃',tags:['edad:2-6','movimiento','psicomotricidad'],color:'#6BC583'},
  {id:gid(),title:'Jardinería sensorial en macetas',desc:'Plantamos semillas y aprendemos sobre el ciclo de la vida. Contacto con la naturaleza y responsabilidad.',em:'🌱',tags:['edad:3-8','naturaleza','responsabilidad'],color:'#F9D471'},
  {id:gid(),title:'Taller de percusión con reciclaje',desc:'Creamos instrumentos con botes, cartones y granos. Tocamos ritmos juntos explorando el sonido.',em:'🥁',tags:['edad:2-7','música','reciclaje'],color:'#B0A3D4'},
  {id:gid(),title:'Cocina creativa sin fuego',desc:'Preparamos frutas decoradas, ensaladas de colores y zumos. Aprendemos sobre alimentación jugando.',em:'🍓',tags:['edad:4-9','alimentación','creatividad'],color:'#F4976A'},
  {id:gid(),title:'Cuentacuentos con marionetas',desc:'Narramos cuentos con marionetas caseras hechas en el taller. Fomenta la expresión oral y la imaginación.',em:'🎭',tags:['edad:3-7','lenguaje','teatral'],color:'#7ECEC4'},
 ];
}
function feedInteract(id,action){
 const prefs=gFeedP();
 if(action==='like'){if(!prefs.liked.includes(id))prefs.liked.push(id);}
 else if(action==='save'){if(!prefs.saved.includes(id))prefs.saved.push(id);}
 else if(action==='skip'){if(!prefs.skipped.includes(id))prefs.skipped.push(id);}
 else if(action==='unsave'){prefs.saved=prefs.saved.filter(x=>x!==id);}
 sFeedP(prefs);markDirty();
 if(action==='like')toast('💙 ¡Apuntado! El feed aprende tus gustos');
 else if(action==='save')toast('💾 Idea guardada');
}

// ═══════════════════ RENDER: ANÁLISIS ══════════════════════════
function rAnalisis(){rNMN();rAnalisisMes();rAdvGal();buildFcVars();}
function rNMN(){
 const y=cY,m=cM,nmn=nmnCalc(y,m),n=nAl(y,m),cfg=gCfg(),obj=cfg.nmn_obj||20;
 const byc=nmnByCat(y,m),pct=nmn&&n?Math.min(n/nmn,1):0;
 const bc=pct>=1?'r2h':pct>=.7?'r2m':'r2l';
 const catH=CATS.filter(c=>byc[c]).map(c=>`<div class="nmn-c"><div class="nmn-cv">${byc[c].nmn?fN(byc[c].nmn,0):'—'}</div><div class="nmn-cl">${CLBL[c]}</div></div>`).join('');
 el('nmn-wrap').innerHTML=`<div class="nmn-box"><div style="font-size:10.5px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">NMN · ${MES[m-1]} ${y}</div><div style="display:flex;align-items:flex-end;gap:10px;margin-bottom:8px"><div class="nmn-v">${nmn?fN(nmn,0):'—'}</div><div style="margin-bottom:6px"><div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.8)">niños mínimos</div><div style="font-size:12px;color:rgba(255,255,255,.5)">para cubrir gastos</div></div></div>${nmn&&n?`<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:rgba(255,255,255,.65);margin-bottom:4px"><span>${n} actuales</span><span>Obj: ${obj}</span></div><div class="nmn-bar"><div class="nmn-fill ${bc}" style="width:${Math.round(pct*100)}%"></div></div>`:''}${catH?`<div style="margin-top:11px;font-size:10px;font-weight:700;color:rgba(255,255,255,.45);text-transform:uppercase;margin-bottom:6px">Por categoría</div><div class="nmn-gr">${catH}</div>`:''}<div style="font-size:11px;color:rgba(255,255,255,.38);margin-top:9px;font-style:italic">NMN = Gastos totales ÷ Ingreso medio por alumno pagado</div></div>`;
 const p=ts(Rs.nmn);
 mkC('chart-nmn','line',{labels:p.map(x=>x.l),datasets:[{label:'NMN',data:p.map(x=>nmnCalc(x.y,x.m)||0),borderColor:'#B0A3D4',backgroundColor:'rgba(176,163,212,.15)',borderWidth:2.5,tension:.35,pointRadius:4,fill:true},{label:'Alumnos reales',data:p.map(x=>nAl(x.y,x.m)),borderColor:'#7ECEC4',borderWidth:2,tension:.35,pointRadius:3,fill:false},{label:'Objetivo',data:p.map(()=>cfg.nmn_obj||20),borderColor:'rgba(232,112,112,.5)',borderWidth:1.5,borderDash:[5,4],pointRadius:0}]},{scales:{x:{grid:{display:false},ticks:{font:{family:'Nunito',size:11,weight:'700'}}},y:{grid:{color:'rgba(176,163,212,.08)'},ticks:{font:{family:'Nunito',size:11},callback:v=>v}}}});
}
function rAnalisisMes(){
 const p=ts(Rs.mes);
 mkC('chart-mes','bar',{labels:p.map(x=>x.l),datasets:[{label:'Ingresos',data:p.map(x=>ingM(x.y,x.m)),backgroundColor:'rgba(126,206,196,.85)',borderRadius:6,borderSkipped:false},{label:'Gastos',data:p.map(x=>gastT(x.y,x.m)),backgroundColor:'rgba(244,151,106,.75)',borderRadius:6,borderSkipped:false}]});
 const pts12=ts(12);
 mkC('chart-alum','line',{labels:pts12.map(x=>x.l),datasets:[{label:'Alumnos',data:pts12.map(x=>nAl(x.y,x.m)),borderColor:'#7ECEC4',backgroundColor:'rgba(126,206,196,.15)',borderWidth:2.5,tension:.35,pointRadius:3,fill:true}]},{plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{family:'Nunito',size:10,weight:'700'}}},y:{grid:{color:'rgba(126,206,196,.08)'},ticks:{font:{family:'Nunito',size:10},callback:v=>v}}}});
 mkC('chart-margen','line',{labels:pts12.map(x=>x.l),datasets:[{label:'Margen %',data:pts12.map(x=>mgM(x.y,x.m)||0),borderColor:'#B0A3D4',backgroundColor:'rgba(176,163,212,.12)',borderWidth:2.5,tension:.35,pointRadius:3,fill:true}]},{plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{family:'Nunito',size:10,weight:'700'}}},y:{grid:{color:'rgba(176,163,212,.08)'},ticks:{font:{family:'Nunito',size:10},callback:v=>v+'%'}}}});
 mkC('chart-medio','line',{labels:p.map(x=>x.l),datasets:[{label:'Ing. medio/al.',data:p.map(x=>imM(x.y,x.m)||0),borderColor:'#7ECEC4',borderWidth:2,tension:.35,pointRadius:3},{label:'Gasto medio/al.',data:p.map(x=>gmM(x.y,x.m)||0),borderColor:'#F4976A',borderWidth:2,tension:.35,pointRadius:3}]});
 const ba=ingByAct(cY,cM);const lb=Object.keys(ba),vl=Object.values(ba);
 dc('chart-des');if(lb.length){mkC('chart-des','pie',{labels:lb,datasets:[{data:vl,backgroundColor:PAL.slice(0,lb.length),borderWidth:2,borderColor:'#fff'}]},{scales:{x:{display:false},y:{display:false}},plugins:{legend:{position:'right',labels:{font:{family:'Nunito',size:11,weight:'700'},boxWidth:12,boxHeight:12}},tooltip:{callbacks:{label:c=>` ${c.label}: ${fmt(c.raw)}`}}}});}
}
function rAdvGal(){
 const charts=gAC();const gal=el('adv-gal');
 if(!charts.length){gal.innerHTML='<div class="empty" style="padding:20px"><div class="empty-i">📐</div><div class="empty-t">Sin gráficas personalizadas</div></div>';return;}
 gal.innerHTML=charts.map(c=>`<div class="adv-cc"><div class="adv-ch"><div class="adv-ct">${esc(c.title)}</div><div style="display:flex;gap:5px"><button class="edit-btn" onclick="editAdv('${c.id}')">✎</button><button class="btn bdr2 btn-xs" onclick="delAdv('${c.id}')">✕</button></div></div><canvas id="adv-${c.id}" height="145"></canvas></div>`).join('');
 setTimeout(()=>{charts.forEach(c=>{const p=ts(c.months||6);const ds=c.variables.map((k,i)=>{const vi=aVars().find(v=>v.k===k)||{l:k};const col=PAL[i%PAL.length];return{label:vi.l,data:p.map(x=>getVV(k,x.y,x.m)),backgroundColor:c.type==='line'?col+'22':col+'cc',borderColor:col,borderWidth:2,borderRadius:5,tension:.35,pointRadius:c.type==='line'?3:0,fill:c.type==='line'};});const cv=document.getElementById('adv-'+c.id);if(!cv)return;dc('adv-'+c.id);CHS['adv-'+c.id]=new Chart(cv.getContext('2d'),{type:c.type||'bar',data:{labels:p.map(x=>x.l),datasets:ds},options:{responsive:true,plugins:{legend:{labels:{font:{family:'Nunito',size:11,weight:'700'},boxWidth:10,boxHeight:10}}},scales:{x:{grid:{display:false},ticks:{font:{family:'Nunito',size:11,weight:'700'}}},y:{grid:{color:'rgba(126,206,196,.08)'},ticks:{font:{family:'Nunito',size:11}}}}}});});},50);
}
function buildFcVars(){const s=el('fc-var');if(!s)return;s.innerHTML='';aVars().forEach(v=>{const o=document.createElement('option');o.value=v.k;o.textContent=v.l;s.appendChild(o);});}
function doForecast(){
 const vk=el('fc-var').value,n=parseInt(el('fc-mon').value)||6;
 const p=ts(n),vals=p.map(x=>getVV(vk,x.y,x.m));
 if(vals.filter(v=>v>0).length<2){toast('⚠️ Datos insuficientes');return;}
 const lr=linReg(p.map((_,i)=>i+1),vals);const pred=lr.m*(n+1)+lr.b,r2=Math.max(0,Math.min(1,lr.r2));
 const isN=vk==='n_alumnos'||vk==='nmn'||vk==='margen';
 el('fc-val').textContent=isN?fN(pred,1):fmt(pred);
 el('fc-r2p').textContent=Math.round(r2*100)+'%';
 const rf=el('fc-r2f');rf.style.width=Math.round(r2*100)+'%';rf.className='r2f '+(r2>=.7?'r2h':r2>=.4?'r2m':'r2l');
 el('fc-trend').textContent=(lr.m>0?'📈 Tendencia ascendente':'📉 Tendencia descendente')+` · ${(lr.m>=0?'+':'')+fN(lr.m,2)}/mes`;
 el('fc-res').style.display='block';
 setTimeout(()=>{const xs=p.map((_,i)=>i+1),tl=xs.map(x=>lr.m*x+lr.b);dc('chart-fc');const cv=el('chart-fc');if(!cv)return;CHS['chart-fc']=new Chart(cv.getContext('2d'),{type:'line',data:{labels:[...p.map(x=>x.l),'Próximo'],datasets:[{label:'Real',data:[...vals,null],borderColor:'#7ECEC4',backgroundColor:'rgba(126,206,196,.2)',borderWidth:2.5,tension:.35,pointRadius:4,fill:true},{label:'Tendencia',data:[...tl,pred],borderColor:'rgba(176,163,212,.7)',borderWidth:1.5,borderDash:[5,4],pointRadius:0},{label:'Predicción',data:[...vals.map(()=>null),pred],borderColor:'#F4976A',backgroundColor:'#F4976A',borderWidth:0,pointRadius:8,pointStyle:'star'}]},options:{responsive:true,plugins:{legend:{labels:{font:{family:'Nunito',size:11,weight:'700'},boxWidth:10,boxHeight:10}}},scales:{x:{grid:{display:false},ticks:{font:{family:'Nunito',size:11,weight:'700'}}},y:{grid:{color:'rgba(126,206,196,.08)'},ticks:{font:{family:'Nunito',size:11}}}}}});},50);
}
function linReg(xs,ys){const n=xs.length,sX=xs.reduce((a,b)=>a+b,0),sY=ys.reduce((a,b)=>a+b,0),sXY=xs.reduce((s,x,i)=>s+x*ys[i],0),sX2=xs.reduce((s,x)=>s+x*x,0);const m=(n*sXY-sX*sY)/(n*sX2-sX*sX||1),b=(sY-m*sX)/n;const yM=sY/n,sT=ys.reduce((s,y)=>s+(y-yM)**2,0),sR=ys.reduce((s,y,i)=>s+(y-(m*xs[i]+b))**2,0);return{m,b,r2:sT>0?1-sR/sT:0};}

// ═══════════════════ MODAL HELPERS ═════════════════════════════
// V9: limpieza COMPLETA del formulario de alumno (incluye hermanos).
function resetAlumnoForm(){
 eAlId=null;
 const h=el('mah');if(h)h.textContent='Nuevo alumno';
 ['an','aap','atel','ama','apa','ano','afn','ack','aaf'].forEach(i=>{const e=el(i);if(e)e.value='';});
 const chk=el('a-has-hermano');if(chk)chk.checked=false;
 const row=el('a-hermano-row');if(row)row.style.display='none';
 const q=el('a-herm-search');if(q)q.value='';
 const r=el('a-herm-results');if(r)r.innerHTML='';
 setHIdsInUI([]);renderHermanosLinked();
}
// V9: crea alumno nuevo desde cero, sin arrastrar el estado del anterior.
function nuevoAlumno(){qFrom=null;_hermanoParentId=null;resetAlumnoForm();openMod('modal-alumno');}
function openMod(id){
 if(id==='modal-chart'){eChId=null;el('mch').textContent='Nueva gráfica';el('cht').value='';el('chtp').value='bar';el('chmo').value=6;buildVG([]);}
 if(id==='modal-nota'&&!eNtId){eNtId=null;el('mnh').textContent='Nueva nota';['ntit','ntxt'].forEach(i=>{const e=el(i);if(e)e.value='';});if(el('nprio'))el('nprio').value='media';if(el('nenlt'))el('nenlt').value='';if(el('nenlr'))el('nenlr').style.display='none';}
 if(id==='modal-alumno'&&!eAlId)resetAlumnoForm();
 if(id==='modal-alerta'){el('alt-titulo').value='';el('alt-cat').value='fin';el('alt-desc').value='';const t=new Date();t.setDate(t.getDate()+1);el('alt-fecha').value=t.toISOString().slice(0,10);el('alt-hora').value='';if(el('alt-ics'))el('alt-ics').checked=false;}
 el(id)?.classList.add('open');
}
const _MODAL_EDIT_RESET={
 'modal-alumno':()=>{eAlId=null;},'modal-ing':()=>{eIngId=null;},
 'modal-gasto':()=>{eGastId=null;},'modal-nota':()=>{eNtId=null;},
 'modal-chart':()=>{eChId=null;},'modal-ev':()=>{eEvId=null;}
};
function clm(id){
 el(id)?.classList.remove('open');
 // V9: al cerrar un modal se limpia SIEMPRE su estado de edición.
 const f=_MODAL_EDIT_RESET[id];if(f)f();
}
function cmo(e,id){if(e.target===el(id))clm(id);}

// ═══════════════════ PERIOD SELECTOR ═══════════════════════════
const MONTHS_ES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
function pselHTML(){return`<div class="psel" style="display:flex;align-items:center;justify-content:center;gap:10px;background:var(--wh);border-radius:var(--r);padding:10px 14px;margin-bottom:14px;box-shadow:var(--sh);border:1.5px solid var(--bdr)"><button class="psel-btn" onclick="prevP()">&#8249;</button><span class="psel-lbl" id="plbl">${MONTHS_ES[cM-1]} ${cY}</span><button class="psel-btn" onclick="nextP()">&#8250;</button></div>`;}

// ═══════════════════ INGRESO ACTIONS ═══════════════════════════
function openIngModal(){
 eIngId=null;el('mih').textContent='Nuevo ingreso';
 const s=el('ing-alum');s.innerHTML='<option value="">Sin vincular (nombre libre)</option>';
 gAl().forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.nombre+(a.apellidos?' '+a.apellidos:'');s.appendChild(o);});
 el('ing-nom').value='';
 const ai=el('ing-act');ai.innerHTML='<option value="">Selecciona…</option>';
 gCfg().actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;ai.appendChild(o);});
 el('ing-cuota').value='';el('ing-anticipo').value='';el('ing-pendiente').value='';
 el('ing-pag').value='no';el('ing-obs').value='';
 el('ing-nom-row').style.display='block';
 const ms=el('ing-mes');ms.innerHTML='';
 for(let i=0;i<12;i++){let m=cM-i,y=cY;while(m<1){m+=12;y--;}const o=document.createElement('option');o.value=y+'|'+m;o.textContent=MONTHS_ES[m-1]+' '+y;if(i===0)o.selected=true;ms.appendChild(o);}
 el('modal-ing').classList.add('open');
}
function editIngEntry(id){
 const list=gE();const e=list.find(x=>x.id===id);if(!e)return;
 eIngId=id;el('mih').textContent='Editar ingreso';
 const s=el('ing-alum');s.innerHTML='<option value="">Sin vincular (nombre libre)</option>';
 gAl().forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.nombre+(a.apellidos?' '+a.apellidos:'');s.appendChild(o);});
 s.value=e.alumnoId||'';
 el('ing-nom-row').style.display=e.alumnoId?'none':'block';
 el('ing-nom').value=e.nombre||'';
 const ai=el('ing-act');ai.innerHTML='<option value="">Selecciona…</option>';
 gCfg().actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;ai.appendChild(o);});
 ai.value=e.actividad||'';
 el('ing-cuota').value=e.cuota||'';
 el('ing-anticipo').value=CALC.cobrado(e);
 el('ing-pendiente').value=CALC.pendiente(e);
 el('ing-pag').value=e.pagado?'si':'no';el('ing-obs').value=e.obs||'';
 const ms=el('ing-mes');ms.innerHTML='';
 for(let i=0;i<12;i++){let m=cM-i,y=cY;while(m<1){m+=12;y--;}const o=document.createElement('option');o.value=y+'|'+m;o.textContent=MONTHS_ES[m-1]+' '+y;if(y===e.año&&m===e.mes)o.selected=true;ms.appendChild(o);}
 el('modal-ing').classList.add('open');
}
function onAlumChange(){
 const v=el('ing-alum').value;el('ing-nom-row').style.display=v?'none':'block';
 if(v){const a=gAl().find(x=>x.id===v);if(a){el('ing-nom').value=a.nombre+(a.apellidos?' '+a.apellidos:'');if(a.actividadFavorita&&el('ing-act'))el('ing-act').value=a.actividadFavorita;}}
 const alumno=v?gAl().find(a=>a.id===v):null;
 const hRow=el('ing-hermano-row');
 if(hRow){
  const hIds=alumno?normHIds(alumno):[];
  if(hIds.length){
   hRow.style.display='block';
   // Render checkboxes para cada hermano
   const alms=gAl();
   const checks=el('ing-hermano-checks');
   if(checks)checks.innerHTML=hIds.map(id=>{const h=alms.find(x=>x.id===id);return h?`<label style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--bdr);cursor:pointer;font-size:13.5px;font-weight:700"><input type="checkbox" class="ing-herm-chk" value="${h.id}" style="accent-color:var(--t);width:16px;height:16px;flex-shrink:0"> ${esc(h.nombre+(h.apellidos?' '+h.apellidos:''))}</label>`:''}).filter(Boolean).join('');
  } else {
   hRow.style.display='none';
   if(el('ing-has-hermano'))el('ing-has-hermano').checked=false;
   if(el('ing-hermano-sel'))el('ing-hermano-sel').style.display='none';
  }
 }
}
function togIngHermano(){
 const chk=el('ing-has-hermano'),sel=el('ing-hermano-sel');
 if(chk&&sel)sel.style.display=chk.checked?'block':'none';
}
function quickAddAlumno(){qFrom='ing';eAlId=null;el('mah').textContent='Nuevo alumno';['an','aap','atel','ama','apa','ano'].forEach(i=>{const e=el(i);if(e)e.value='';});if(el('afn'))el('afn').value='';if(el('a-has-hermano'))el('a-has-hermano').checked=false;if(el('a-hermano-row'))el('a-hermano-row').style.display='none';setHIdsInUI([]);renderHermanosLinked();openMod('modal-alumno');}
function saveIng(){
 const mv=(el('ing-mes').value||`${cY}|${cM}`).split('|');const y=parseInt(mv[0]),m=parseInt(mv[1]);
 const aId=el('ing-alum').value||null;
 const nom=aId?(gAl().find(a=>a.id===aId)?.nombre||''):el('ing-nom').value.trim();
 const act=el('ing-act').value,cuota=parseFloat(el('ing-cuota').value),pag=el('ing-pag').value==='si',obs=el('ing-obs').value.trim();
 let anticipo=parseFloat(el('ing-anticipo').value)||0;
 const pagadoFinal=pag||(anticipo>=cuota&&cuota>0);
 // V9: si está marcado como Pagado, no queda nada pendiente (regla única)
 if(pagadoFinal)anticipo=cuota;
 const pendiente=Math.max(0,cuota-anticipo);
 // Hermano conjunto
 const conHermano=el('ing-has-hermano')?.checked;
 const hermanoIngIds=conHermano?[...document.querySelectorAll('.ing-herm-chk:checked')].map(cb=>cb.value).filter(Boolean):[];
 if(!nom){toast('⚠️ Indica el nombre o selecciona alumno');return;}
 if(!act){toast('⚠️ Selecciona una actividad');return;}
 if(isNaN(cuota)||cuota<0){toast('⚠️ Cuota inválida');return;}
 const ext=gE();
 const entry={año:y,mes:m,alumnoId:aId,nombre:nom,actividad:act,cuota,anticipo,pendiente,pagado:pagadoFinal,obs,hermanoIngIds:hermanoIngIds.length?hermanoIngIds:undefined};
 if(eIngId){const i=ext.findIndex(x=>x.id===eIngId);if(i>=0)ext[i]={...ext[i],...entry};}
 else ext.push({id:gid(),...entry});
 sE(ext);eIngId=null;clm('modal-ing');toast('✅ Ingreso guardado');markDirty();render();
}
function marcarPagado(id){
 const e=gE();const i=e.findIndex(x=>x.id===id);if(i<0)return;
 e[i].pagado=true;e[i].anticipo=+e[i].cuota||0;e[i].pendiente=0;
 sE(e);markDirty();toast('✅ Cobrado');render();
}
function calcPend(){
 const c=parseFloat(el('ing-cuota').value)||0;
 const a=parseFloat(el('ing-anticipo').value)||0;
 const pend=Math.max(0,c-a);
 el('ing-pendiente').value=pend.toFixed(2);
 if(c>0&&a>=c){el('ing-pag').value='si';}
 else if(a===0&&c>0){el('ing-pag').value='no';}
}
function togP(id){const e=gE();const i=e.findIndex(x=>x.id===id);if(i<0)return;e[i].pagado=!e[i].pagado;sE(e);markDirty();toast(e[i].pagado?'✅ Cobrado':'⏳ Marcado pendiente');render();}
function delIng(id){if(!confirm('¿Eliminar este ingreso?'))return;sE(gE().filter(e=>e.id!==id));markDirty();toast('🗑️ Eliminado');render();}

// ═══════════════════ GASTO ACTIONS ═════════════════════════════
function editGastEntry(id){
 eGastId=id;const g=gG().find(x=>x.id===id);if(!g)return;
 el('mgh').textContent='Editar gasto';
 const s=el('gco');s.innerHTML='<option value="">Selecciona…</option>';
 gCfg().gastos.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;s.appendChild(o);});
 s.value=g.concepto||'';el('gimp').value=g.importe||'';el('gdesc').value=g.desc||'';
 el('modal-gasto').classList.add('open');
}
function saveG(){
 const conc=el('gco').value,imp=parseFloat(el('gimp').value),desc=el('gdesc').value.trim();
 if(!conc){toast('⚠️ Selecciona concepto');return;}
 if(isNaN(imp)||imp<=0){toast('⚠️ Importe inválido');return;}
 const gs=gG();
 if(eGastId){const i=gs.findIndex(x=>x.id===eGastId);if(i>=0)gs[i]={...gs[i],concepto:conc,importe:imp,desc};}
 else gs.push({id:gid(),año:cY,mes:cM,concepto:conc,importe:imp,desc});
 sG(gs);eGastId=null;clm('modal-gasto');toast(eGastId?'✅ Gasto actualizado':'✅ Gasto guardado');markDirty();render();
}
function delG(id){if(!confirm('¿Eliminar este gasto?'))return;sG(gG().filter(g=>g.id!==id));markDirty();toast('🗑️ Eliminado');render();}
function openCopyG(){
 const s=el('copyg-mes');s.innerHTML='';
 const ms=new Set(gG().filter(g=>!(g.año===cY&&g.mes===cM)).map(g=>g.año+'|'+g.mes));
 if(!ms.size){toast('⚠️ Sin meses anteriores con gastos');return;}
 [...ms].sort().reverse().forEach(k=>{const[y,m]=k.split('|');const o=document.createElement('option');o.value=k;o.textContent=MONTHS_ES[m-1]+' '+y;s.appendChild(o);});
 prevCopyG();openMod('modal-copyg');s.onchange=prevCopyG;
}
function prevCopyG(){
 const v=el('copyg-mes').value;if(!v)return;
 const[y,m]=v.split('|').map(Number),list=gastM(y,m);
 el('copyg-prev').innerHTML=list.length?'<div style="margin-top:9px">'+list.map(g=>`<label style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--bdr);cursor:pointer;font-size:13.5px;font-weight:600;min-height:var(--tap-sm)"><input type="checkbox" class="cgcb" value="${g.id}" checked style="accent-color:var(--t);width:18px;height:18px;flex-shrink:0"> ${esc(g.concepto)}<span style="margin-left:auto;font-weight:800">${fmt(g.importe)}</span></label>`).join('')+'</div>':'<div class="empty" style="padding:14px"><div class="empty-d">Sin gastos en ese mes</div></div>';
}
function doCopyG(){
 const v=el('copyg-mes').value;if(!v)return;
 const[y,m]=v.split('|').map(Number),src=gastM(y,m);
 const chk=new Set([...document.querySelectorAll('.cgcb:checked')].map(c=>c.value));
 const tc=src.filter(g=>chk.has(g.id));if(!tc.length){toast('⚠️ Selecciona al menos uno');return;}
 const gs=gG();tc.forEach(g=>gs.push({...g,id:gid(),año:cY,mes:cM}));sG(gs);
 clm('modal-copyg');toast(`✅ ${tc.length} gastos copiados`);markDirty();render();
}

// ═══════════════════ ALUMNO ACTIONS ════════════════════════════
// V9: familia = grupo cerrado transitivamente. Devuelve TODOS los ids
// alcanzables desde `id` siguiendo enlaces de hermanos (incluye a `id`).
function familiaDe(id,alms){
 const byId={};(alms||[]).forEach(a=>{byId[a.id]=a;});
 const out=new Set(),stack=[id];
 while(stack.length){
  const c=stack.pop();
  if(!c||out.has(c)||!byId[c])continue;
  out.add(c);
  normHIds(byId[c]).forEach(h=>{if(!out.has(h))stack.push(h);});
 }
 return out;
}
function saveAlumno(){
 const nom=el('an').value.trim();if(!nom){toast('⚠️ Escribe el nombre');return;}
 // Leer hermanoIds del UI (array JSON guardado en hidden input)
 let newHIds=[];
 try{newHIds=JSON.parse(el('a-hermano-ids')?.value||'[]');}catch{}
 // Si venimos de "crear hermano/a", vincular de vuelta al alumno de origen
 if(qFrom==='hermano'&&_hermanoParentId&&!newHIds.includes(_hermanoParentId))newHIds.push(_hermanoParentId);
 const alms=gAl();
 // V9 GUARDA DE SEGURIDAD: si eAlId apunta a un alumno que ya no existe,
 // se trata como alta nueva en vez de sobrescribir una posición cualquiera.
 if(eAlId&&!alms.some(a=>a.id===eAlId))eAlId=null;
 const alId=eAlId||gid();
 newHIds=[...new Set(newHIds.filter(id=>id&&id!==alId&&alms.some(a=>a.id===id)))];
 const al={id:alId,nombre:nom,apellidos:el('aap').value.trim(),fechaNac:el('afn').value,telefono:el('atel').value.trim(),mail:el('ama').value.trim(),padre:el('apa').value.trim(),comoConocieron:el('ack')?.value||'',actividadFavorita:el('aaf')?.value||'',notas:el('ano').value.trim()};
 // Familia ANTERIOR de este alumno (antes de guardar), para saber quién sale
 const oldFam=eAlId?familiaDe(eAlId,alms):new Set([alId]);
 // Insertar/actualizar el propio alumno
 const selfIdx=alms.findIndex(a=>a.id===alId);
 if(selfIdx>=0)alms[selfIdx]={...alms[selfIdx],...al};else alms.push({...al});
 // ── Familia NUEVA: el alumno + los seleccionados + las familias de éstos ──
 const fam=new Set([alId]);
 newHIds.forEach(id=>{familiaDe(id,alms).forEach(x=>fam.add(x));});
 // ── Los que SALEN de la familia: se desenlazan del grupo nuevo pero
 //    siguen enlazados entre ellos (no se pierden vínculos ajenos) ──
 const salen=[...oldFam].filter(id=>!fam.has(id));
 const salenSet=new Set(salen);
 salen.forEach(id=>{
  const pi=alms.findIndex(a=>a.id===id);if(pi<0)return;
  const cur=normHIds(alms[pi]).filter(x=>salenSet.has(x));
  alms[pi]={...alms[pi],hermanoIds:cur.length?cur:undefined};
  delete alms[pi].hermanoId;
 });
 // ── Los que ENTRAN/SIGUEN: grupo completamente conectado y coherente ──
 const famArr=[...fam];
 famArr.forEach(id=>{
  const pi=alms.findIndex(a=>a.id===id);if(pi<0)return;
  const otros=famArr.filter(x=>x!==id);
  alms[pi]={...alms[pi],
   hermanoIds:otros.length?otros:undefined,
   // Compartir contacto de familia solo si el campo está vacío
   telefono:alms[pi].telefono||al.telefono||'',
   mail:alms[pi].mail||al.mail||'',
   padre:alms[pi].padre||al.padre||''
  };
  delete alms[pi].hermanoId;
 });
 sAl(alms);
 if(qFrom==='ing'){
  const s=el('ing-alum');const o=document.createElement('option');o.value=al.id;o.textContent=al.nombre+(al.apellidos?' '+al.apellidos:'');s.appendChild(o);s.value=al.id;onAlumChange();qFrom=null;
 }
 if(qFrom==='hermano'){_hermanoParentId=null;qFrom=null;}
 const wasEdit=!!eAlId;eAlId=null;clm('modal-alumno');toast(wasEdit?'✅ Alumno actualizado':'✅ Alumno registrado');markDirty();renderAlumnos();
}
let _hermanoParentId=null;
function getHIdsFromUI(){try{return JSON.parse(el('a-hermano-ids')?.value||'[]');}catch{return[];}}
function setHIdsInUI(ids){const inp=el('a-hermano-ids');if(inp)inp.value=JSON.stringify(ids);}
function togHermanoUI(){
 const chk=el('a-has-hermano'),row=el('a-hermano-row');
 if(chk&&row){
  row.style.display=chk.checked?'block':'none';
  if(!chk.checked){setHIdsInUI([]);renderHermanosLinked();}
 }
}
function renderHermanosLinked(){
 const ids=getHIdsFromUI(),alms=gAl();
 const cont=el('a-hermanos-linked');if(!cont)return;
 if(!ids.length){cont.innerHTML='';return;}
 cont.innerHTML='<div style="font-size:11px;font-weight:800;color:var(--txmu);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">Hermanos/as vinculados:</div>'+
  ids.map(id=>{const a=alms.find(x=>x.id===id);return a?`<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--tll);border-radius:var(--rs);margin-bottom:4px"><span style="font-size:13px;font-weight:700;color:var(--tdd)">👨‍👧 ${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))}</span><button style="background:none;border:none;color:var(--rd);cursor:pointer;font-size:14px;padding:0 4px" onclick="removeHermano('${id}')">✕</button></div>`:''}).join('');
 // Ocultar buscador si ya hay 5
 const addArea=el('a-hermanos-add-area');
 if(addArea)addArea.style.display=ids.length>=5?'none':'block';
}
function removeHermano(id){
 const ids=getHIdsFromUI().filter(x=>x!==id);setHIdsInUI(ids);renderHermanosLinked();
}
function searchHermano(){
 const q=(el('a-herm-search').value||'').toLowerCase().trim();
 const res=el('a-herm-results');
 const excl=new Set([eAlId||'_',...getHIdsFromUI()]);
 const matches=q?gAl().filter(a=>!excl.has(a.id)&&(a.nombre+' '+(a.apellidos||'')).toLowerCase().includes(q)):[];
 res.innerHTML=matches.length?matches.slice(0,5).map(a=>`<div class="msi" onclick="setHermano('${a.id}')" style="padding:8px 10px;cursor:pointer;border:1px solid var(--bdr);border-radius:var(--rs);margin-bottom:4px;font-size:13px;font-weight:700">${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))} <span style="font-weight:500;color:var(--txmu);font-size:11px">${a.fechaNac?'· '+edad(a.fechaNac)+' años':''}</span></div>`).join(''):q?'<div style="font-size:12px;color:var(--txmu);padding:6px">Sin resultados</div>':'';
}
function setHermano(id){
 let ids=getHIdsFromUI();
 if(ids.includes(id)||ids.length>=5)return;
 // V9: al elegir un hermano se trae su familia completa (evita familias a medias)
 const fam=[...familiaDe(id,gAl())].filter(x=>x!==(eAlId||'_')&&!ids.includes(x));
 ids=[...ids,...fam].slice(0,5);
 setHIdsInUI(ids);
 el('a-herm-results').innerHTML='';if(el('a-herm-search'))el('a-herm-search').value='';
 // Transferir datos de contacto si están vacíos
 const herm=gAl().find(a=>a.id===id);
 if(herm){
  if(!el('atel').value&&herm.telefono)el('atel').value=herm.telefono;
  if(!el('ama').value&&herm.mail)el('ama').value=herm.mail;
  if(!el('apa').value&&herm.padre)el('apa').value=herm.padre;
  toast('📋 Datos de contacto copiados de '+esc(herm.nombre));
 }
 renderHermanosLinked();
}
function clearHermano(){setHIdsInUI([]);renderHermanosLinked();}
function prepCrearHermano(){
 // Guardar referencia al alumno actual (si está editando)
 if(eAlId)_hermanoParentId=eAlId;
 qFrom='hermano';
 // Pre-rellenar con datos de contacto del alumno actual
 const tel=el('atel').value,mail=el('ama').value,padre=el('apa').value;
 clm('modal-alumno');
 const parentId=_hermanoParentId;
 setTimeout(()=>{
  resetAlumnoForm();
  qFrom='hermano';_hermanoParentId=parentId;
  el('mah').textContent='Nuevo hermano/a';
  if(el('atel'))el('atel').value=tel;
  if(el('ama'))el('ama').value=mail;
  if(el('apa'))el('apa').value=padre;
  if(el('aaf')){el('aaf').innerHTML='<option value="">—</option>';gCfg().actividades.forEach(act=>{const o=document.createElement('option');o.value=act;o.textContent=act;el('aaf').appendChild(o);});}
  // V9: preseleccionar la familia de origen para que el vínculo sea visible
  if(parentId){
   const fam=[...familiaDe(parentId,gAl())].slice(0,5);
   if(fam.length){
    setHIdsInUI(fam);
    if(el('a-has-hermano'))el('a-has-hermano').checked=true;
    if(el('a-hermano-row'))el('a-hermano-row').style.display='block';
    renderHermanosLinked();
   }
  }
  openMod('modal-alumno');
 },200);
}
function editAl(id){
 eAlId=id;const a=gAl().find(x=>x.id===id);if(!a)return;
 el('mah').textContent='Editar alumno';el('an').value=a.nombre||'';el('aap').value=a.apellidos||'';el('afn').value=a.fechaNac||'';el('atel').value=a.telefono||'';el('ama').value=a.mail||'';el('apa').value=a.padre||'';
 if(el('ack'))el('ack').value=a.comoConocieron||'';
 const af=el('aaf');if(af){af.innerHTML='<option value="">—</option>';gCfg().actividades.forEach(act=>{const o=document.createElement('option');o.value=act;o.textContent=act;af.appendChild(o);});af.value=a.actividadFavorita||'';}
 el('ano').value=a.notas||'';
 // Hermanos (multi)
 const hasH=el('a-has-hermano'),hRow=el('a-hermano-row');
 if(hasH&&hRow){
  const hIds=normHIds(a);
  if(hIds.length){
   hasH.checked=true;hRow.style.display='block';setHIdsInUI(hIds);renderHermanosLinked();
  } else {hasH.checked=false;hRow.style.display='none';setHIdsInUI([]);}
 }
 openMod('modal-alumno');
}
function showAlDet(id){
 const a=gAl().find(x=>x.id===id);if(!a)return;const st2=alSt(id);const ag=edad(a.fechaNac);
 const rows=[['Nombre completo',a.nombre+(a.apellidos?' '+a.apellidos:'')],['Edad',ag!==null?ag+' años':'—'],['Fecha nac.',a.fechaNac||'—'],['Teléfono',a.telefono||'—'],['Email',a.mail||'—'],['Padre/Madre',a.padre||'—'],['Cómo nos conoció',a.comoConocieron||'—'],['Actividad favorita',a.actividadFavorita||'—'],['Última actividad',st2.last||'—'],['Total pagado',fmt(st2.total)]];
 el('adet-body').innerHTML=`<div style="margin-bottom:12px">`+rows.map(r=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--bdr);font-size:13.5px"><span style="font-weight:700;color:var(--txmu);flex-shrink:0;margin-right:10px">${esc(r[0])}</span><span style="font-weight:700;text-align:right">${esc(String(r[1]))}</span></div>`).join('')+'</div>'+(a.notas?`<div style="padding:10px;background:var(--tll);border-radius:var(--rs);font-size:13px;font-weight:600;color:var(--txm)">${esc(a.notas)}</div>`:'')+(a.telefono?`<a href="https://wa.me/34${a.telefono.replace(/\s/g,'')}" target="_blank" class="btn bt2" style="width:100%;justify-content:center;margin-top:12px;text-decoration:none">📲 Abrir WhatsApp</a>`:'');
 el('aedit-btn').onclick=()=>{clm('modal-adet');editAl(id);};
 el('adel-btn').onclick=()=>{if(!confirm(`¿Eliminar "${a.nombre}"?`))return;sAl(gAl().filter(x=>x.id!==id));clm('modal-adet');toast('🗑️ Alumno eliminado');markDirty();renderAlumnos();};
 openMod('modal-adet');
}

// ═══════════════════ EVENTO ACTIONS ════════════════════════════
function popTiposEvento(){
 const cfg=gCfg();
 const s=el('etipo');if(!s)return;
 s.innerHTML=cfg.tipos_evento.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('');
}
function onEvActChange(){
 const act=el('eact').value;
 // Auto-completar título
 if(act&&(!el('etit').value||el('etit').dataset.auto==='1')){
  el('etit').value=act;el('etit').dataset.auto='1';
 }
 // Auto-seleccionar alumnos que tienen ingreso con esta actividad
 if(act){
  const alumnosConAct=gE().filter(e=>e.actividad===act&&e.alumnoId).map(e=>e.alumnoId);
  const unique=[...new Set(alumnosConAct)];
  _evSelIds=new Set(unique);
  renderAlEventResults(el('eal-search')?.value||'');
 }
}
let _evSelIds=new Set();
function filterAlEvent(){
 const q=(el('eal-search').value||'').toLowerCase().trim();
 renderAlEventResults(q);
}
function renderAlEventResults(q){
 const alms=gAl();
 const filtered=q?alms.filter(a=>{
  const nameMatch=(a.nombre+' '+(a.apellidos||'')).toLowerCase().includes(q);
  const actMatch=gE().some(e=>e.alumnoId===a.id&&(e.actividad||'').toLowerCase().includes(q));
  return nameMatch||actMatch;
 }):alms;
 el('eal-results').innerHTML=filtered.length?filtered.map(a=>{
  const sel=_evSelIds.has(a.id);
  const actH=gE().filter(e=>e.alumnoId===a.id).map(e=>e.actividad).filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,2).join(', ');
  return `<div class="msi${sel?' sel':''}" onclick="togEvAl('${a.id}')" data-id="${a.id}">
   <input type="checkbox" ${sel?'checked':''} style="accent-color:var(--t);pointer-events:none">
   <div style="flex:1;min-width:0"><div style="font-size:13.5px;font-weight:700">${esc(a.nombre+(a.apellidos?' '+a.apellidos:''))}</div>${actH?`<div style="font-size:11px;color:var(--txmu)">${esc(actH)}</div>`:''}</div>
  </div>`;
 }).join(''):'<div style="padding:10px;font-size:13px;color:var(--txmu);text-align:center">Sin resultados</div>';
 renderEvChips();
}
function togEvAl(id){
 if(_evSelIds.has(id))_evSelIds.delete(id);else _evSelIds.add(id);
 renderAlEventResults(el('eal-search')?.value||'');
}
function renderEvChips(){
 const alms=gAl();
 const chips=[..._evSelIds].map(id=>{const a=alms.find(x=>x.id===id);return a?`<span style="display:inline-flex;align-items:center;gap:4px;background:var(--tl);color:var(--tdd);border-radius:var(--rp);padding:3px 9px;font-size:12px;font-weight:700">${esc(a.nombre)}<button style="background:none;border:none;color:var(--tdd);cursor:pointer;font-size:14px;line-height:1;padding:0 0 0 2px" onclick="togEvAl('${id}')">×</button></span>`:''}).filter(Boolean);
 el('eal-chips').innerHTML=chips.join('');
}
function getSAlm(){return[..._evSelIds];}
function openEvModal(fecha){
 eEvId=null;_evSelIds=new Set();
 el('mevh').textContent='Nuevo evento';
 if(el('etit')){el('etit').value='';el('etit').dataset.auto='0';}
 el('ecol').value='#7ECEC4';
 el('efec').value=fecha||new Date().toISOString().slice(0,10);el('eff').value='';el('ehi').value='09:00';el('ehf').value='10:00';el('enot').value='';el('erec').value='';el('erec-opts').style.display='none';
 el('ealch').checked=false;el('eal-opts').style.display='none';el('ealfd').value=fecha||new Date().toISOString().slice(0,10);
 const ea=el('eact');ea.innerHTML='<option value="">Sin vincular</option>';gCfg().actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;ea.appendChild(o);});
 popTiposEvento();
 if(el('eal-search'))el('eal-search').value='';
 renderAlEventResults('');
 el('modal-ev').classList.add('open');
}
function editEv(id){
 eEvId=id;const ev=gEv().find(e=>e.id===id);if(!ev)return;
 _evSelIds=new Set(ev.alumnosIds||[]);
 el('mevh').textContent='Editar evento';
 if(el('etit')){el('etit').value=ev.titulo||'';el('etit').dataset.auto='0';}
 el('ecol').value=ev.color||'#7ECEC4';el('efec').value=ev.fecha||'';el('eff').value=ev.fechaFin||'';el('ehi').value=ev.horaInicio||'09:00';el('ehf').value=ev.horaFin||'10:00';
 const ea=el('eact');ea.innerHTML='<option value="">Sin vincular</option>';gCfg().actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;ea.appendChild(o);});ea.value=ev.actividad||'';
 popTiposEvento();if(el('etipo'))el('etipo').value=ev.tipo||gCfg().tipos_evento[0]||'Taller';
 el('enot').value=ev.notas||'';const rc=ev.recurrencia;el('erec').value=rc?.tipo||'';if(rc){el('eri').value=rc.intervalo||1;el('ere').value=rc.fechaFin||'';}el('erec-opts').style.display=rc?.tipo?'block':'none';el('ealch').checked=false;el('eal-opts').style.display='none';
 if(el('eal-search'))el('eal-search').value='';
 renderAlEventResults('');
 el('modal-ev').classList.add('open');
}
function delEv(id){if(!confirm('¿Eliminar este evento?'))return;sEv(gEv().filter(e=>e.id!==id));toast('🗑️ Evento eliminado');markDirty();renderCal();}
function toggleRec(){el('erec-opts').style.display=el('erec').value?'block':'none';}
function toggleAlF(){el('eal-opts').style.display=el('ealch').checked?'block':'none';}
function saveEv(){
 const act=el('eact').value||null;
 let tit=(el('etit').value||'').trim();
 if(!tit&&act)tit=act;
 if(!tit){toast('⚠️ Selecciona actividad o escribe un título');return;}
 const fec=el('efec').value;if(!fec){toast('⚠️ Selecciona una fecha');return;}
 const rt=el('erec').value;
 const alumnosIds=getSAlm();
 const existingEv=eEvId?gEv().find(e=>e.id===eEvId):null;
 const ev={id:eEvId||gid(),titulo:tit,tipo:el('etipo')?.value||gCfg().tipos_evento[0]||'Taller',color:el('ecol').value,fecha:fec,fechaFin:el('eff').value||null,horaInicio:el('ehi').value,horaFin:el('ehf').value,actividad:act,alumnosIds,notas:el('enot').value.trim(),recurrencia:rt?{tipo:rt,intervalo:parseInt(el('eri').value)||1,fechaFin:el('ere').value||null}:null,dayOverrides:existingEv?.dayOverrides||{}};
 const evs=gEv();
 if(eEvId){const i=evs.findIndex(e=>e.id===eEvId);if(i>=0)evs[i]=ev;else evs.push(ev);}else evs.push(ev);
 sEv(evs);
 if(el('ealch').checked){const af=el('ealfd').value,ah=el('ealfh').value;if(af){const alts=gAlt();const newAlt={id:gid(),eventoId:ev.id,titulo:tit,cat:'act',fecha:af,hora:ah,desc:'Evento: '+tit,estado:'pendiente'};alts.push(newAlt);sAlt(alts);if(el('eics')?.checked)setTimeout(()=>dlICS(newAlt.id),200);}}
 eEvId=null;clm('modal-ev');toast('✅ Evento guardado');markDirty();renderCal();updateAlertBadge();
}

// ═══════════════════ NOTA ACTIONS ══════════════════════════════
function saveNota(){
 const tit=el('ntit').value.trim();if(!tit){toast('⚠️ Escribe el título');return;}
 const nt={id:eNtId||gid(),titulo:tit,texto:el('ntxt').value.trim(),prioridad:el('nprio').value,fechaCreacion:eNtId?(gNt().find(n=>n.id===eNtId)?.fechaCreacion||new Date().toISOString()):new Date().toISOString(),enlaceTipo:el('nenlt').value||null,enlaceId:el('nenlv')?.value||null};
 const nts=gNt();if(eNtId){const i=nts.findIndex(n=>n.id===eNtId);if(i>=0)nts[i]=nt;else nts.push(nt);}else nts.push(nt);
 sNt(nts);eNtId=null;clm('modal-nota');toast('✅ Nota guardada');markDirty();renderNotas();
}
function showNota(id){
 const n=gNt().find(x=>x.id===id);if(!n)return;
 el('ndth').textContent=n.titulo;
 el('ndet-body').innerHTML=`<div style="font-size:14px;line-height:1.65;white-space:pre-wrap;color:var(--txt);margin-bottom:12px">${esc(n.texto||'(sin contenido)')}</div><div style="font-size:12px;color:var(--txmu);font-weight:600">${fDate(n.fechaCreacion)}${n.enlaceTipo&&n.enlaceTipo!=='libre'?' · Enlazado: '+n.enlaceTipo:''}</div>`;
 el('nedit-btn').onclick=()=>{clm('modal-ndet');editNota(id);};
 el('ndel-btn').onclick=()=>{if(!confirm('¿Eliminar nota?'))return;sNt(gNt().filter(x=>x.id!==id));clm('modal-ndet');toast('🗑️ Nota eliminada');markDirty();renderNotas();};
 openMod('modal-ndet');
}
function editNota(id){
 eNtId=id;const n=gNt().find(x=>x.id===id);if(!n)return;
 el('mnh').textContent='Editar nota';el('ntit').value=n.titulo||'';el('ntxt').value=n.texto||'';el('nprio').value=n.prioridad||'media';el('nenlt').value=n.enlaceTipo||'';updateNotaEnlace();openMod('modal-nota');
}
function updateNotaEnlace(){
 const t=el('nenlt').value;el('nenlr').style.display=t&&t!=='libre'?'block':'none';if(!t)return;
 const s=el('nenlv');s.innerHTML='<option value="">Selecciona…</option>';
 if(t==='alumno')gAl().forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.nombre+(a.apellidos?' '+a.apellidos:'');s.appendChild(o);});
 else if(t==='actividad')gCfg().actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;s.appendChild(o);});
 else if(t==='gasto')gCfg().gastos.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;s.appendChild(o);});
}

// ═══════════════════ ALERTA ACTIONS ════════════════════════════
function saveAlerta(){
 const titulo=el('alt-titulo').value.trim();if(!titulo){toast('⚠️ Escribe la acción pendiente');return;}
 const fecha=el('alt-fecha').value;if(!fecha){toast('⚠️ Selecciona una fecha');return;}
 const alt={id:gid(),titulo,cat:el('alt-cat').value,fecha,hora:el('alt-hora').value||'',desc:el('alt-desc').value.trim(),estado:'pendiente'};
 const alts=gAlt();alts.push(alt);sAlt(alts);
 if(el('alt-ics')?.checked)setTimeout(()=>dlICS(alt.id),200);
 clm('modal-alerta');toast('🔔 Alerta creada');markDirty();updateAlertBadge();
 if(cTab==='asistente'&&asiTab==='alt')rAltCats();
}
function actAl(id,est){
 const al=gAlt();const i=al.findIndex(a=>a.id===id);if(i>=0){al[i].estado=est;sAlt(al);}
 updateAlertBadge();toast(est==='aceptada'?'✅ Alerta completada':'✕ Alerta cancelada');
 if(cTab==='asistente'&&asiTab==='alt')rAltCats();
 if(el('ao').classList.contains('open'))rAlertas();
}
function openPP(id){ePpId=id;const n=new Date();n.setDate(n.getDate()+1);el('pp-dt').value=n.toISOString().slice(0,16);el('ppbox').classList.add('open');}
function closePP(){el('ppbox').classList.remove('open');ePpId=null;}
function confirmPP(){
 if(!ePpId)return;const dt=el('pp-dt').value;if(!dt){toast('⚠️ Selecciona fecha');return;}
 const al=gAlt();const i=al.findIndex(a=>a.id===ePpId);
 if(i>=0){al[i].fecha=dt.slice(0,10);al[i].hora=dt.slice(11,16);}
 sAlt(al);closePP();toast('⏰ Alerta pospuesta');updateAlertBadge();
 if(cTab==='asistente'&&asiTab==='alt')rAltCats();
}
function dlICS(id){
 const a=gAlt().find(x=>x.id===id);if(!a)return;
 const dt=(a.fecha.replace(/-/g,''))+'T'+(a.hora||'0900').replace(':','')+'00';
 const ic=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//La Mar de Salaos//ES\nBEGIN:VEVENT\nDTSTART:${dt}\nDTEND:${dt}\nSUMMARY:${(a.titulo).replace(/,/g,'\\,')}\nDESCRIPTION:Alerta La Mar de Salaos\nEND:VEVENT\nEND:VCALENDAR`;
 const blob=new Blob([ic],{type:'text/calendar'});const lnk=document.createElement('a');lnk.href=URL.createObjectURL(blob);lnk.download='alerta-lamar.ics';lnk.click();toast('📅 .ics descargado para el Calendario');
}
function updateAlertBadge(){
 const count=gAlt().filter(a=>a.estado==='pendiente'&&new Date(a.fecha+'T'+(a.hora||'00:00'))<=new Date(Date.now()+86400000)).length;
 el('adot').style.display=count>0?'block':'none';
 const nb=el('nb-inicio');if(nb){const unpaid=getUnpaidAlerts().length+count;nb.textContent=unpaid;nb.className='nbadge'+(unpaid>0?' show':'');}
}

// ═══════════════════ ALERTAS QUICK PANEL ═══════════════════════
function openAlertas(){el('ao').classList.add('open');rAlertas();}
function closeAlertas(){el('ao').classList.remove('open');}
function closeAlertasOut(e){if(e.target===el('ao'))closeAlertas();}
function rAlertas(){
 const all=gAlt().filter(a=>a.estado==='pendiente').sort((a,b)=>a.fecha.localeCompare(b.fecha));
 el('ao-list').innerHTML=all.length?all.map(a=>{const cat=ALT_CATS[a.cat||'fin'];return`<div style="background:var(--cr);border-radius:var(--rs);padding:11px;margin-bottom:8px;border:1.5px solid var(--bdr)"><div style="font-size:13.5px;font-weight:800;color:var(--txt);margin-bottom:3px">${cat?.ic||'🔔'} ${esc(a.titulo)}</div><div style="font-size:11.5px;color:var(--txmu);font-weight:600;margin-bottom:7px">📅 ${esc(a.fecha)} ${a.hora?'⏰ '+a.hora:''} · ${cat?.lbl||'General'}</div><div style="display:flex;gap:5px;flex-wrap:wrap"><button class="btn bok2 btn-xs" onclick="actAl('${a.id}','aceptada')">✓ Hecha</button><button class="btn bg btn-xs" onclick="openPP('${a.id}')">⏰ Posponer</button><button class="btn bdr2 btn-xs" onclick="actAl('${a.id}','cancelada')">✕</button><button class="btn bg btn-xs" onclick="dlICS('${a.id}')">📅 .ics</button></div></div>`}).join(''):'<div class="empty"><div class="empty-i">✅</div><div class="empty-t">Sin alertas pendientes</div></div>';
}

// ═══════════════════ CHART MODAL ACTIONS ═══════════════════════
function buildVG(sel){el('chvars').innerHTML=aVars().map(v=>`<label class="vc${sel.includes(v.k)?' on':''}"><input type="checkbox" class="vck" value="${esc(v.k)}" ${sel.includes(v.k)?'checked':''} onchange="this.parentElement.classList.toggle('on',this.checked)"> ${esc(v.l)}</label>`).join('');}
function saveChart(){
 const tit=el('cht').value.trim()||'Sin título',tp=el('chtp').value,mo=parseInt(el('chmo').value)||6;
 const vs=[...document.querySelectorAll('.vck:checked')].map(c=>c.value);
 if(!vs.length){toast('⚠️ Selecciona al menos una variable');return;}
 const cs=gAC();
 if(eChId){const i=cs.findIndex(c=>c.id===eChId);if(i>=0)cs[i]={...cs[i],title:tit,type:tp,months:mo,variables:vs};}
 else cs.push({id:gid(),title:tit,type:tp,months:mo,variables:vs});
 sAC(cs);eChId=null;clm('modal-chart');toast('✅ Gráfica guardada');markDirty();rAdvGal();
}
function editAdv(id){eChId=id;const c=gAC().find(x=>x.id===id);if(!c)return;el('mch').textContent='Editar gráfica';el('cht').value=c.title||'';el('chtp').value=c.type||'bar';el('chmo').value=c.months||6;buildVG(c.variables||[]);openMod('modal-chart');}
function delAdv(id){if(!confirm('¿Eliminar esta gráfica?'))return;dc('adv-'+id);sAC(gAC().filter(c=>c.id!==id));toast('🗑️');markDirty();rAdvGal();}

// ═══════════════════ SELECTS REBUILD ═══════════════════════════
function rebSel(){
 const cfg=gCfg();
 ['ing-act','aaf','eact'].forEach(id=>{
  const s=el(id);if(!s)return;const p=s.value;
  s.innerHTML=id==='eact'?'<option value="">Sin vincular</option>':'<option value="">Selecciona…</option>';
  cfg.actividades.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a;s.appendChild(o);});
  if(p)s.value=p;
 });
 const gs=el('gco');if(gs){gs.innerHTML='<option value="">Selecciona…</option>';cfg.gastos.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;gs.appendChild(o);});}
 const te=el('etipo');if(te){const prev=te.value;te.innerHTML=(cfg.tipos_evento||DTIPOS).map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('');if(prev)te.value=prev;}
}

// ═══════════════════ CONFIG PANEL ══════════════════════════════
function toggleCfg(){
 el('co2').classList.toggle('open');
 if(el('co2').classList.contains('open'))rCfg();
}
function closeCfgOut(e){if(e.target===el('co2'))toggleCfg();}
function rCfg(){
 const cfg=gCfg();
 const uA=new Set(gE().map(e=>e.actividad));
 const uG=new Set(gG().map(g=>g.concepto));
 // Actividades
 el('cl-act').innerHTML=cfg.actividades.map(a=>`<div class="cli"><span class="clin">${esc(a)}</span>${uA.has(a)?'<span title="En uso" style="color:var(--txmu);font-size:13px">🔒</span>':`<button class="btn bdr2 btn-xs" onclick="delAct('${esc(a)}')">✕</button>`}</div>`).join('');
 // Tipos de evento
 const clTipos=el('cl-tipos');
 if(clTipos)clTipos.innerHTML=(cfg.tipos_evento||DTIPOS).map(t=>`<div class="cli"><span class="clin">${esc(t)}</span><button class="btn bdr2 btn-xs" onclick="delTipo('${esc(t)}')">✕</button></div>`).join('');
 // Max niños/día
 const mnd=el('max-ninos-dia');if(mnd)mnd.value=cfg.max_ninos_dia||20;
 // Gastos
 el('cl-gast').innerHTML=cfg.gastos.map(c=>`<div class="cli"><span class="clin">${esc(c)}</span>${uG.has(c)?'<span title="En uso" style="color:var(--txmu);font-size:13px">🔒</span>':`<button class="btn bdr2 btn-xs" onclick="delConc('${esc(c)}')">✕</button>`}</div>`).join('');
 // Categorías NMN
 el('cfg-cats').innerHTML=cfg.actividades.map(a=>`<div class="cat-row"><span class="cat-row-n">${esc(a)}</span><select onchange="setCat('${esc(a)}',this.value)">${CATS.map(c=>`<option value="${c}" ${(cfg.cats[a]||'otro')===c?'selected':''}>${CLBL[c]}</option>`).join('')}</select></div>`).join('');
 // Pesos NMN
 const wts=cfg.wts||DWTS;
 el('cfg-wts').innerHTML=CATS.filter(c=>c!=='otro').map(c=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><label style="font-size:12.5px;font-weight:700;flex:1">${CLBL[c]}</label><input type="number" id="wt-${c}" value="${Math.round((wts[c]||0)*100)}" min="0" max="100" step="5" style="width:60px;padding:6px 8px;border:1.5px solid var(--bdr);border-radius:9px;font-family:inherit;font-size:13px;font-weight:700;text-align:right;height:var(--tap-sm)">%</div>`).join('');
 // NMN objetivo
 el('nmn-obj').value=cfg.nmn_obj||20;
 // Vista
 const vm=gSet('vm')||'desktop';
 el('vtd').classList.toggle('active',vm==='desktop');
 el('vtm').classList.toggle('active',vm!=='desktop');
 // DB status
 el('ddot').className='ddot '+(dbFH?'on':'off');
 el('dbstxt').textContent=dbFH?'Vinculada — auto-guardado cada 2 min':'Sin vincular — datos en navegador';
 const ts1=el('db-save-ts');if(ts1)ts1.textContent='💾 Último guardado: '+(_lastSaveTs||gSet('last_save_ts')||'—');
 const ts2=el('db-bkp-ts');if(ts2)ts2.textContent='📄 Último backup: '+(_lastBkpTs||gSet('last_bkp_ts')||'—');
 // API key
 const key=getApiKey();
 if(el('cfg-apikey'))el('cfg-apikey').value=key?'•'.repeat(20):'';
 el('apikey-status').textContent=key?'✅ Clave Claude configurada — IA activa':'⚠️ Sin clave Claude — función IA desactivada';
 el('apikey-status').style.color=key?'var(--ok)':'var(--co)';
 // OpenAI
 const oaiKey=getOpenAIKey();
 if(el('cfg-openai'))el('cfg-openai').value=oaiKey?'•'.repeat(20):'';
 if(el('openai-status')){el('openai-status').textContent=oaiKey?'✅ Clave ChatGPT configurada':'⚪ Sin clave ChatGPT';el('openai-status').style.color=oaiKey?'var(--ok)':'var(--txmu)';}
 // Pref IA
 const pref=getDayIAPref();
 ['claude','chatgpt'].forEach(p=>{
  const el2=el('ia-opt-'+p);if(!el2)return;
  el2.style.borderColor=p===pref?'var(--t)':'var(--bdr)';
  el2.style.background=p===pref?'var(--tll)':'var(--wh)';
  const rb=el2.querySelector('input[type=radio]');if(rb)rb.checked=p===pref;
 });
}
const getOpenAIKey=()=>gSet('openai_key')||'';
const getDayIAPref=()=>gSet('ia_day_pref')||'claude';
function saveApiKey(){
 const v=el('cfg-apikey').value.trim();
 if(!v||v.startsWith('•')){toast('⚠️ Escribe la clave API');return;}
 sSet('apikey',v);el('cfg-apikey').value='•'.repeat(20);
 el('apikey-status').textContent='✅ Clave Claude guardada — IA activa';
 el('apikey-status').style.color='var(--ok)';
 toast('✅ API Key Claude guardada');
}
function saveOpenAIKey(){
 const v=el('cfg-openai')?.value.trim();
 if(!v||v.startsWith('•')){toast('⚠️ Escribe la clave OpenAI');return;}
 sSet('openai_key',v);if(el('cfg-openai'))el('cfg-openai').value='•'.repeat(20);
 if(el('openai-status')){el('openai-status').textContent='✅ Clave ChatGPT guardada';el('openai-status').style.color='var(--ok)';}
 toast('✅ API Key ChatGPT guardada');
}
function setIAPref(pref){
 sSet('ia_day_pref',pref);
 ['claude','chatgpt'].forEach(p=>{
  const el2=el('ia-opt-'+p);if(!el2)return;
  el2.style.borderColor=p===pref?'var(--t)':'var(--bdr)';
  el2.style.background=p===pref?'var(--tll)':'var(--wh)';
  const rb=el2.querySelector('input[type=radio]');if(rb)rb.checked=p===pref;
 });
 toast(pref==='claude'?'🤖 Claude seleccionado como IA por defecto':'🟢 ChatGPT seleccionado como IA por defecto');
}
function setDayIAPref(pref,ds){
 sSet('ia_day_pref',pref);
 const cBtn=el('ia-day-claude-'+ds),gBtn=el('ia-day-gpt-'+ds);
 if(cBtn){cBtn.style.borderColor=pref==='claude'?'var(--t)':'var(--bdr)';cBtn.style.background=pref==='claude'?'var(--tll)':'var(--wh)';cBtn.style.color=pref==='claude'?'var(--tdd)':'var(--txm)';}
 if(gBtn){gBtn.style.borderColor=pref==='chatgpt'?'var(--ok)':'var(--bdr)';gBtn.style.background=pref==='chatgpt'?'var(--okl)':'var(--wh)';gBtn.style.color=pref==='chatgpt'?'#1a6b30':'var(--txm)';}
}
function setView(v){
 sSet('vm',v);
 document.body.classList.toggle('vd',v==='desktop');
 el('vtd').classList.toggle('active',v==='desktop');
 el('vtm').classList.toggle('active',v!=='desktop');
 toast(v==='desktop'?'🖥 Vista escritorio':'📱 Vista móvil');
}
function addAct(){
 const v=el('ci-act').value.trim();if(!v)return;
 const cfg=gCfg();
 if(cfg.actividades.includes(v)){toast('⚠️ Ya existe');return;}
 cfg.actividades.push(v);if(!cfg.cats[v])cfg.cats[v]='otro';
 sCfg(cfg);el('ci-act').value='';rCfg();rebSel();toast('✅ Actividad añadida');markDirty();
}
function delAct(n){
 if(gE().some(e=>e.actividad===n)){toast('🔒 En uso — no se puede eliminar');return;}
 if(!confirm(`¿Eliminar "${n}"?`))return;
 const cfg=gCfg();cfg.actividades=cfg.actividades.filter(a=>a!==n);delete cfg.cats[n];
 sCfg(cfg);rCfg();rebSel();toast('🗑️ Actividad eliminada');markDirty();
}
function addTipo(){
 const v=el('ci-tipo').value.trim();if(!v)return;
 const cfg=gCfg();
 if(!cfg.tipos_evento)cfg.tipos_evento=DTIPOS.slice();
 if(cfg.tipos_evento.includes(v)){toast('⚠️ Ya existe');return;}
 cfg.tipos_evento.push(v);sCfg(cfg);el('ci-tipo').value='';rCfg();toast('✅ Tipo añadido');markDirty();
}
function delTipo(n){
 if(!confirm(`¿Eliminar tipo "${n}"?`))return;
 const cfg=gCfg();if(!cfg.tipos_evento)return;
 cfg.tipos_evento=cfg.tipos_evento.filter(t=>t!==n);
 sCfg(cfg);rCfg();toast('🗑️ Tipo eliminado');markDirty();
}
function saveMaxNinos(){
 const v=parseInt(el('max-ninos-dia').value)||20;
 const cfg=gCfg();cfg.max_ninos_dia=v;sCfg(cfg);
 toast('✅ Máximo '+v+' niños/día guardado');markDirty();if(cTab==='agenda')renderCal();
}
function normalizarTelefonos(){
 const alms=gAl();let count=0;
 alms.forEach(a=>{
  if(a.telefono){
   const clean=a.telefono.replace(/[\s\-\.\(\)\/\\]/g,'');
   if(clean!==a.telefono){a.telefono=clean;count++;}
  }
 });
 sAl(alms);markDirty();
 const res=el('wa-norm-result');
 if(res){res.textContent=count>0?`✅ ${count} número${count!==1?'s':''} normalizados correctamente`:'✅ Todos los números ya estaban en formato correcto';res.style.color=count>0?'var(--ok)':'var(--txmu)';}
 toast(count>0?`📲 ${count} contactos actualizados`:'📲 Contactos ya estaban actualizados');
 if(cTab==='alumnos')renderAlumnos();
}
function addConc(){
 const v=el('ci-gast').value.trim();if(!v)return;
 const cfg=gCfg();
 if(cfg.gastos.includes(v)){toast('⚠️ Ya existe');return;}
 cfg.gastos.push(v);sCfg(cfg);el('ci-gast').value='';rCfg();rebSel();toast('✅ Concepto añadido');markDirty();
}
function delConc(n){
 if(gG().some(g=>g.concepto===n)){toast('🔒 En uso — no se puede eliminar');return;}
 if(!confirm(`¿Eliminar "${n}"?`))return;
 const cfg=gCfg();cfg.gastos=cfg.gastos.filter(c=>c!==n);
 sCfg(cfg);rCfg();rebSel();toast('🗑️ Concepto eliminado');markDirty();
}
function setCat(a,c){const cfg=gCfg();cfg.cats[a]=c;sCfg(cfg);markDirty();}
function saveWts(){
 const cfg=gCfg();let tot=0;
 CATS.filter(c=>c!=='otro').forEach(c=>{
  const inp=document.getElementById('wt-'+c);
  if(inp){const v=parseInt(inp.value)||0;cfg.wts[c]=v/100;tot+=v;}
 });
 if(tot>100){toast('⚠️ Los pesos suman más del 100%');return;}
 sCfg(cfg);toast('✅ Pesos guardados');markDirty();
 if(cTab==='analisis')rNMN();
}
function saveNmnObj(){
 const v=parseInt(el('nmn-obj').value)||20;
 const cfg=gCfg();cfg.nmn_obj=v;sCfg(cfg);
 toast('✅ Objetivo: '+v+' alumnos');markDirty();render();
}

// ═══════════════════ FILE SYSTEM + BACKUP ══════════════════════
let dbFH=null,dbDH=null,_dirty=false,_lastSaveTs=null,_lastBkpTs=null;

// ── IndexedDB helpers para persistir el DirectoryHandle entre sesiones ──
function idbReq(mode,fn){
 return new Promise((res,rej)=>{
  const r=indexedDB.open('lmds_handles',1);
  r.onupgradeneeded=e=>e.target.result.createObjectStore('h');
  r.onsuccess=e=>{try{const tx=e.target.result.transaction('h',mode);fn(tx.objectStore('h'),res,rej);tx.onerror=()=>rej(tx.error);}catch(err){rej(err);}};
  r.onerror=()=>rej(r.error);
 });
}
const saveDHtoIDB=dh=>idbReq('readwrite',(s,res)=>{const r=s.put(dh,'dirHandle');r.onsuccess=()=>res(true);});
const getDHfromIDB=()=>idbReq('readonly',(s,res,rej)=>{const r=s.get('dirHandle');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
const delDHfromIDB=()=>idbReq('readwrite',(s,res)=>{const r=s.delete('dirHandle');r.onsuccess=()=>res(true);});

// Intentar restaurar la BD vinculada al arrancar (sin interacción si el permiso ya está concedido)
async function tryRestoreDB(){
 try{
  const dh=await getDHfromIDB();
  if(!dh)return;
  const perm=await dh.queryPermission({mode:'readwrite'});
  if(perm==='granted'){
   await _activateDB(dh,false);
  } else {
   // Mostrar banner de reconexión (requiere 1 clic del usuario)
   showReconnectBanner(dh);
  }
 }catch(e){console.warn('tryRestoreDB:',e);}
}
function showReconnectBanner(dh){
 if(el('reconnect-banner'))return;
 const b=document.createElement('div');b.id='reconnect-banner';
 b.style.cssText='position:fixed;top:0;left:0;right:0;z-index:500;background:var(--co);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:8px 14px;font-size:13px;font-weight:700;gap:10px';
 b.innerHTML=`<span>💾 BD desvinculada — haz clic para reconectar</span><div style="display:flex;gap:8px"><button style="background:rgba(255,255,255,.25);border:none;color:#fff;padding:5px 12px;border-radius:8px;cursor:pointer;font-weight:800;font-family:inherit" onclick="reconnectDB()">🔗 Reconectar</button><button style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;padding:0 4px" onclick="this.parentElement.parentElement.remove()">×</button></div>`;
 document.body.appendChild(b);
 // Guardar el handle pendiente en una var temporal para usarlo en reconnectDB
 window._pendingDH=dh;
}
async function reconnectDB(){
 const dh=window._pendingDH;if(!dh){linkDB();return;}
 try{
  const perm=await dh.requestPermission({mode:'readwrite'});
  if(perm==='granted'){
   await _activateDB(dh,true);
   el('reconnect-banner')?.remove();
   window._pendingDH=null;
  } else {
   toast('⚠️ Permiso denegado — vincula manualmente desde Config');
  }
 }catch(e){toast('❌ '+e.message);}
}
async function _activateDB(dh,loadFromFile){
 dbDH=dh;
 try{
  dbFH=await dh.getFileHandle('BBDD.json',{create:true});
  if(loadFromFile){
   try{
    const file=await dbFH.getFile(),text=await file.text();
    if(text.trim()){const data=JSON.parse(text);loadAll(data);rebSel();render();}
    toast('✅ BD reconectada y datos cargados');
   }catch{toast('✅ BD reconectada');}
  } else {
   toast('✅ BD reconectada automáticamente');
  }
 }catch(e){toast('✅ BD reconectada (BBDD.json se creará al guardar)');}
 _lastSaveTs=gSet('last_save_ts')||null;_lastBkpTs=gSet('last_bkp_ts')||null;
 rCfg();
}

async function linkDB(){
 if(!('showDirectoryPicker' in window)){toast('⚠️ Usa Chrome/Edge en Mac/PC para vinculación automática');return;}
 try{
  const dh=await window.showDirectoryPicker({mode:'readwrite'});
  dbDH=dh;
  // Guardar en IndexedDB para persistencia entre sesiones
  await saveDHtoIDB(dh);
  try{
   dbFH=await dh.getFileHandle('BBDD.json');
   const file=await dbFH.getFile(),text=await file.text();
   const data=JSON.parse(text);
   if(confirm('✅ BBDD.json encontrado. ¿Cargar sus datos?\n(Cancelar para mantener datos actuales)')){
    loadAll(data);rebSel();render();rCfg();toast('✅ BD vinculada y datos cargados');
   }else toast('✅ BD vinculada — datos actuales mantenidos');
  }catch(e2){
   dbFH=await dh.getFileHandle('BBDD.json',{create:true});
   toast('✅ Carpeta vinculada — BBDD.json creado');
  }
  _lastSaveTs=gSet('last_save_ts')||null;_lastBkpTs=gSet('last_bkp_ts')||null;
  rCfg();
 }catch(e){if(e.name!=='AbortError')toast('❌ '+e.message);}
}
async function unlinkDB(){
 dbFH=null;dbDH=null;
 await delDHfromIDB().catch(()=>{});
 window._pendingDH=null;el('reconnect-banner')?.remove();
 rCfg();toast('⛓ Base de datos desvinculada');
}
async function saveNow(){
 if(!dbFH){toast('⚠️ Vincula primero una carpeta con BBDD.json');return;}
 const data=JSON.stringify(getAllData(),null,2);
 try{
  const w=await dbFH.createWritable();await w.write(data);await w.close();
  _lastSaveTs=new Date().toLocaleString('es-ES');sSet('last_save_ts',_lastSaveTs);
  if(dbDH){
   try{
    const bkpFH=await dbDH.getFileHandle('BBDD_bkp.json',{create:true});
    const w2=await bkpFH.createWritable();await w2.write(data);await w2.close();
    _lastBkpTs=new Date().toLocaleString('es-ES');sSet('last_bkp_ts',_lastBkpTs);
   }catch(be){console.warn('backup:',be);}
  }
  _dirty=false;
  const ts=el('db-save-ts');if(ts)ts.textContent='💾 Último guardado: '+_lastSaveTs;
  const tb=el('db-bkp-ts');if(tb)tb.textContent='📄 Último backup: '+(_lastBkpTs||'—');
  toast('💾 BD guardada');rCfg();
 }catch(e){toast('❌ Error al guardar: '+e.message);}
}
let _lastAutoSave=0;
async function autoSave(){markDirty();}
function markDirty(){_dirty=true;}
// Intervalo 2 min — sólo guarda si hay BD vinculada y hay cambios
setInterval(async()=>{if(_dirty&&dbFH){await saveNow();}},120000);
function backupData(){
 const b=new Blob([JSON.stringify(getAllData(),null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(b);
 a.download='LaMarSalaos_bkp_'+new Date().toISOString().slice(0,10)+'.json';
 a.click();toast('💾 Copia descargada');
}
function restoreData(ev){
 const f=ev.target.files[0];if(!f)return;
 const r=new FileReader();
 r.onload=e=>{
  try{
   const d=JSON.parse(e.target.result);
   if(!confirm('¿Restaurar datos? Se sobreescribirá todo.'))return;
   loadAll(d);rebSel();render();toast('✅ Datos restaurados');
  }catch(err){toast('❌ Error al leer: '+err.message);}
 };
 r.readAsText(f);ev.target.value='';
}

// ═══════════════════ TOAST ═════════════════════════════════════
let _toastTimer;
function toast(msg){
 const t=el('toast');
 t.textContent=msg;t.classList.add('show');
 clearTimeout(_toastTimer);
 _toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

// ═══════════════════ INIT ══════════════════════════════════════
function init(){
 // Aplicar vista
 // V10: en el PRIMER arranque de este dispositivo (sin preferencia
 // guardada todavía) se detecta solo si es un móvil y arranca ya en
 // modo Móvil. Si Ana ya eligió una vista antes, esa elección manda
 // siempre — esto no toca nada si ya se usó la app en este aparato.
 let vm=gSet('vm');
 if(vm===null||vm===undefined){
  vm=(window.innerWidth<820||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))?'mobile':'desktop';
  sSet('vm',vm);
 }
 document.body.classList.toggle('vd',vm==='desktop');

 // Rebuild selects
 rebSel();

 // Fechas por defecto en modales
 const today=new Date().toISOString().slice(0,10);
 if(el('efec'))el('efec').value=today;
 if(el('ealfd'))el('ealfd').value=today;
 if(el('alt-fecha'))el('alt-fecha').value=today;
 buildVG([]);

 // Poner psel para registro tab
 const regPsel=el('reg-psel');
 if(regPsel)regPsel.style.display='none'; // hidden until registro tab

 // Render inicial
 updateHeader();
 rInicio();
 updateAlertBadge();

 // Cargar feed inicial si vacío
 if(gFeed().length===0){
  setTimeout(()=>{sFeed(getDefaultFeedIdeas());sSet('feed_last',new Date().toISOString());},500);
 }

 // Restaurar timestamps de guardado
 setTimeout(()=>{
  _lastSaveTs=gSet('last_save_ts')||null;
  _lastBkpTs=gSet('last_bkp_ts')||null;
 },500);

 // Intentar reconectar BD vinculada automáticamente
 setTimeout(()=>tryRestoreDB(),800);

 // Listeners globales
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
   document.querySelectorAll('.mo.open,.ao.open,.co2.open').forEach(x=>x.classList.remove('open'));
   el('ppbox')?.classList.remove('open');
  }
 });

 // Swipe left/right para nav (opcional, móvil)
 let tx=0;
 document.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
 document.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx;
  if(Math.abs(dx)<60)return;
  const tabs=['inicio','registro','alumnos','agenda','asistente','analisis'];
  const i=tabs.indexOf(cTab);
  if(dx<0&&i<tabs.length-1)go(tabs[i+1]);
  else if(dx>0&&i>0)go(tabs[i-1]);
 },{passive:true});
}

// psel visibility handled inside go() already

init();

// ═══════════════════ PWA · Fase 1 ═══════════════════════════════
// Registra el Service Worker SOLO si la app se sirve por http(s)
// (no funciona con file:// — para eso está OneDrive/hosting).
// No toca datos ni lógica: únicamente cachea el "cascarón" de la
// app para que abra al instante y se pueda instalar en el móvil.
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',()=>{
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
 });
}
