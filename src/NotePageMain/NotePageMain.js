import React, {Component} from 'react';
import Note from '../Note/Note';
import notefulContext from '../notefulContext';
import {findNote} from '../notes-helpers';
import './NotePageMain.css';

export default class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = notefulContext;

    handleDeleteNote = id => {
        this.props.history.push(`/`)
    };
    
    render () {
        const {notes=[]} = this.context;
        const {id} = this.props.match.params;
        const note = findNote(notes, id) || {content: ''};

        return (
            <section className="NotePageMain">
                <Note
                    id={note.id}
                    name={note.name}
                    content= {note.content}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}/>
                
                <div className='NotePageMain__content'>
                    
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                    
                    <p key={i}>{para}</p>
                    
                    )}
                </div>
                
            </section>
        );
    }
}