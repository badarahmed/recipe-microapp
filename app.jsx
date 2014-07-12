/** @jsx React.DOM */

var RecipeApp = React.createClass({

	getInitialState: function() {	
		return {
			x: false
		};
	},

	renderRecipe: function(recipe) {
		return (
			<tr>
				<td> <input type="checkbox" /> </td>
				<td>{recipe.name}</td>
				<td>{recipe.type}</td>
				<td>{recipe.cook_time}</td>
			</tr>
		);
	},

	render: function() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Recipe</th>
							<th>Type</th>
							<th>Cook Time</th>
						</tr>
					</thead>
					<tbody>
						{this.props.recipes.map(this.renderRecipe)}
					</tbody>
				</table>
			</div>
		);
  	}

});

React.renderComponent(
	<RecipeApp recipes={json.recipes}></RecipeApp>,
	document.getElementById('container')
);