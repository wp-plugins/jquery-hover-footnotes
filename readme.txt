=== jQuery Hover Footnotes ===
Contributors: Lance
Tags: footnotes, jquery, popup, hover
Requires at least: 2.8
Tested up to: 3.0.5
Stable tag: trunk



== Description ==

JQuery Hover Footnotes lets you add footnotes with qualifiers of you're choosing, then dynamically displays them on hover-over. So you can easily add footnotes to a post by wrapping them in qualifiers, then they will dynamically display in a jQuery hover popup when the user mouses-over the footnote link.  There is also a settings page where you can change options like the footnote formatting.



**Usage**

To anchor the footnote reference mark/number, use {{FOOTNOTE_NUMBER}}. Then just embrace the actual footnote text with double brackets [[FOOTNOTE_NUMBER]] Footnote text [[FOOTNOTE_NUMBER]]. The footnote text can be placed either inline or at the bottom of the post, the plugin will find them and auto place them in the footer area.

So this is what you would write in the post window...

This is my post and I want to add a footnote{{1}} in the text. By default it will appear as a superscript.

[[1]] My Footnote. [[1]]

see the plugin webpage or the screenshots for examples.


visit the sites page <a href='http://restoredisrael.org/blog/961/footnote-plugin-test-page/'>here</a>






== Installation ==


Activate like any plugin. 

For those who have never done this, the easiest way is to login to your wordpress back-end, select the "plugins" section and select "add new". Then in the search box search for "jQuery Hover Footnotes".  It should find and display it in a list.  then just click "activate" and it should automatically download and activate it.  Easy as pie.  

Realize you can also download the plugin manually to your computer, and use the "upload" option on that plugin install page in your wordpress backend.

enjoy.


== Screenshots ==

1. This is the backend panel. It lets you change a few options such as how you want the footnote styled, the footnote section name, and the back symbol.
2. Example of a post using footnotes. The box shown appears on mouseover.
3. Example of adding a footnote in the backend post page.  You simply add the markup {{#}} & [[#]]my note[[#]] around your footnotes.




== Credits ==

This plugin is a fork and combination of several other plugins.

PHP-
stratos at <a href='http://www.stratos.me/wp-plugins/yafootnotes/'>YaFootnotes</a> and <a href='http://anxietypanichealth.com/'>Mike Nichols</a>




== Contact ==

Developed by Lance Weaver.
To contact, leave a comment on the plugin <a href='http://restoredisrael.org/blog/961/footnote-plugin-test-page/'>website</a>









== Changelog ==

= 1.0 =
* Added the admin panal with the user changeable options
* Added the jQuery hover/pop up support


= 1.2 =
* Completely changed the javascript to a new code base. (fixes positioning bugs)
* Made some changes to the php file


= 1.3 =
* For large footnotes (larger than 150px height of text) made popup height absolute and 
added a scrollbar.  For small popups, made popup box shrink to fit text.
* Fixed a bug with enque_script which made script not load with some php versions.

= 1.4 =
* Added the ability to hide the footnotes in the footer (so they only appear in the popup.
