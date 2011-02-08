
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
        
	 //this doesn't work in wordpress, since wp add the whole URL to href anchors
	 // so we must use the next lines to stip off the anchor name.
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
        
        div.css({
            position:'absolute',
            width:'400px',
            opacity:0.95
        });
        jQuery(document.body).append(div);

        var left = position.left;
        if(left + 420  > jQuery(window).width() + jQuery(window).scrollLeft())
            left = jQuery(window).width() - 460 + jQuery(window).scrollLeft();
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
    divover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        jQuery('#footnotediv').stop();
        jQuery('#footnotediv').css({
                opacity: 0.9
        });
    }
}
