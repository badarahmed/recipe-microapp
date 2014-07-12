/** @jsx React.DOM */

var RecipeApp = React.createClass({displayName: 'RecipeApp',

	getInitialState: function() {	
		return {
			x: false
		};
	},

	renderRecipe: function(recipe) {
		return (
			React.DOM.tr(null, 
				React.DOM.td(null,  " ", React.DOM.input( {type:"checkbox"} ), " " ),
				React.DOM.td(null, recipe.name),
				React.DOM.td(null, recipe.type),
				React.DOM.td(null, recipe.cook_time)
			)
		);
	},

	render: function() {
		return (
			React.DOM.table( {className:"table"}, 
				React.DOM.thead(null, 
					React.DOM.tr(null, 
						React.DOM.th(null),
						React.DOM.th(null, "Recipe"),
						React.DOM.th(null, "Type"),
						React.DOM.th(null, "Cook Time")
					)
				),
				React.DOM.tbody(null, 
					this.props.recipes.map(this.renderRecipe)
				)
			)

		);
  	}

});

React.renderComponent(
	RecipeApp( {recipes:json.recipes}),
	document.getElementById('container')
);
