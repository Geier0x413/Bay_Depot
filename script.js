const tag = {
  "aisle": document.querySelector( "#aisle" ),
  "bay": document.querySelector( "#bay" )
};

// function formatTag( aisle , bay ) {
//   aisle = !isNaN( aisle[ 0 ] ) ? `${ aisle || "" }`.toUpperCase().padStart( 2 , "0" ) : aisle.toUpperCase();
//   bay = !isNaN( bay[ 0 ] ) ? `${ bay || "" }`.toUpperCase().padStart( 3 , "0" ) : bay.toUpperCase();

//   return { "aisle": aisle , "bay": bay };
// }

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

[ tag.aisle , tag.bay ].forEach( tag => {
  tag.addEventListener( "input" , function( event ) {
    if ( event.inputType.includes( "deleteContentBackward" ) ) {
      this.realValue = this.realValue.substring( 0 , this.realValue.length - 1 );
    } else {
      this.realValue = ( this.realValue || "" ) + event.data;
    }

    this.value = `${ this.realValue }`.toUpperCase().padStart( tag.max , "0" );

    baytag( ( !this.name.includes( "aisle" ) ? this.previousElementSibling : this ).value , ( !this.name.includes( "bay" ) ? this.nextElementSibling : this ).value );
  } );
} );

[ tag.aisle , tag.bay ].forEach( tag => {
  tag.addEventListener( "click" , function() {
    this.realValue = "";
    this.select();
  } );
} );

// for ( let i = 1; i <= 65; i++ ) {
//   for ( let j = 1; j <= 22; j++ ) {
//     setTimeout( () => {
//       baytag( i , j  );
//     } , 16 * i );
//   }
// }

baytag( 4 , 5 );