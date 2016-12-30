function my_table_init(options,callBack){

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    var defaults = {
        id:'dtMobile',
        bSort : false,
        paging: false,
        searching: false,
        bInfo:false,
        mapKey: 'field_name',
        callback    : {
            getSelectedObjects  : function () {
            }
        },
        colRender : null
    };

    var colDefault = [{ "data": "","title": '<input type="checkbox" name="select_all" value="1" id="chk-select-all"> ' }]
    var dgObject = Object();
    var dTtabel;

    var sntable = $("sntable");
    var element = '<table  id="'+defaults.id+'" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%"></table>';
    $(sntable).replaceWith(element);

    extend( defaults, options );

    if(defaults.colRender){
        $.each( defaults.colRender, function( index, node ){
            colDefault.push(node);
        });
    }
    dgObject.cols = colDefault;
	
	/*if ( $.fn.dataTable.isDataTable( "#"+defaults.id+" " ) ) {
		//dTtabel = $("#"+defaults.id+" ").DataTable();
	}
	else {		
	}*/
	
	dTtabel = $("#"+defaults.id+" ").DataTable({
        "bSort" : defaults.bSort,
        "paging": defaults.paging,
        "searching": defaults.searching,
        "bInfo":defaults.bInfo,
        "columns": colDefault,
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'select-checkbox',
            'render': function (data, type, full, meta){
                //alert(full[defaults.mapKey]);
                //return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                return '<input type="checkbox" value="' + full[defaults.mapKey] + '">';
            }
        }]
    });

    

	
	/*$(document).on("draw.dt","#"+defaults.id+" ",function(e){
		alert("ok");
	});*/

	//	
	
	/*$("#"+defaults.id+" ").on( 'draw', function () {
		alert("draw");
		//$("#chk-select-all").prop('checked', false);
		
	} );*/


    $(document).on("click","#"+defaults.id+" tbody tr",function(e){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            $(this).find("td:first input[type='checkbox']").prop('checked', false);
            $("#chk-select-all").prop('checked', false);
        }
        else{
            $(this).addClass("selected");
            $(this).find("td:first input[type='checkbox']").prop('checked', true);
            if($("#dtMobile tbody tr td input[type='checkbox']:not(:checked)").length == 0)
                $("#chk-select-all").prop('checked', true);
        }
    });




    $(document).on("click","#chk-select-all",function(){
        if($(this).is(":checked")){
           $("#"+defaults.id+"  tbody tr").addClass("selected");
            $("#"+defaults.id+" tbody tr td input[type='checkbox']").prop('checked', true);
        }
        else{
            $("#"+defaults.id+" tbody tr").removeClass("selected");
            $("#"+defaults.id+" tbody tr td input[type='checkbox']").prop('checked', false);
        }
    });
    dgObject.table = dTtabel;

    dgObject.setDp = function (results){
        dgObject.results = results;
        dgObject.table.clear();
        dgObject.table.rows.add(results).draw();
    }
    dgObject.getSelectedObjects = function() {
        var instance_objects = [];
        $("#"+defaults.id+" tbody input[type='checkbox']:checked").each(function(){
            var selected_guid = $(this).val();
            if($(this).is(':checked')){
                for(let result of dgObject.results){
                    if(selected_guid == result["field_name"]){
                        instance_objects.push(result);
                        break;
                    }
                }
            }
        });
        return instance_objects;
    }
	dgObject.clearCheckBox = function(){		
		$("#chk-select-all").prop('checked', false);
		$("#"+defaults.id+" tbody tr td input[type='checkbox']").prop('checked', false);
	}
	
    callBack($(this),dgObject);

}

/*;( function( window ) {

    'use strict';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }


    var defaults = {
        id:'table',
        bSort : false,
        paging: false,
        searching: false,
        bInfo:false,
        mapKey: 'online',
        callback    : {
            getSelectedObjects  : function () {
            }
        }
    };

    var dgObject = Object();
    var dTtabel;


    var cols = [
            { "data": "","title": '<input type="checkbox" name="select_all" value="1" id="chk-select-all"> ' },{ "data": "field_label","title": "Field Label" }]



    function SNDataTable( options) {


        extend( defaults, options );
        dTtabel = $("#"+defaults.id+" ").DataTable({
            "bSort" : defaults.bSort,
            "paging": defaults.paging,
            "searching": defaults.searching,
            "bInfo":defaults.bInfo,
            "columns": cols,
            'columnDefs': [{
                'targets': 0,
                'searchable': false,
                'orderable': false,
                'className': 'select-checkbox',
                'render': function (data, type, full, meta){
                    //alert(full[defaults.mapKey]);
                    //return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                    return '<input type="checkbox" name="id[]" value="' + full[defaults.mapKey] + '">';
                }
            }]
        });

        dgObject.cols = cols;

        $("#"+defaults.id+" tbody").on("click","tr",function(){
            if($(this).hasClass("selected")){
                $(this).removeClass("selected");
                $(this).find("td:first input[type='checkbox']").prop('checked', false);
                $("#chk-select-all").prop('checked', false);
            }
            else{
                $(this).addClass("selected");
                $(this).find("td:first input[type='checkbox']").prop('checked', true);
                if($("#dtMobile tbody tr td input[type='checkbox']:not(:checked)").length == 0)
                    $("#chk-select-all").prop('checked', true);
            }
        });

        $("#"+defaults.id+" thead").on("click","#chk-select-all",function(){
            if($(this).is(":checked")){
                $("#dtMobile tbody tr").addClass("selected");
                $("#dtMobile tbody tr td input[type='checkbox']").prop('checked', true);
            }
            else{
                $("#dtMobile tbody tr").removeClass("selected");
                $("#dtMobile tbody tr td input[type='checkbox']").prop('checked', false);
            }
        });
        dgObject.table = dTtabel;
        return dTtabel;
    }


    function setDp(results){
        dgObject.results = results;
        dgObject.table.clear();
        dgObject.table.rows.add(results).draw();
    }

    function getSelectedObjects() {
        var instance_objects = [];
        $("#"+defaults.id+" tbody input[type='checkbox']:checked").each(function(){
            var selected_guid = $(this).val();
            if($(this).is(':checked')){
                for(let result of dgObject.results){
                   if(selected_guid == result["field_name"]){
                        instance_objects.push(result);
                        break;
                    }
                }
            }
        });
        return instance_objects;
    }

 var sntable = $("sntable");
 var element = '<table  id="dtMobile" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%"></table>';
 $(sntable).append(element);

    window.SNDataTable = SNDataTable;

    window.setDp = setDp;
    window.getSelectedObjects = getSelectedObjects;


})( window );

    */