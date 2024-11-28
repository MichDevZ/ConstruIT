export const formatRUT = (rut: string) => {
    let value = rut.replace(/[^0-9kK]/g, ''); 
    let body = value.slice(0, -1); 
    let dv = value.slice(-1); 
    body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
    return body + (dv ? `-${dv.toUpperCase()}` : ''); 
  }


  export const validarDV = (rut: string) => {
    let suma = 0;
    let multiplo = 2;
    
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
  
    let dvCalculado: string | number = 11 - (suma % 11);
    
    if (dvCalculado === 11) {
      dvCalculado = 0;
    } else if (dvCalculado === 10) {
      dvCalculado = 'K';
    }
  
    return dvCalculado;
  };


  export const isValidRut = (rutCompleto: string) => {

    const regex = /^\d{1,2}(\.\d{3}){2}-[0-9kK]{1}$/;
    
    if (!regex.test(rutCompleto)) {
      return false;
    }
 
    const rutSinFormato = rutCompleto.replace(/\./g, '').replace('-', '');
    const rutNumerico = rutSinFormato.slice(0, -1); 
    const dv = rutSinFormato.slice(-1); 

    const dvCalculado = validarDV(rutNumerico);
    return dv.toUpperCase() === dvCalculado.toString().toUpperCase();
  };