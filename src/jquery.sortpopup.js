if (jQuery) (function ($) {

    $.fn.sortPopup= function (method, data) {
            switch (method) {
                case 'show':
                    show(null, $(this));
                    return $(this);
                case 'hide':
                    hide();
                    return $(this);
                case 'attach':
                    return $(this).attr('data-dropdown', data);
                case 'detach':
                    hide();
                    return $(this).removeAttr('data-dropdown');
                case 'disable':
                    return $(this).addClass('dropdown-disabled');
                case 'enable':
                    hide();
                    return $(this).removeClass('dropdown-disabled');
            }
        };

    function show(event, object) {

        var trigger = event ? $(this) : object,
			dropdown = trigger.next(),
			isOpen = trigger.hasClass('dropdown-open');


        hide();

        event.preventDefault();
        // Show it
        trigger.addClass('dropdown-open');
        dropdown.show();

        // Position it
        position();


    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;

        // Are we clicking anywhere in a dropdown?
        if (targetGroup && targetGroup.is('.dropdown')) {
            // Is it a dropdown menu?
            if (targetGroup.is('.dropdown-menu')) {
                // Did we click on an option? If so close it.
                if (!targetGroup.is('A')) return;
            } else {
                // Nope, it's a panel. Leave it open.
                return;
            }
        }

        // Hide any dropdown that may be showing
        $('.sort-popup').hide();

        // Remove all dropdown-open classes
        $(document).find('.dropdown-open').removeClass('dropdown-open');

    }

    function position() {
        var dropdown = $('.sort-dropdown:visible').eq(0),
			trigger = dropdown.prev(),
			hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
			vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;
        //console.log(trigger.attr('data-horizontal-offset'));
        if (dropdown.length === 0 || !trigger) return;

        // Position the dropdown relative-to-parent...
        if (dropdown.hasClass('dropdown-relative')) {
            dropdown.css({
                left: dropdown.hasClass('dropdown-anchor-right') ?
					trigger.position().left - (dropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
					trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {

            dropdown.css({
                left:14,
                top:10+trigger.height()
            });
        }
    }

    $(document).on('click.sort-popup', '.sort-popup__trigger', show);
    $(document).on('click.sort-popup', function(e){
        var
            target = $(e.target);
        if(target.hasClass('sort-popup__trigger') || target.hasClass('sort-popup') || target.parents().hasClass('sort-popup')){
            return;
        }else{
            hide(e);
        }
    });
    $(window).on('resize', position);

})(jQuery);