/**
 * @file
 * js/ubl_show_persistent_url.js
 *
 *
 *  Copyright 2017 Leiden University Library
 *
 *  This file is part of ubl_show_persistent_url.
 *
 *  ubl_show_persistent_url is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

jQuery(document).ready(function() {
  jQuery('.ubl-detail-tools LI A .fa-link').parent().click(function (e) {
    var $li = jQuery(this).parent();
    var $additionalblock = jQuery('DIV.link-additional');
    if ($additionalblock.size() > 0) {
      e.preventDefault();
      if ($additionalblock.is(':visible')) {
        return; // is already visible
      }

      var x = $li.offset().left - $additionalblock.outerWidth() + $li.outerWidth();
      if (x > 0) {
        $additionalblock.css('left', x + 'px');
      }
      var y = $li.offset().top + $li.outerHeight();
      $additionalblock.css('top', y + 'px');

      $additionalblock.find('#persistenturl').on('click change keyup keydown keypress', function(e) {
        this.select();
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 67)) {
          // user is copying
          $additionalblock.find('.howtocopy').html('The URL is copied!');
        }
        else {
          e.stopPropagation(); 
          e.preventDefault();
        }
      });

      if ($additionalblock.find('.howtocopy').size() == 0) {
        var $howtocopy = jQuery('<DIV class="howtocopy"/>');
        $additionalblock.find('.menu').append($howtocopy);
        var copyfunc = function() {
          if (navigator.platform.indexOf('Mac') == 0) {
            $howtocopy.html('Press Cmd-C to copy');
          }
          else {
            $howtocopy.html('Press Ctrl-C to copy');
          }
        };
        if (document.execCommand && document.queryCommandSupported && document.queryCommandSupported('copy')) {
          var $button = jQuery('<BUTTON type="button">Copy URL</BUTTON>'); 
          $howtocopy.append($button);
          $button.click(function(e) {
            e.preventDefault();
            
            $additionalblock.find('#persistenturl').select();
            var copied = false;
            try {
              copied = document.execCommand('copy');
            }
            catch (err) {
              console.log('Oops, unable to copy:' + err);
              copied = false;
            }
            if (!copied) {
              e.stopPropagation();
              copyfunc();
            } 
          });
        }
        else {
          copyfunc();
        }
      }

      $additionalblock.slideDown(function() {
        $additionalblock.find('#persistenturl').select();
      });

      e.stopPropagation();
      jQuery('BODY').one('click', function() {
        $additionalblock.slideUp();
      });
    }
  });
})
