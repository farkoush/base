import React, { Component } from "react";
import { connect } from "react-redux";

import { getSearchPanels, setSearchPanel, updateSearchPanel } from "../actions"
import { Page, Icon, Table } from "../components";

class SearchPanels extends Component{

    state = {}

    componentDidMount = () => {
        if(this.props.searchpanels.length == 0) this.props.getSearchPanels();
    }

    render(){
        return(
            <Page
                title=''
                button={{
                    label: 'add new SearchPanel',
                    onClick: () => this.props.history.push('/admin/searchpanels/create')
                }}
                onChange={(value) => this.setState({tab: value})}
            >
                <Table
                    data={this.props.searchpanels}
                    tdClick={(r) => this.props.history.push('/admin/searchpanels/' + r.original.id)}
                    columns={[
                        {
                            Header: '#',
                            accessor: 'id',
                            width: 70
                        },
                        {
                            Header: 'وضعیت',
                            width: 50,
                            Cell: row => row.original.oldAttributes? (<Icon icon="edit" />): '',
                        },
                        {
                            Header: 'عنوان',
                            accessor: 'attributes.title',
                        },
                        {
                            Header: 'slug',
                            accessor: 'attributes.slug',
                        },
                    ]}
                />
            </Page>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchpanels: state.searchpanels.index,
    };
};

export default connect(mapStateToProps, { getSearchPanels, setSearchPanel, updateSearchPanel })(SearchPanels);