/*
 * Let's begin with validation functions
 */
 jQuery.extend(jQuery.fn, {
	/*
	 * check if field value lenth more than 3 symbols ( for name and comment ) 
	 */
	validate: function () {
		if (jQuery(this).val().length < 3) {jQuery(this).addClass('error');return false} else {jQuery(this).removeClass('error');return true}
	},
	/*
	 * check if email is correct
	 * add to your CSS the styles of .error field, for example border-color:red;
	 */
	validateEmail: function () {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
		    emailToValidate = jQuery(this).val();
		if (!emailReg.test( emailToValidate ) || emailToValidate == "") {
			jQuery(this).addClass('error');return false
		} else {
			jQuery(this).removeClass('error');return true
		}
	},
});
 
jQuery(function($){

	/*
	 * On comment form submit
	 */
	$( '#commentform' ).submit(function(){
	
		// define some vars
		var button = $('#submit'), // submit button
		    respond = $('#respond'), // comment form container
		    commentlist = $('.comment-list'), // comment list container
		    cancelreplylink = $('#cancel-comment-reply-link');
			
		// if user is logged in, do not validate author and email fields
		if( $( '#author' ).length )
			$( '#author' ).validate();
		
		if( $( '#email' ).length )
			$( '#email' ).validateEmail();
			
		// validate comment in any case
		$( '#comment' ).validate();
		
		// if comment form isn't in process, submit it
		if ( !button.hasClass( 'loadingform' ) && !$( '#author' ).hasClass( 'error' ) && !$( '#email' ).hasClass( 'error' ) && !$( '#comment' ).hasClass( 'error' ) ){
			
			// ajax request
			$.ajax({
				type : 'POST',
				url : misha_ajax_comment_params.ajaxurl, // admin-ajax.php URL
				data: $(this).serialize() + '&action=ajaxcomments', // send form data + action parameter
				beforeSend: function(xhr){
					// what to do just after the form has been submitted
					button.addClass('loadingform').val('Loading...');
				},
				error: function (request, status, error) {
					if( status == 500 ){
						alert( 'Error while adding comment' );
					} else if( status == 'timeout' ){
						alert('Error: Server doesn\'t respond.');
					} else {
						// process WordPress errors
						var wpErrorHtml = request.responseText.split("<p>"),
							wpErrorStr = wpErrorHtml[1].split("</p>");
							
						alert( wpErrorStr[0] );
					}
				},
				success: function ( addedCommentHTML ) {
					const thanks = '<div class="thank-you-message"><h3>Thank you for submitting your feedback.</h3><p>Your comment is awaiting moderation.</p></div>';
					respond.before( thanks );
					respond.slideUp();
					$('#comment').val('');
				},
				complete: function(){
					// what to do after a comment has been added
					button.removeClass( 'loadingform' ).val( 'Post Comment' );
				}
			});
		}
		return false;
	});
});