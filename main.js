$(document).ready(function(){
	//collection of jQuery prefixes, constants, and collections of inputs
	a = '#main_flow ';
	arms = '#main_rms ';
	dof = '#main_dof ';
	m_ = [$(a+'#q_P'),$(a+'#q_V'),$(a+'#q_n'),$(a+'#q_T')];
	m_rms = [$(arms+'#q_u'),$(arms+'#q_T'),$(arms+'#q_M')];
	R = 0.082057338;
	R1 = 8.3144598;
	

	$('#ideal_gas_calc').click(function(){
		//mt_ -> for unknown
		//mc_ -> for given value
		mt_ = [];
		mc_ = [];
		
		$.each(m_,function(i,k){
			if(k.val() === ""){
				mt_.push([i,k.val()]);
			}
			else{
				mc_.push([i,k.val()]);
			}
		});
		if(mt_.length !== 1){
			alert("There can only be exactly one unknown.");
			return;
		}
		else{
			//switch for treatment of different unknowns wrt PV = nRT
			switch(mt_[0][0]){
				case 0:
					c = (mc_[1][1] * R * mc_[2][1]) / mc_[0][1];
					break;
				case 1:
					c = (mc_[1][1] * R * mc_[2][1]) / mc_[0][1];
					break;
				case 2:
					c = (mc_[0][1] * mc_[1][1]) / (R * mc_[2][1]);
					break;
				case 3:
					c = (mc_[0][1] * mc_[1][1]) / (mc_[2][1] * R);
					break;
			}
		}
		if(typeof c !== "null"){
			m_[mt_[0][0]].val(c);
		}
	});
	$('#rms_calc').click(function(){
		//mt_ -> for unknown
		//mc_ -> for given value
		mt_ = [];
		mc_ = [];
		
		$.each(m_rms,function(i,k){
			if(k.val() === ""){
				mt_.push([i,k.val()]);
			}
			else{
				mc_.push([i,k.val()]);
			}
		});
		if(mt_.length !== 1){
			alert("There can only be exactly one unknown.");
			return;
		}
		else{
			switch(mt_[0][0]){
				case 0:
					c = Math.sqrt((3000 * R1 * mc_[0][1]) / mc_[1][1]);
					break;
				case 1:
					c = (mc_[1][1] * Math.pow(mc_[0][1],2)) / (3000 * R1);
					break;
				case 2:
					c = (3000 * R1 * mc_[1][1]) / Math.pow(mc_[0][1],2);
					break;
			}
		}
		if(typeof c !== "null"){
			m_rms[mt_[0][0]].val(c);
			temp = $(arms+'#q_T').val();
			k_e = (3 * 1.38062e-23 * temp) / 2;
			$(arms+'#ke').html(k_e+" J");
		}
	});
	$('#dof_calc').click(function(){
		nom = $(dof+'#q_a').val();
		
		if(nom == ''){ //includes check for blank and zero
			alert('You must indicate a number of atoms in your molecule.');
		}
		else{
			if($(dof+'#q_lm').is(':checked') == true){
				//linear molecule
				stand = (3 * nom) - (5 / 2);
			}
			else{
				//nonlinear molecule
				stand = (3 * nom) - 3;
			}
		}
		if(typeof stand !== "undefined"){
			$(dof+'#et').html(stand + "RT");
			$(dof+'#cv').html(stand + "R");
		}
	});
});