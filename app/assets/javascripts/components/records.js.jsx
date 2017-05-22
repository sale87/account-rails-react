var Records = React.createClass({
  getInitialState() {
    return {
      records: this.props.data,
    };
  },

  getDefaultProps() {
    return {
      records: [],
    };
  },

  addRecord(record) {
    var records = React.addons.update(this.state.records, { $push: [record]});
    this.setState({records: records});
  },

  deleteRecord(record) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, { $splice: [[index, 1]] });
    this.replaceState({records: records});
  },

  updateRecord(record, data) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records,{ $splice: [[index, 1, data]] });
    this.replaceState({records: records});
  },

  credits() {
    var credits = this.state.records.filter(r => r.amount >= 0);
    return credits.reduce((prev, current) => prev + parseFloat(current.amount), 0);
  },

  debits() {
    var debits = this.state.records.filter(r => r.amount < 0);
    return debits.reduce((prev, current) => prev + parseFloat(current.amount), 0);
  },

  balance() {
    return this.debits() + this.credits();
  },

  render() {
    var records = this.state.records.map((r) => {
      return React.createElement(
        Record, {key: r.id, record: r, handleDeleteRecord: this.deleteRecord, handleEditRecord: this.updateRecord}
      );
    });

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <hr></hr>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Amount</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            { records }
          </tbody>
        </table>
      </div>
    );
  }
});
