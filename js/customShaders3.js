	function loadShader(shadertype) 
	{
		return document.getElementById(shadertype).textContent;
	}
	
	var timeUniform = { time: { type: 'f', value: 0.0 } };
	var textureUniform = { op: {type: 'i', value: 0}, tDiffuse: {type: "t", value: THREE.ImageUtils.loadTexture('images/ufo.png') } };
	var texture2Uniform = { time: {type: 'f', value: 0}, tDiffuse: {type: "t", value: THREE.ImageUtils.loadTexture('images/background.png') } };
	var texture3Uniform = { time: {type: 'f', value: 0}, tDiffuse: {type: "t", value: THREE.ImageUtils.loadTexture('images/logo.png') } };
	
	function createCustomMaterialFromGLSLCode(fragmentName)
	{
		var frag = loadShader(fragmentName);
		var vert = loadShader("vertex");
		var shaderMaterial = new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:frag});
		return shaderMaterial;
	}
