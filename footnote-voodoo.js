
// this script requires jQuery
jQuery(document).ready(function() {
    Footnotes.setup();
});

var Footnotes = {
    footnotetimeout: false,
    setup: function() {
        var footnotelinks = jQuery("a[class='fn-ref-mark']")
        
        footnotelinks.unbind('mouseover',Footnotes.footnoteover);
        footnotelinks.unbind('mouseout',Footnotes.footnoteoout);
        
        footnotelinks.bind('mouseover',Footnotes.footnoteover);
        footnotelinks.bind('mouseout',Footnotes.footnoteoout);
    },
    footnoteover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        jQuery('#footnotediv').stop();
        jQuery('#footnotediv').remove();
        
	 //this doesn't work in wordpress, since wp adds the whole URL to href anchors
	 // so we must use the next lines to strip off the anchor name.
        //var id = jQuery(this).attr('href').substr(1); 

	 var hash = this.href.split( '#' ); // Get the ID for the footnote
	 id = hash.pop( ); // now the hash is the ID

        var position = jQuery(this).offset();
    
        var div = jQuery(document.createElement('div'));
        div.attr('id','footnotediv');
        div.bind('mouseover',Footnotes.divover);
        div.bind('mouseout',Footnotes.footnoteoout);

        var el = document.getElementById(id);
        div.html(jQuery(el).html());
     
        jQuery(document.body).append(div);

	 // logic to decide how big to make div's and whether to add scroll bars
	 var width = (div.width()>'400') ? '400px' : '';
	 if (div.height() > '110') {
  	   var height = '150px';
	   var flowy = 'auto'; 
  	 }
	 else {
	   //alert(div.height());
	   var height = '';
	   var flowy = 'hidden';
	 }

        div.css({
            position:'absolute',
	     overflow:flowy,
            width:width,
	     height:height,
            opacity:0.85
        });

        jQuery(document.body).append(div);

        var left = position.left;
	 var width = (width=='') ? div.width() : 400;
        if(left + width + 30  > jQuery(window).width() + jQuery(window).scrollLeft()) 
            left = jQuery(window).width() - width - 60 + jQuery(window).scrollLeft();
        var top = position.top+20;
        if(top + div.height() > jQuery(window).height() + jQuery(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left:left,
            top:top
        });
    },
    footnoteoout: function() {
        Footnotes.footnotetimeout = setTimeout(function() {
            jQuery('#footnotediv').animate({
                opacity: 0
            }, 600, function() {
                jQuery('#footnotediv').remove();
            });
        },100);
    },
    //this sweet little function lets you modify the popup once the cursor enters it
    //so lets change the opacity when we hover over it.
    divover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        jQuery('#footnotediv').stop();
        jQuery('#footnotediv').css({
                opacity: 1.0
        });
    }
}
