(function($) {
	$.fn.images = function() {
		return this.each(function() {
			var field = $(this);
			var fieldname = 'images';

			if(field.data( fieldname )) {
				return true;
			} else {
				field.data( fieldname, true );
			}
			
			
			field.find("input.filter").on('input change', function() {
	      filter = $(this).val();
	      field.find(".images-dropdown .no-images-found").removeClass("da");
	      if(filter != "") {
	        
	        $.expr[':'].Contains = function(a, i, m) {
	         return $(a).text().toUpperCase()
	                           .indexOf(m[3].toUpperCase()) >= 0;
	        };	        
	        field.find(".images-dropdown a").addClass("filtered");
	        	        
	        field.find(".images-dropdown a .image:Contains('" + filter + "')").not("disabled").closest("a").removeClass("filtered");
	        	        	        	        
	        if (field.find(".images-dropdown a").not(".filtered").length === 0) {
	          field.find(".images-dropdown .no-images-found").addClass("da");
	        }
	      }
	      else {
	        field.find(".images-dropdown a").removeClass("filtered");
	      }
	    });
	    
	    field.find("input.filter").keydown(function(e){
	        // UP
	        if (e.keyCode == 38) {
	          if (field.find(".images-dropdown a.focused").length) {
	            field.find(".images-dropdown a.focused").removeClass("focused").prevAll("a").not(".filtered").not(".disabled").first().addClass("focused");
	          }
	          else {
	            field.find(".images-dropdown a").removeClass("focused");
	            field.find(".images-dropdown a").not(".filtered").not(".disabled").last().addClass("focused");
	          }
	        }    
	        // DOWN
	        if (e.keyCode == 40) {
	          if (field.find(".images-dropdown a.focused").length) {
	            field.find(".images-dropdown a.focused").removeClass("focused").nextAll("a").not(".filtered").not(".disabled").first().addClass("focused");
	          }
	          else {
	            field.find(".images-dropdown a").removeClass("focused");
	            field.find(".images-dropdown a").not(".filtered").not(".disabled").first().addClass("focused");
	          }
	        }
	        // ENTER
	        if (e.keyCode == 13) {
	          field.find(".images-dropdown a.focused").click();
	          field.find(".images-dropdown a").removeClass("focused");
	          return false;
	        }
	    });
			
			function checkLimit() {
				
				if (field.data("limit")) {
				  var imagesLimit = field.data("limit");
				  var imagesCount = field.find(".images-item.selected").length;
				  
				  field.find(".images-limit").html("(" + imagesCount + "/" + imagesLimit + ")");
				  
				  if (imagesCount >= imagesLimit) {
				    field.addClass("limit-reached");
				  }
				  else {
				    field.removeClass("limit-reached");
				  }
				}
				
			}
			checkLimit();
			
			function noover() {
			  field.find(".add").removeClass("over");
			  field.find(".images-item").removeClass("over");
			}
			
			function reset() {
			  
			  if (field.find(".images-item.selected").length) {
			    field.find(".imagesgrid").addClass("filled");
			  }
			  else {
			    field.find(".imagesgrid").removeClass("filled");
			  }
			  
			  field.find(".images-dropdown").removeClass("open");
			  field.find(".images-add-button").removeClass("open");
			  			  
			  if (field.find('.images-dropdown a').not(".disabled").length > 0) {
			    field.find('.images-dropdown .no-more-images').removeClass("da");
			    field.find('.filter-wrap').show();
			    field.find('span.add-all').show();
			  }
			  else {
			    field.find('.images-dropdown .no-more-images').addClass("da");
			    field.find('.filter-wrap').hide();
			    field.find('span.add-all').hide();
			  }
			  
			  checkLimit();
			  
			};
			
			reset();
			
			function write() {
			  field.find("input.images").val("").trigger('change');
			  if (field.find(".images-item.selected").length > 1) {
			    filenames = new Array();
			    field.find(".images-item.selected").each(function() {
			      filenames.push($(this).data("image"));
			    });
			    filenames = "- " + filenames.join("\n- ");
			    
			    field.find("input.images").val(filenames).trigger('change');
			  }
			  else {
			    field.find("input.images").val(field.find(".images-item.selected").data("image")).trigger('change');
			  }
			  field.closest('form').trigger('keep');
			}
			
			function select(filename) {
			  var file = field.find(".images-item[data-image='" + filename + "']");
			  file.insertBefore(field.find(".add")).addClass("selected");
			  field.find(".images-dropdown a[data-filename='" + filename + "']").addClass("disabled");
			  reset();
			  write();
			  noover();
			};
			
			function selectAll() {
			  var file = field.find(".images-item");
			  file.insertBefore(field.find(".add")).addClass("selected");
			  field.find(".images-dropdown a").addClass("disabled");
			  reset();
			  write();
			  noover();
			};
			
			function remove(filename) {
			  field.find(".images-item[data-image='" + filename + "']").removeClass("selected");
			  field.find(".images-dropdown a[data-filename='" + filename + "']").removeClass("disabled");
			  reset();
			  noover();
			  write();
			};
			
			field.find(".images-item .btn.remove").on("click", function () {
			  if (!$(this).is(".ui-sortable-helper .btn")) {
			    var filename = $(this).closest(".images-item").data("image");
			    remove(filename);
			  }
			  return false;
			});
			
			field.find(".images-add-button").on("click", function(e) {
			  e.stopPropagation();
			  field.find(".images-dropdown").toggleClass("open");
			  field.find(".images-add-button").toggleClass("open");
			  field.find("input.filter").focus();
			  $(document).click(function(e) {
		      if ($(e.target).closest('.images-dropdown').length === 0) {
		        field.find("input.filter").val("");
		        field.find("input.filter").trigger("change");
		        field.find("input.filter").blur();
		        field.find(".images-dropdown").removeClass("open");
		        field.find(".images-add-button").removeClass("open");
		      }
			  });
			});
			
			field.find(".images-dropdown a").on("click", function(e) {
			  if (!field.hasClass("limit-reached")) {
  			  field.find("input.filter").val("");
  			  field.find("input.filter").trigger("change");
  		    select($(this).find(".image").text());
  		    field.find(".images-dropdown").removeClass("open");
  		    field.find(".images-add-button").removeClass("open");
			  }
			});
			
			field.find(".images-dropdown .add-all").on("click", function(e) {
			  
			  if (!field.hasClass("limit-reached") && !(field.find(".images-item.selected").length + field.find(".images-dropdown a").not(".disabled").length > field.data("limit"))) {
				  field.find("input.filter").val("");
				  field.find("input.filter").trigger("change");
			    selectAll();
			    field.find(".images-dropdown").removeClass("open");
			    field.find(".images-add-button").removeClass("open");
			  }
			});
						
			var files    = field.find('.imagesgrid');
			var sortable = files.find('.sortable');
			var items    = files.find('.images-item');
			var api      = files.data('api');
			
			if(sortable.find('.images-item').length > 1) {
			  sortable.sortable({
			    tolerance: "pointer",
			    revert: 100,
			    handle: "figure",
			    items: ".selected",
			    update: function() {
            write();
			    }
			  }).disableSelection();
			}
			
			field.find('.field-content').droppable({
			  tolerance: "pointer",
			  hoverClass: 'over',
			  accept:
			  function (elem) {
			    if ($('.sidebar').has(elem).length) {
			      return true;
			    }
			    else if (!$(this).has(elem).length && elem.hasClass("images-item")) {
			      return true
			    }
	      },
			  drop: function(e, ui) {
			    field.find(".add").removeClass("over");
			    field.find(".images-item").removeClass("over");
			    var droppedImage = ui.draggable.data('helper');
			    
			    if (!field.hasClass("limit-reached")) {
  			    if (ui.draggable.hasClass("images-item")) {
  			      otherField = ui.draggable.closest(".field-with-images");			      
  			      otherField.find(".images-dropdown a[data-filename='" + droppedImage + "']").removeClass("disabled");
  			      if (otherField.find(".selected").length <= 2) {
  		          otherField.find(".imagesgrid").removeClass("filled");
  		        }
  		        ui.draggable.removeClass("selected");
  		        
  		        otherField.find("input.images").val("");
  		        if (otherField.find(".images-item.selected").length > 1) {
  		          filenames = new Array();
  		          otherField.find(".images-item.selected").each(function() {
  		            filenames.push($(this).data("image"));
  		          });
  		          filenames = "- " + filenames.join("\n- ");
  		          
  		          otherField.find("input.images").val(filenames);
  		        }
  		        else {
  		          otherField.find("input.images").val(otherField.find(".images-item.selected").data("image"));
  		        }
  		        otherField.closest('form').trigger('keep');
  		        
  				  }
  		      select(droppedImage);
  		    }
			  },
			  over: function(e, ui) {
			    var droppableImage = field.find(".images-item[data-image='" + ui.draggable.data('helper') + "']");
			    if (field.hasClass("limit-reached")) {
			    }
			    else if (droppableImage.hasClass("selected")) {
			      droppableImage.addClass("over");
			    }
			    else {
			      var visibleItem = field.find(".images-item.selected figure");
			      if (visibleItem.length) {
			        var height = visibleItem.height() - 4;
			      }
			      else {
			        var invisibleItem = field.find(".images-item").first();
			        invisibleItem.addClass("selected");
			        var height = invisibleItem.find("figure").height() - 4;
			        invisibleItem.removeClass("selected");
			      }
			      field.find(".add .inner").height(height);
			      field.find(".add").addClass("over");
			    }
			    field.find(".imagesgrid").addClass("filled");
			  },
			  out: function(e, ui) {
			    noover();
			    reset();
			  }
			});

		});
	};
	

})(jQuery);
