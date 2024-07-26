function baytag( aisle , bay ) {
  // Add checks for properly formatted aisle and bay 00-000
  JsBarcode( "#barcode" , `9809000000-${ aisle }-${ bay }` , {
    background: "#ffff00",
    displayValue: false,
    format: "CODE128",
    height: 100,
    lineColor: "#000000",
    width: 2
  } );
}

baytag( "05" , "008" );