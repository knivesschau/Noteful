import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import notefulContext from '../notefulContext';
import {findNote, findFolder} from '../notes-helpers';
import './NotePageNav.css';

export default class NotePageNav extends Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }

    static contextType= notefulContext;

    render () {
        const {notes, folders} = this.context;
        const {id} = this.props.match.params;
        const note = findNote(notes, id) || {};
        const folder = findFolder(folders, note.folder_id);
        
        return (
            <div className="NotePageNav">
                
                <CircleButton
                    tag="button"
                    role="link"
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'>
                    
                    <FontAwesomeIcon icon='chevron-left'/>
                    <br/>
                    Back
                </CircleButton>

                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        Add
                    </h3>
                )} 
            </div>
        );
    }
}
