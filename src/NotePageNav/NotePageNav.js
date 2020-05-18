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
        const {noteid} = this.props.match.params;
        const note = findNote(notes, noteid) || {};
        const folder = findFolder(folders, note.folderid);
        
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
                        {folder.folder_name}
                    </h3>
                )}
            </div>
        );
    }
}
