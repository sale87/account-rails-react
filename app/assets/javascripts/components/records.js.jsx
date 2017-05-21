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
    records = this.state.records.slice();
    records.push(record);
    this.setState({records: records});
  },

  render() {
    var records = this.state.records.map((r) => {
      return React.createElement(Record, {key: r.id, record: r});
    });

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <RecordForm handleNewRecord={this.addRecord} />
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Amount</td>
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
