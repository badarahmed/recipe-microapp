/** @jsx React.DOM */

var RecipeApp = React.createClass({

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
				<tr>
					<td> <input type="checkbox" /> </td>
					<td>{recipe.name}</td>
					<td>{recipe.type}</td>
					<td>{recipe.cook_time}</td>
					<td>{recipe.ingredients.map(function(i) { return (<span className="label label-default">{i}</span>) })}</td>
				</tr>
			);
		} else {
			var _this = this;
			var show = _.find(recipe.ingredients, 
				function(ing) { 
					return ing.toLowerCase().indexOf(_this.state.search.toLowerCase()) > -1  
				});
			
			if(show) {
				return (
					<tr>
						<td> <input type="checkbox" /> </td>
						<td>{recipe.name}</td>
						<td>{recipe.type}</td>
						<td>{recipe.cook_time}</td>
						<td>{recipe.ingredients.map(function(i) { return (<span className="label label-default">{i}</span>) })}</td>
					</tr>
				);
			}
		}
	},

	render: function() {
		return (
			<div>
				<div id="search">
					<input type="text" className="form-control" id="searchBox" placeholder="Search ..." value={this.state.search} onChange={this.handleChange} />
				</div>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Recipe</th>
								<th>Type</th>
								<th>Cook Time</th>
								<th>Ingredients</th>
							</tr>
						</thead>
						<tbody>
							{this.props.recipes.map(this.renderRecipe)}
						</tbody>
					</table>
				</div>
			</div>
		);
  	}

});

React.renderComponent(
	<RecipeApp recipes={json.recipes}></RecipeApp>,
	document.getElementById('container')
);