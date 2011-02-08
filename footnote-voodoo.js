/**
 * JS Footnote Popup
 * Based substantially on code from  http://moronicbajebus.com/blog/footnotepopup/ 
 * Copyright (c) 2009 Seamus P. H. Leahy
 *
 * also Copyright (c) 2010 Lukas Mathis
 * code @ http://ignorethecode.net/blog/2010/04/20/footnotes/
 *
 * also (c) Lance Weaver for combining and tweaking it all together
 *
 * see licence.txt for licence info
 * see readme.text for howto info



 * Now that is done with, how to use this:

 *  Usage
 *  
 *  .footnoteup( [command], [options] )
 *  The footnotepopup method takes two optional parameters. The first
 *  is string that is the command to run, by default the command is 'add'.
 *  The second is an object that passes options to the command.
 *
 *  Commands and their options
 *
 *  "add"
 *    This will add the popups to the elements.
 *    options: popupFilter - A function to modify the popup element: 
 *               function( $popup_element, $footnote_link_element )
 *             appendPopupTo - If set, this will instead add the popup element
 *               to another element specified by appendPopupTo. jQuery object/string selector/DOM elements/etc
 *  
 * "remove"
 *   This removes the popup elements for the footnote link element.
 *   option: none  
 *  
 */



 jQuery(document).ready(function($) {
     jQuery( 'a.footnote' ).footnotepopup( );
 });



jQuery.fn.extend( { "footnotepopup": function( action, options ){
	
	// the actions functions
	var fns = {
		'add': function( options ){
			
			options = jQuery.extend( { 'popupFilter': null, 'appendPopupTo': null }, options );
			
			this.each( function( ){
				
				var $this = jQuery( this );
			       var position = jQuery(this).offset();	// Get the footnote link position
				var hash = this.href.split( '#' ); 	// Get the ID for the footnote
				
				// ensure that the href goes to an anchor on this page
				if( hash.length <= 1 || hash[ 0 ] !=  pageUrl ){
					return; // error, goes to external page or does not have an anchor
				}
				// use .pop to get el-name from http://domain/page#el-name (since we already used split() to split it up
				// why didnt we just use hash.href.slice(search(#));  ???
				hash = hash.pop( );				 // now the hash is the footnote link element ID.. -pop() removes the last element of an array, and returns that element
				
				//jQuery's .data(data-to-set,new-data-value) -complicated.  allows us to attach data of any type to DOM elements in a way that is safe from circular references and mem leaks

				// record keeping  
				$this.data( 'footnotepopup', true ); 
				
				// Wrapper
				$this.wrap( '<span></span>' );
				$this.data( 'footnotepopupWrapper', $this.parent( ) );
				

				//  Figure out where to print the popup on the page -Lance
				
        			var left = position.left-67;	//for some reason we have to -65 (size of outer div?
		//	window.alert('position.left='+left+', jQuery(window).width()='+jQuery(window).width()+', scroll='+jQuery(window).scrollLeft() );
				// [420 = popup legth+ a bit]  if link pos + size of popup > window width then lets move window over 
       			if(left + 380  > jQuery(window).width() + jQuery(window).scrollLeft()){
        			    left = jQuery(window).width() - 550 + jQuery(window).scrollLeft();  // 550 works.. why
				    }
        			var top = position.top;
		//	window.alert('position.top='+top+', jQuery(window).height()='+jQuery(window).height()+', scroll='+jQuery(window).scrollTop() );
        			//if(top + div.height() > jQuery(window).height() + jQuery(window).scrollTop())
         			//   top = position.top - div.height() - 15;


				// copy the content of the footnote into the popup
				var footnoteContent = jQuery( '#'+hash ).html( );
				// somehow add the top and left info?..
				var $footnotePopup = jQuery( '<div class="footnotepopup-popup" style="display:none; position:absolute; left:'+left+'px; ">'+footnoteContent+'</div>' );
				// remove the link from the popup back to the link
				if( this.id ){
					var refFootnote = pageUrl + '#' + this.id;
					$footnotePopup.find( 'a[href="#'+this.id+'"]' ).hide( );
				}
				
				// User option, for where to append the popup 
				var $appendPopupTo = false;

				// none of this works.. unfinished stuff to make popup in right place
				if( options[ 'appendPopupTo' ] ){
					$appendPopupTo = jQuery( options[ 'appendPopupTo' ] );
					if( $appendPopupTo.size( ) ){
						$appendPopupTo.append( $footnotePopup );
					}
				}
				// default put the popup after the link
				if( !$appendPopupTo || $appendPopupTo.size( ) == 0 ){
					$this.after( $footnotePopup );
				}



				$this.data( 'footnotepopupPopup', $footnotePopup );
				// User option, filter of the popup.
				if( jQuery.isFunction( options[ 'popupFilter' ] ) ){
					options[ 'popupFilter' ]( $footnotePopup, $this ); 
				}
				
				// Flags for if focusing or hovering
				var isFocus = false;
				var isHover = false;
				
				$this
					.focus( function( e ){
						isFocus = true;
						$footnotePopup.show( );
					} )
					.blur( function( e ){
						focus = false;
						if( !isHover ){
							$footnotePopup.hide( );
						}
					} )
					.parent( ).hover(
						function( e ){
							isHover = true;
							$footnotePopup.show( );
						},
						function( e ){
							isHover = false;
							if( !isFocus ){
								$footnotePopup.hide( );
							}
						}
					);
				
				
				
			} );
			return this;
		},
		
		'remove': function( ){
			var $this = jQuery( this );
			
			if( $this.data( 'footnotepopup' ) ){
				$this.data( 'footnotepopupPopup' ).remove( );
				var wrapper = $this.data( 'footnotepopupWrapper' );
				var contents = wrapper.contents( )
				wrapper.after( contents );
				wrapper.remove( );
				
			}	
			
			return this;
		}
	}
	
	
	// figure out the parameters
	options = !options && typeof action == 'object'? action: options; 
	
	action = typeof action == 'string'? action: 'add';
	action = action in fns? action: 'add'; 
	
	// other internally needed information
	var pageUrl = ( window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search );
	
	// keep the chainging going
	return fns[ action ].call( this, options );
} } );

