const tag = {
  "aisle": document.querySelector( "#aisle" ),
  "bay": document.querySelector( "#bay" )
};

function formatTag( tag , max ) {
  tag = `${ tag || "" }`.toUpperCase();
  return !isNaN( tag[ 0 ] ) ? tag.padStart( max , "0" ) : tag;
}

function barcode( aisle , bay ) {
  JsBarcode( "#barcode" , `9809000000-${ aisle }-${ bay }` , {
    background: "#ffff00",
    displayValue: false,
    format: "CODE128",
    height: 100,
    lineColor: "#000000",
    width: 2
  } );
}

function baytag( aisle , bay ) {
  aisle = formatTag( aisle , 2 );
  bay = formatTag( bay , 3 );

  barcode( aisle , bay );
}

[ tag.aisle , tag.bay ].forEach( tag => {
  tag.addEventListener( "input" , function( event ) {
    if ( event.inputType.includes( "deleteContentBackward" ) ) {
      this.realValue = this.realValue.substring( 0 , this.realValue.length - 1 );
    } else {
      if ( this.realValue.length < Number( tag.max ) ) this.realValue = ( this.realValue || "" ) + event.data;
    }

    this.value = formatTag( this.realValue , tag.max );

    baytag( ( !this.name.includes( "aisle" ) ? this.previousElementSibling : this ).value , ( !this.name.includes( "bay" ) ? this.nextElementSibling : this ).value );
  } );
} );

[ tag.aisle , tag.bay ].forEach( tag => {
  tag.addEventListener( "click" , function() {
    this.realValue = "";
    this.select();
  } );
} );

for ( let i = 1; i <= 65; i++ ) {
  for ( let j = 1; j <= 22; j++ ) {
    setTimeout( () => {
      baytag( i , j  );
    } , 16 * i );
  }
}