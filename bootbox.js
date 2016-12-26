/**
 * bootbox.js [master branch]
 *
 * http://bootboxjs.com/license.txt
 */

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
   root.bootbox = factory(root.jQuery);
  
}(this, function init2($, undefined) {
  "use strict";
  
  // our public object; augmented after our private API
  var exports = {};

  
  exports.alert = function() {
		var options;
		options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

  }; 
  
  
  
   function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  

  return exports;
}));