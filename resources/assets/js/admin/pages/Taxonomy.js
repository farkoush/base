import {connect} from "react-redux";
import React, {Component} from "react";
import { isEmpty } from "../../helpers";
import {Button, Form, NotFound, Page, Table, Text} from "../components";
import {copyTaxonomy, deleteTaxonomy, getTags, getTaxonomies, setTaxonomy, storeTaxonomy, updateTaxonomy, validateTaxonomy,restoreTaxonomy, resetTaxonomy} from "../actions"

class Taxonomy extends Component {

    state = {        
        activeTabIndex: (this.props.taxonomy.id == 0)? 1: 0
    }

    componentDidMount = () => {
        if(this.props.taxonomy != undefined){
            if (this.props.taxonomy.id === undefined) {
                this.props.getTaxonomies();
            }

            if (this.props.tags.length === 0) this.props.getTags();
        }
    }; 
 
    // storeTaxonomy = () => {
    //     return () => this.props.storeTaxonomy(
    //         this.props.taxonomy,
    //         () => this.props.history.push('/admin/taxonomies')
    //     );
    // }; 

    // updateTaxonomy = () => {
    //     if (isEmpty(this.props.taxonomy.validation)) {
    //         return () => this.props.updateTaxonomy(
    //             this.props.taxonomy,
    //             () => this.props.history.push('/admin/taxonomies')
    //         );
    //     } else {
    //     }
    // };

    render() {
        if (this.props.taxonomy == undefined) {
            return <NotFound/>
        }
        return (
            <Page
                tabs={['نمایش', 'ویرایش اطلاعات']}
                tab={this.state.activeTabIndex}
                redirect={this.state.redirect}
                loading={this.props.taxonomy == null}
                onChange={(activeTabIndex) => this.setState({activeTabIndex})}
                buttons={<div>
                    <Button 
                        type="icon"
                        icon="save"
                        visible={!this.props.trashed}
                        disabled={!this.props.edited}
                        onClick={() => this.props.taxonomy.id? this.props.updateTaxonomy(this.props.taxonomy):  this.props.storeTaxonomy(this.props.taxonomy)} 
                    />
                    <Button 
                        type="icon"
                        icon="restore"
                        disabled={!(this.props.edited || this.props.trashed) }
                        onClick={() => this.props.trashed? 
                            this.props.restoreTaxonomy(this.props.taxonomy.id):
                            this.props.resetTaxonomy(this.props.taxonomy.id)
                        } 
                    />
                    <Button 
                        type="icon" 
                        icon="delete"
                        visible={!this.props.trashed}
                        onClick={() => this.props.deleteTaxonomy(this.props.taxonomy.id, () => this.props.history.push('/admin/taxonomies'))} 
                    />
                    <Button 
                        type="icon"
                        icon="file_copy"
                        onClick={() => this.props.copyTaxonomy(this.props.taxonomy.id, () => this.props.history.push('/admin/taxonomies/create'))} 
                        visible={this.props.taxonomy.id && !this.props.trashed}
                    />
                </div>}
            >
                <Form show={this.state.activeTabIndex == 0}>
                    <Table
                        data={this.props.tags}
                        tdClick={(row) => this.props.history.push(
                            '/admin/taxonomies/' + this.props.match.params.taxonomy + '/tags/' + row.original.id
                        )}
                        columns={[
                            {
                                Header: 'شناسه',
                                accessor: 'id',
                                width: 100
                            },
                            {
                                Header: 'والد',
                                accessor: 'attributes.parent_id',
                                width: 100
                            },
                            {
                                Header: 'برچسب',
                                accessor: 'attributes.label',
                                width: 400
                            },
                            { 
                                Header: 'نامک',
                                width: 200,
                                accessor: 'attributes.slug',
                            },
                            {
                                Header: 'دیتا اضافه',
                                width: 100,
                                accessor: 'attributes.metadata',
                            }
                        ]}
                    />
                </Form>
                <Form show={this.state.activeTabIndex == 1}>
                    <Text
                        id={this.props.taxonomy.id}
                        label='نام گروه'
                        value={this.props.taxonomy.attributes.group_name}
                        disabled={this.props.taxonomy.id == undefined}
                        half
                        onChange={(e) => this.props.setTaxonomy(this.props.taxonomy.id, {group_name: e.target.value})}
                        // onBlur = {() => this.props.validateTaxonomy(this.props.taxonomy.id)}
                        errors={(this.props.taxonomy.validation) ? this.props.taxonomy.validation.group_name : ''}
                    />
                    <Text
                        label='نامک'
                        value={this.props.taxonomy.attributes.slug}
                        half
                        onChange={(e) => this.props.setTaxonomy(this.props.taxonomy.id, {slug: e.target.value})}
                        // onBlur = {() => this.props.validateTaxonomy(this.props.taxonomy.id, 'slug')}
                        errors={(this.props.taxonomy.validation) ? this.props.taxonomy.validation.slug : ''}
                    />
                    <Text
                        label='برچسب'
                        value={this.props.taxonomy.attributes.label}
                        half
                        onChange={(e) => this.props.setTaxonomy(this.props.taxonomy.id, {label: e.target.value})}
                        // onBlur = {() => this.props.validateTaxonomy(this.props.taxonomy.id, 'label')}
                        errors={(this.props.taxonomy.validation) ? this.props.taxonomy.validation.label : ''}
                    />
                </Form>
            </Page>
        );
    }
}

const mapStateToProps = (state, props) => {
    // route id
    let id = props.match.params.taxonomy;
    let taxonomy = null;
    // let tags = state.tags.index.filter(element => element.attributes.taxonomy_id == id);


    // if (id === 'create') {
    //     taxonomy = state.taxonomies.create;
    // } else {
    //     if (state.taxonomies.index.length == 0) {
    //         taxonomy = state.taxonomies.init;
    //     } else {
    //         taxonomy = state.taxonomies.index.find(element => element.id == id);
    //     }
    // }

    if (id == 'create') taxonomy = state.taxonomies.create;
    else if(state.taxonomies.index.length == 0) taxonomy = state.taxonomies.init;
    else taxonomy = state.taxonomies.index.find( element => element.id == id ); 

    if (taxonomy == undefined) taxonomy = state.taxonomies.trash.find(element => element.id == id)

    let trashed = ( taxonomy != undefined && taxonomy.attributes.deleted_at != null);
    // let edited = ( taxonomy != undefined && (taxonomy.oldAttributes != undefined || taxonomy.oldRelations != undefined));
    let edited = ( taxonomy != undefined && (taxonomy.oldAttributes != undefined ));
    let tags = state.tags.index.length? state.tags.index.filter(tag => tag.attributes.taxonomy_id == 1): []

    return {taxonomy, tags, trashed, edited};
};
 
export default connect(
    mapStateToProps,
    {copyTaxonomy, deleteTaxonomy, getTaxonomies, getTags, validateTaxonomy, restoreTaxonomy, resetTaxonomy, setTaxonomy, storeTaxonomy, updateTaxonomy}
    )(Taxonomy);