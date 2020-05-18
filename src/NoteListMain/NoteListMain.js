import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import notefulContext from '../notefulContext';
import {getNotesForFolder} from '../notes-helpers';
import './NoteListMain.css';

export default class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = notefulContext;

    render () {
        const {folder_id} = this.props.match.params;
        const {notes=[]} = this.context;
        const notesForFolder = getNotesForFolder(notes, folder_id);
    
        return (
            <section className="NoteListMain">
                <ul>
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}/>
                        </li>
                    )}
                </ul>

                <div className="NoteListMain__button-container">
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain__add-note-button'>
                    
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Note
                    </CircleButton>
                </div>

            </section>
        );
    }
}