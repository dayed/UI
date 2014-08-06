module.exports = {
	fetch: function(id, data){
		return this.parse(document.getElementById(id).innerHTML, data);
	},

	parse: function(content, data){
        	var tmp = "with(d){r.push('" 
	                + 
	                content.replace(/(')|([\r\n]+)|<%(=?)(.*?)%>/g, function(_0, _1, _2, _3, _4){
	                    return _1 ? "\\'" : _2 ? "" : _3 ? "' + (" + _4 + ") + '" : "'); \r\n" + _4 + "; \r\nr.push('";
	                }) 
	                + 
	                "');}return r.join('');";
	                
		try{
			return (new Function('d', 'r', 'c', tmp))(data, []);
		}catch(e){
			console && console.log(tmp);
			throw new Error(content);
		}
	}
};
