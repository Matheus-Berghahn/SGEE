export const TYPES=['NOTEBOOK','IMPRESSORA','MONITOR','CADEIRA','WEBCAM','DESKTOP','TABLET','CELULAR','REDE','OUTRO'];
export const STATUSES=['disponível','em uso','manutenção','baixado'];
export const ROLES=[{value:'ADMIN',label:'Administrador'},{value:'OPERATOR',label:'Operador'},{value:'VIEWER',label:'Consulta'}];
export const money=(cents:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
export const date=(value:string|null|undefined)=>value?new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(value)):'—';

