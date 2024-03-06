import React from 'react';


class Toolbar extends React.Component{
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handlePreSearchData = this.handlePreSearchData.bind(this);
    }

    handleSearch(e){
        this.props.onSearch(e);
        console.log("onSearch " + e);
    }
    handleData(e){
        this.props.onData(e);
    }
    handlePreSearchData(e){
        this.props.onPreSearchData(e);
    }

    toggleSearch = () => {
        console.log("toggleSearch " + this.props.search);
        if (this.props.search) {
            this.handleData(this.props.preSearchData);
            this.handleSearch(false);
            this.handlePreSearchData(null);
            console.log("toggleSearch true -> false");
        } else {
            this.handlePreSearchData(this.props.data);
            console.log("toggleSearch Data " + this.props.data);
            this.handleSearch(true);
            console.log("toggleSearch false -> true");
        }
    };

    download(format, ev) {
        let contents = format === 'json'
            ? JSON.stringify(this.props.data)
            : this.props.data.reduce(function (result, row) {
                return result
                    + row.reduce(function (rowresult, cell, idx) {
                        return rowresult
                            + '"'
                            + cell.replace(/"/g, '""')
                            + '"'
                            + (idx < row.length - 1 ? ',' : '');
                    }, '')
                    + "\n";
            }, '');

        let URL = window.URL || window.webkitURL;
        let blob = new Blob([contents], {type: 'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;
    };

    render(){
        console.log("render Toolbar " + this.props.search);
        return (
            <div className="toolbar">
                <button onClick={this.toggleSearch}>Search</button>
                <a onClick={this.download.bind(this, 'json')}
                   href="data.json">Export JSON</a>
                <a onClick={this.download.bind(this, 'csv')}
                   href="data.csv">Export CSV</a>
            </div>
        )
    }

};

export default Toolbar;