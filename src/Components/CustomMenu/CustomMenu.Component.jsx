import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
      width: 145,
    },
  };

/**
 * @class CustomMenu
 */
class CustomMenu extends React.Component {
    constructor(){
        super();

        this.state = {
            value: 'All Countries',
        };
    }

    /**
     * Method to handle menu item selection
     */
    handleChange = (event, index, value) => this.setState({value});    

    render() {
        return (
            <div>
                <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                >
                    <MenuItem value="All Countries" primaryText="All Countries" />
                    <MenuItem value="Kenya" primaryText="Kenya" />
                    <MenuItem value="Nigeria" primaryText="Nigeria" />
                    <MenuItem value="Uganda" primaryText="Uganda" />
                    <MenuItem value="USA" primaryText="USA" />
                </SelectField>
            </div>
        );
    }
}

export default CustomMenu;
