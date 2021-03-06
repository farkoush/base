import {connect} from "react-redux";
import React, {Component} from "react";
import {copyTag, deleteTag, getTags, setTag, storeTag, updateTag, restoreTag, resetTag} from "../actions"
import {Form, Loading, NotFound, Page, Show, Text, Button} from "../components";

class Tag extends Component{

    state = {activeTabIndex: 0};

    componentDidMount(){
        if (this.props.tag.id === undefined) {
            this.props.getTags();
        }
    }

    storeTag = () => {
        return () => this.props.storeTag(
            // the values that we want to save
            this.props.tag,
            // the route that we want to get back there after new resource created
            () => this.props.history.push('/admin/taxonomies/'+this.props.match.params.taxonomy)
        );
    };

    updateTag = () => {
        return () => this.props.updateTag(
            this.props.tag,
            () => this.props.history.push('/admin/taxonomies/'+this.props.match.params.taxonomy)
        );
    };

    render()
    {
        if (this.props.tag === null) {
            return <Loading />;
        }

        if (this.props.tag === undefined) {
            return <NotFound />;
        }

        if (this.props.match.params.tag === 'create') {
            return (
                <Page
                    title={this.props.tag.attributes.label}
                    button={{
                        label: 'ذخیره',
                        onClick: this.storeTag()
                    }}
                >
                    <Form >
                        <Text
                            label='برچسب'
                            value={this.props.tag.attributes.label}
                            onChange={ (e) => this.props.setTag(this.props.tag.id, {label: e.target.value}) }
                        />
                        <Text
                            label='نامک'
                            value={this.props.tag.attributes.slug}
                            onChange={ (e) => this.props.setTag(this.props.tag.id, {slug: e.target.value}) }
                        />
                    </Form>
                </Page>
            );
        }

        return(
            <Page
                title={this.props.tag.attributes.label}
                buttons={<div>
                    <Button 
                        type="icon"
                        icon="save"
                        visible={!this.props.trashed}
                        disabled={!this.props.edited}
                        onClick={() => this.props.tag.id? this.props.updateTag(this.props.tag):  this.props.storeTag(this.props.tag)} 
                    />
                    <Button 
                        type="icon"
                        icon="restore"
                        disabled={!(this.props.edited || this.props.trashed) }
                        onClick={() => this.props.trashed? 
                            this.props.restoreTag(this.props.tag.id):
                            this.props.resetTag(this.props.tag.id)
                        } 
                    />
                    <Button 
                        type="icon" 
                        icon="delete"
                        visible={!this.props.trashed}
                        onClick={() => this.props.deleteTag(this.props.tag.id, () => this.props.history.push('/admin/taxonomies'))} 
                    />
                    <Button 
                        type="icon"
                        icon="file_copy"
                        onClick={() => this.props.copyTag(this.props.tag.id, () => this.props.history.push('/admin/taxonomies/create'))} 
                        visible={this.props.tag.id && !this.props.trashed}
                    />
                </div>}
                tabs={['نمایش', 'ویرایش اطلاعات']}
                tab={this.state.activeTabIndex}
                redirect={this.state.redirect}
                onChange={(activeTabIndex) => this.setState({activeTabIndex})}
            >
                <Form show={this.state.activeTabIndex == 0}>
                    <Show label="برچسب">{this.props.tag.attributes.label}</Show>
                    <Show label="اسلاگ">{this.props.tag.attributes.slug}</Show>
                    <Show label="دیتا اضافه" full>{this.props.tag.attributes.metadata}</Show>
                </Form>
                <Form show={this.state.activeTabIndex == 1}>
                    <Text
                        label='برچسب'
                        value={this.props.tag.attributes.label}
                        onChange={ (e) => this.props.setTag(this.props.tag.id, {label: e.target.value}) }
                    />
                    <Text
                        label='اسلاگ'
                        value={this.props.tag.attributes.slug}
                        onChange={ (e) => this.props.setTag(this.props.tag.id, {slug: e.target.value}) }
                    />
                </Form>
            </Page>
        );
    }
}

const mapStateToProps = (state, props) => {
    // route id
    let id = props.match.params.tag;

    let tag = null;
    if (id === 'create') {
        tag = state.tags.create;
        tag.attributes.taxonomy_id = props.match.params.taxonomy;
    } else {
        if (state.tags.index.length == 0) {
            tag = state.tags.init;
        } else {
            tag = state.tags.index.find( element => element.id == id );
        }
    }

    return {tag};
};

export default connect(mapStateToProps, { copyTag, deleteTag, getTags, setTag, storeTag, updateTag, restoreTag, resetTag})(Tag);