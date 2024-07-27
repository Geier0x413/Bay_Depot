const tag = {
  "aisle": document.querySelector( "#tag-aisle" ),
  "bay": document.querySelector( "#tag-bay" ),
  "generate": document.querySelector( "#generate" ),
};

function baytag( aisle , bay ) {
  aisle = `${ aisle || "" }`.toUpperCase().padStart( 2 , "0" );
  bay = `${ bay || "" }`.toUpperCase().padStart( 3 , "0" );

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

tag.aisle.addEventListener( "input" , function( event ) {
  if ( event.inputType.includes( "deleteContentBackward" ) ) {
    this.realValue = this.realValue.substring( 0 , this.realValue.length - 1 );
  } else {
    this.realValue = ( this.realValue || "" ) + event.data;
  }

  this.value = `${ this.realValue }`.toUpperCase().padStart( 2 , "0" );

  baytag( tag.aisle.value , tag.bay.value );
} );

tag.bay.addEventListener( "input" , function( event ) {
  if ( event.inputType.includes( "deleteContentBackward" ) ) {
    this.realValue = this.realValue.substring( 0 , this.realValue.length - 1 );
  } else {
    this.realValue = ( this.realValue || "" ) + event.data;
  }

  this.value = `${ this.realValue }`.toUpperCase().padStart( 3 , "0" );

  baytag( tag.aisle.value , tag.bay.value );
} );

tag.aisle.addEventListener( "click" , function() { this.select() } );
tag.bay.addEventListener( "click" , function() { this.select() } );

for ( let i = 1; i <= 65; i++ ) {
  for ( let j = 1; j <= 22; j++ ) {
    setTimeout( () => {
      baytag( i , j  );
    } , 16 * i );
  }
}