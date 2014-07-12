/** @jsx React.DOM */

var RecipeApp = React.createClass({

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
			<ol>
				{allIngredients.map(function(ing) { return (<li>{ing}</li>) })}
			</ol>
		);
	},

	renderRecipe: function(recipe, index) {
		if(this.state.search == '') {
			return (
				<tr>
					<td> <input id={index} type="checkbox" checked={this.state.checked[index]} onChange={this.handleChecked} /> </td>
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
						<td> <input id={index} type="checkbox" checked={this.state.checked[index]} onChange={this.handleChecked} /> </td>
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
				<div id="search" className="row">
					<input type="text" className="form-control" id="searchBox" placeholder="Search ..." value={this.state.search} onChange={this.handleChange} />
				</div>

				<div className="row">
					<div className="col-md-7">
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

					<div className="col-md-2 pull-right">
						<b>Distinct Ingredients</b>
						{this.renderDistinctIngredients()}
					</div>
				</div>
			</div>
		);
  	}

});

React.renderComponent(
	<RecipeApp recipes={json.recipes}></RecipeApp>,
	document.getElementById('container')
);