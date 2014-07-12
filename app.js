/** @jsx React.DOM */

var RecipeApp = React.createClass({displayName: 'RecipeApp',

	getInitialState: function() {	
		return {
			search: '',
			checked: new Array(this.props.recipes.length)
		};
	},

	componentWillMount: function() {
		if (localStorage["checked"] != null) {
			var checked = JSON.parse(localStorage["checked"]);
			this.setState({checked: checked});
		}
	},

	handleChange: function(event) {
		this.setState({search: event.target.value});
	},

	handleChecked: function(event) {
		var checked = this.state.checked;
		var id = event.target.id;
		checked[id] = event.target.checked;
		this.setState({checked: checked});

		localStorage["checked"] = JSON.stringify(checked);
	},

	renderDistinctIngredients: function() {
		//calculate distinct sorted array from state (of selected checkboxes)
		var checkedArr = this.state.checked;
		var allIngredients = [];
		var _this = this;
		checkedArr.map(function(checked, index) {
			if(checked)
				allIngredients.push(_this.props.recipes[index].ingredients);
		});

		allIngredients = _.flatten(allIngredients);
		allIngredients = _.uniq(allIngredients);
		allIngredients.sort();

		return (
			React.DOM.ol(null, 
				allIngredients.map(function(ing) { return (React.DOM.li(null, ing)) })
			)
		);
	},

	renderRecipe: function(recipe, index) {
		if(this.state.search == '') {
			return (
				React.DOM.tr(null, 
					React.DOM.td(null,  " ", React.DOM.input( {id:index, type:"checkbox", checked:this.state.checked[index], onChange:this.handleChecked} ), " " ),
					React.DOM.td(null, recipe.name),
					React.DOM.td(null, recipe.type),
					React.DOM.td(null, recipe.cook_time),
					React.DOM.td(null, recipe.ingredients.map(function(i) { return (React.DOM.span( {className:"label label-default"}, i)) }))
				)
			);
		} else {
			var _this = this;
			var show = _.find(recipe.ingredients,
				function(ing) { 
					return ing.toLowerCase().indexOf(_this.state.search.toLowerCase()) > -1  
				});

			if(show) {
				return (
					React.DOM.tr(null, 
						React.DOM.td(null,  " ", React.DOM.input( {id:index, type:"checkbox", checked:this.state.checked[index], onChange:this.handleChecked} ), " " ),
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
				React.DOM.div( {id:"search", className:"row"}, 
					React.DOM.input( {type:"text", className:"form-control", id:"searchBox", placeholder:"Search ...", value:this.state.search, onChange:this.handleChange} )
				),

				React.DOM.div( {className:"row"}, 
					React.DOM.div( {className:"col-md-7"}, 
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
					),

					React.DOM.div( {className:"col-md-2 pull-right"}, 
						React.DOM.b(null, "Distinct Ingredients"),
						this.renderDistinctIngredients()
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
