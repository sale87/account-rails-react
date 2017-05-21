var RecordForm = React.createClass({
  getInitialState() {
    return {
      title: "",
      date: "",
      amount: "",
    }
  },

  handleChange(event) {
    name = event.target.name;
    this.setState({[name]: event.target.value})
  },

  valid() {
    return this.state.title && this.state.date && this.state.amount
  },

  handleSubmit(event) {
    event.preventDefault();
    $.post('', { record: this.state }, (data) => {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState());
    }, 'JSON')
  },

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}>
          </input>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}>
          </input>
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}>
          </input>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>

      </form>
    )
  }
})
