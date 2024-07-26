const tag = {
  "aisle": document.querySelector( "#tag-aisle" ),
  "bay": document.querySelector( "#tag-bay" ),
  "generate": document.querySelector( "#generate" ),
};

function baytag( aisle , bay ) {
  aisle = `${ aisle }`.toUpperCase().padStart( 2 , "0" );
  bay = `${ bay }`.toUpperCase().padStart( 3 , "0" );

  JsBarcode( "#barcode" , `9809000000-${ aisle }-${ bay }` , {
    background: "#ffff00",
    displayValue: false,
    format: "CODE128",
    height: 100,
    lineColor: "#000000",
    width: 2
  } );

  return { "aisle": aisle , "bay": bay };
}

// aisle.addEventListener( "input" , function( event ) {
//   console.log( event.data );
//   this.format( event.data );
//   baytag( this.value , bay.value );
// } );

// bay.addEventListener( "input" , function( event ) {
//   console.log( event.data );
//   this.format( event.data );
//   baytag( aisle.value , this.value );
// } );

generate.addEventListener( "click" , function() {
  const { aisle , bay } = baytag( tag.aisle.value , tag.bay.value );
  tag.aisle.value = aisle;
  tag.bay.value = bay;
} );

for ( let i = 1; i <= 65; i++ ) {
  for ( let j = 1; j <= 22; j++ ) {
    setTimeout( () => {
      baytag( i , j  );
    } , 16 * i );
  }
}