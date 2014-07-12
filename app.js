/** @jsx React.DOM */

var RecipeApp = React.createClass({displayName: 'RecipeApp',

	getInitialState: function() {	
		return {
			search: ''
		};
	},

	handleChange: function(event) {
		this.setState({search: event.target.value});
	},

	renderRecipe: function(recipe) {
		if(this.state.search == '') {
			return (
				React.DOM.tr(null, 
					React.DOM.td(null,  " ", React.DOM.input( {type:"checkbox"} ), " " ),
					React.DOM.td(null, recipe.name),
					React.DOM.td(null, recipe.type),
					React.DOM.td(null, recipe.cook_time),
					React.DOM.td(null, recipe.ingredients.map(function(i) { return (React.DOM.span( {className:"label label-default"}, i)) }))
				)
			);
		} else {
			var _this = this;
			var show = _.find(recipe.ingredients, function(ing) { return ing.toLowerCase().indexOf(_this.state.search.toLowerCase()) > -1  });
			if(show) {
				return (
					React.DOM.tr(null, 
						React.DOM.td(null,  " ", React.DOM.input( {type:"checkbox"} ), " " ),
						React.DOM.td(null, recipe.name),
						React.DOM.td(null, recipe.type),
						React.DOM.td(null, recipe.cook_time),
						React.DOM.td(null, recipe.ingredients.map(function(i) { return (React.DOM.span( {className:"label label-default"}, i)) }))
					)
				);
			}
		}
	},

	render: function() {
		return (
			React.DOM.div(null, 
				React.DOM.div( {id:"search"}, 
					React.DOM.input( {type:"text", className:"form-control", id:"searchBox", placeholder:"Search ...", value:this.state.search, onChange:this.handleChange} )
				),
				React.DOM.div(null, 
					React.DOM.table( {className:"table"}, 
						React.DOM.thead(null, 
							React.DOM.tr(null, 
								React.DOM.th(null),
								React.DOM.th(null, "Recipe"),
								React.DOM.th(null, "Type"),
								React.DOM.th(null, "Cook Time"),
								React.DOM.th(null, "Ingredients")
							)
						),
						React.DOM.tbody(null, 
							this.props.recipes.map(this.renderRecipe)
						)
					)
				)
			)
		);
  	}

});

React.renderComponent(
	RecipeApp( {recipes:json.recipes}),
	document.getElementById('container')
);
