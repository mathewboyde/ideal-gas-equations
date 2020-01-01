$(document).ready(function(){
	gl_vals = $("#main_ideal_gas > tbody > tr > td > input");
	rms_vals = $("#main_rms > tbody > tr > td > input");
	dof_vals = $("#main_dof > tbody > tr > td > input");

	$("#ideal_gas_clear").click(function(){
		$.each($(gl_vals),function(index,value){
			if(index !== 3){
				$(gl_vals[index]).val("");
			}
		});
	});
	$("#ideal_gas_calc").click(function(){
		var unk_count = 0;
		var unk_var;
		$.each($(gl_vals),function(index,value){
			if($(value).val() === ""){
				unk_count = unk_count + 1;
				unk_var = index;
			}
		});
		if(unk_count == 1){
			switch (unk_var){
				case 0:
					c = ($(gl_vals[2]).val() * $(gl_vals[3]).val() * $(gl_vals[4]).val()) / $(gl_vals[1]).val();
					$(gl_vals[unk_var]).val(c);
					break;
				case 1:
					c = ($(gl_vals[2]).val() * $(gl_vals[3]).val() * $(gl_vals[4]).val()) / $(gl_vals[0]).val();
					$(gl_vals[unk_var]).val(c);
					break;
				case 2:
					c = ($(gl_vals[0]).val() * $(gl_vals[1]).val()) / ($(gl_vals[3]).val() * $(gl_vals[4]).val());
					$(gl_vals[unk_var]).val(c);
					break;
				case 4:
					c = ($(gl_vals[0]).val() * $(gl_vals[1]).val()) / ($(gl_vals[2]).val() * $(gl_vals[3]).val());
					$(gl_vals[unk_var]).val(c);
					break;
			}
		}
		else{
			alert("An error has occurred. Make sure that you have only one unknown.");
			return;
		}
	});
	$("#rms_clear").click(function(){
		$.each($(rms_vals),function(index,value){
			if(index !== 1){
				$(rms_vals[index]).val("");
			}
		});
		$("#main_rms #ke").html("");
	});
	$("#rms_calc").click(function(){
		var unk_count = 0;
		var unk_var;
		$.each($(rms_vals),function(index,value){
			if($(value).val() === ""){
				unk_count = unk_count + 1;
				unk_var = index;
			}
		});
		if(unk_count == 1){
			switch (unk_var){
				case 0:
					c = Math.sqrt((3000 * $(rms_vals[1]).val() * $(rms_vals[2]).val()) / $(rms_vals[3]).val());
					$(rms_vals[unk_var]).val(c);
					k_e = (3 * 1.38062e-23 * $(rms_vals[2]).val()) / 2;
					$("#main_rms #ke").html(k_e+" J");
					break;
				case 2:
					c = ($(rms_vals[3]).val() * Math.pow($(rms_vals[0]).val(),2)) / (3000 * $(rms_vals[1]).val());
					$(rms_vals[unk_var]).val(c);
					k_e = (3 * 1.38062e-23 * c) / 2;
					$("#main_rms #ke").html(k_e+" J");
					break;
				case 3:
					c = (3000 * $(rms_vals[1]).val() * $(rms_vals[2]).val()) / Math.pow($(rms_vals[0]).val(),2);
					$(rms_vals[unk_var]).val(c);
					k_e = (3 * 1.38062e-23 * $(rms_vals[2]).val()) / 2;
					$("#main_rms #ke").html(k_e+" J");
					break;
			}
		}
		else{
			alert("An error has occurred. Make sure that you have only one unknown.");
			return;
		}
	});
	$("#dof_clear").click(function(){
		$("#main_dof #q_lm").prop("checked",false);
		$("#main_dof #q_a").val("");
		$("#main_dof #et").html("");
		$("#main_dof #cv").html("");
	});
	$("#dof_calc").click(function(){
		if($(dof_vals[1]).val() == ""){
			alert("You must indicate a number of atoms in your molecule.");
		}
		else{
			if($(dof_vals[0]).is(":checked") == true){
				stand = (3 * $(dof_vals[1]).val()) - (5 / 2);
			}
			else{
				stand = (3 * $(dof_vals[1]).val()) - 3;
			}
			$("#main_dof #et").html(stand + "RT");
			$("#main_dof #cv").html(stand + "R");
		}
	});
});