var Preiskalkulator = React.createClass({displayName: "Preiskalkulator",
	getInitialState: function() {
		return {
			preisTotal: 0
		}
	},
	addTotal: function(preis) {
		this.setState({
			preisTotal: this.state.preisTotal + preis
		});
	},
	render: function() {
		var self = this;
		var getLeistungen = this.props.leistungen.map(function(l){
			return React.createElement(Leistung, {name: l.name, preis: l.preis, active: l.active, addTotal: self.addTotal, def: l.def})
		});
		return (
		React.createElement("div", {className: "preiskalkulator-wrapper"}, 
			getLeistungen, 
			React.createElement("hr", null), 
			React.createElement("div", {className: "preis-total"}, "Total: ", this.state.preisTotal, " EUR")
		)
		)
	}

});
var def = false;
var Leistung = React.createClass({displayName: "Leistung",
	getInitialState: function() {
		return {
			active: false,
			def: false
		}
	},
	ClickHandler: function(e) {
		var active = !this.state.active;
		console.log(active);
		if(this.props.name === "Defektkorrektur I" || this.props.name === "Defektkorrektur II") {
			if(def && !active) {
				def=false;
				this.setState({
					active: active
				});
				this.props.addTotal(active? this.props.preis:-this.props.preis);
			} 
			if(def && active) {
				alert("Du brauchst nur eine der beiden Defektkorrekturen auswählen");
			}
			if(!def && active) {
				def=true;
				this.setState({
					active: active
				});
				this.props.addTotal(active? this.props.preis:-this.props.preis);
			}
		} else {
			this.setState({
				active: active
			});
			this.props.addTotal(active? this.props.preis:-this.props.preis);
		}
	},
	render: function() {
		return(
			React.createElement("div", {className: this.state.active ? 'active preis' : 'preis', onClick: this.ClickHandler}, 
				this.props.name, 
				React.createElement("strong", null, this.props.preis, " EUR")
			)
		)
	}

});

var preise = [
	{name: "Polieren I (wenig Kratzer)", preis: 280, def: true},
	{name: "Polieren II (viele Kratzer)", preis: 400, def: true},
	{name: "Innenraum inkl. Lederpflege", preis: 140},
	{name: "Motorraum", preis: 60},
	{name: "Scheibenversiegelung", preis: 40},
	{name: "Felgenversiegelung", preis: 80},
	{name: "Gtechniq Crystal Serum", preis: 180},
	{name: "Gtechniq Exo", preis: 40}
]
React.render(
	React.createElement(Preiskalkulator, {leistungen: preise}),
	document.querySelector("#preiskalkulator")
);