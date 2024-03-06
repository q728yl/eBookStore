import React from 'react';

class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            preSearchData: this.props.preSearchData,
        };
    };

    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.props.initialData.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();

        if (!needle) {
            this.setState({data: this.props.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.props.preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    render ()  {
        console.log("render Table " + this.props.search);
        return (
            <div>
                <table>
                    <thead onClick={this.sort}>
                    <tr>{
                        this.props.headers.map(function (title, idx) {
                            if (this.state.sortby === idx) {
                                title += this.state.descending ? ' \u2191' : ' \u2193';
                            }
                            return <th key={idx}>{title}</th>;
                        }, this)
                    }</tr>
                    </thead>
                    <tbody onDoubleClick={this.showEditor}>
                    {this.renderSearch()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            <tr key={rowidx}>{
                                row.map(function (cell, idx) {
                                    let content = cell;
                                    let edit = this.state.edit;
                                    if (edit && edit.row === rowidx && edit.cell === idx) {
                                        content = (
                                            <form onSubmit={this.save}>
                                                <input type="text" defaultValue={cell}/>
                                            </form>
                                        );
                                    }
                                    return <td key={idx} data-row={rowidx}>{content}</td>;
                                }, this)}
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
            </div>
        );
    };

    renderSearch = () =>  {
        if (!this.props.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {this.props.headers.map(function (ignore, idx) {
                    return <td key={idx}><input type="text" data-idx={idx}/></td>;
                })}
            </tr>
        );
    };

}


export default Table;