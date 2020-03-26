import React, { Component } from 'react';

export class TodoRow extends Component{
    /*
    Below we will define the value for the onChange event as a callback() function. This is how child components are able to communicate with parents as they can not update the value of props passed to them from a parent. This is because React only supports one-way data flow (from parent -> child), however, the parent CAN provide a function property that children can call upon when something important is happening. 

    Two different types of properties:
    Data properties allow parent components to pass data to its children
    Function properties allow a child to communicate with the parent
    */

    render = () => 
        <tr>
            <td>
               { this.props.item.action } 
            </td>
            <td>
                <input type="checkbox" checked={this.props.item.done} onChange={() => this.props.callback(this.props.item)}/>
            </td>
        </tr>
}