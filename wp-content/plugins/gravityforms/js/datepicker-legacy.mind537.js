gform.addFilter("gform_datepicker_options_pre_init",function(e,t,i,r){var o,s,d,a=window.gf_legacy_multi;return a&&a[t]&&"1"===a[t]?(o=window.jQuery,s=0<o("#preview_form_container").length,d="rtl"===window.getComputedStyle(r[0],null).getPropertyValue("direction"),Object.assign(e,{showOtherMonths:!1,beforeShow:function(e,t){return t.dpDiv[0].classList.remove("gform-theme-datepicker"),t.dpDiv[0].classList.remove("gravity-theme"),t.dpDiv[0].classList.remove("gform-theme"),t.dpDiv[0].classList.remove("gform-legacy-datepicker"),t.dpDiv[0].classList.remove("gform-theme--framework"),t.dpDiv[0].classList.remove("gform-theme--foundation"),t.dpDiv[0].classList.remove("gform-theme--orbital"),t.dpDiv[0].classList.add("gform-legacy-datepicker"),d&&s&&(e=o(e).closest(".gfield"),e=o(document).outerWidth()-(e.offset().left+e.outerWidth()),t.dpDiv[0].style.right=e+"px"),s&&t.dpDiv[0].classList.add("gform-preview-datepicker"),!this.suppressDatePicker}})):e},-10);