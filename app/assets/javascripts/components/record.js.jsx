var Record = React.createClass({
  getInitialState() {
    return {
      edit: false
    }
  },

  handleToggle(event) {
    event.preventDefault();
    this.setState({edit: !this.state.edit})
  },

  handleEdit(event) {
    event.preventDefault();
    var data = {
      title: this.refs.title.value,
      date: this.refs.date.value,
      amount: this.refs.amount.value,
    };

    $.ajax({
      url: "/records/" + this.props.record.id,
      method: 'PUT',
      dataType: 'JSON',
      data: {record: data},
      success: (data) => {
        this.setState({edit: false});
        this.props.handleEditRecord(this.props.record, data);
      }
    })
  },

  handleDelete(event) {
    event.preventDefault();

    $.ajax({
      url: "/records/" + this.props.record.id,
      method: 'DELETE',
      dataType: 'JSON',
      success: () => {
          this.props.handleDeleteRecord(this.props.record);
      }
    })
  },

  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  },

  recordRow() {
    return(
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  },

  recordForm() {
    return (
      <tr>
        <td>
          <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"></input>
        </td>
        <td>
          <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"></input>
        </td>
        <td>
          <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"></input>
        </td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  },
});
