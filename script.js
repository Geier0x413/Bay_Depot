alert( "Script loaded!" );

window.addEventListener( "load" , () => {
  JsBarcode( "#barcode" , "9809000000-05-002" , {
    background: "#ff0000",
    displayValue: false,
    format: "CODE128",
    height: 64,
    lineColor: "#000000",
    width: 1
  } );
} );