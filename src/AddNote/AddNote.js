import React, {Component} from 'react';
import notefulContext from '../notefulContext';
import NotefulForm from '../NotefulForm/NotefulForm';
import ValidationError from '../ValidationError';
import config from '../config';
import './AddNote.css';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            content: "",
            folderId: null,
            validName: false,
            folderIdValid: false,
            validForm: false,
            validationMessages: {
                name: '',
                folderId: ''
            }
        }
    }

    updateName(name) {
        this.setState({name}, () => {this.validateNoteName(name)});
    }

    updateContent(content) {
        this.setState({content})
    }

    updateFolderId(folderId) {
        this.setState({folderId}, () => {this.validateFolderId(folderId)});
    }

    validateNoteName(noteTitle) {
        const errorInfo = {...this.state.validationMessages};
        let hasError = false;

        noteTitle = noteTitle.trim();

        if (noteTitle.length === 0) {
            errorInfo.name = "Please enter a title for your note.";
            hasError = true;
        }
        else {
            if (noteTitle.length < 3) {
                errorInfo.name = "Note title must be at least 3 characters in length.";
                hasError = true;
            }
            else {
                errorInfo.name = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: errorInfo,
            validName: !hasError
        }, 
        this.validForm);
    }

    validateFolderId(folderName) {
        const errorInfo = {...this.state.validationMessages};
        let hasError = false;

        folderName = folderName.trim();

        if (folderName === "..." || folderName === null) {
            errorInfo.folderId = "Please choose an existing folder.";
            hasError = true;
        }
        else {
            errorInfo.folderId = '';
            hasError = false;
        }

        this.setState({
            validationMessages: errorInfo,
            folderIdValid: !hasError
        },
        this.validForm);
    }

    formValidation () {
        this.setState({
            validForm: this.state.validName && this.state.folderIdValid
        });
    }

   addNewNote = (callback) => {
        const newNote = {
            name: this.state.name,
            content: this.state.content,
            folderId: this.state.folderId,
            modified: new Date(),
        };

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
        .then (res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw err
                });
            }
            return res.json();
        })
        .then (addedNote => {
            callback(addedNote);
        })
        .catch (err => alert(err));
    };

    render () {
        
        return (
           <notefulContext.Consumer>
               {(context) => (
                   <section className="AddNote">
                       <h2>
                           Create a New Note:
                       </h2>

                       <NotefulForm onSubmit={e => {
                           e.preventDefault();
                           this.addNewNote(context.addNote)
                           this.props.history.push(`/folder/${this.state.folderId}`)}}>

                            <div className="field">
                                
                                <label htmlFor="note-name-input">
                                    Name:
                                </label>

                                <input type="text" id="note-name-input" onChange={e => this.updateName(e.target.value)}/>
                                <ValidationError hasError={!this.state.validName} message={this.state.validationMessages.name}/>

                            </div>

                            <div className="field">

                                <label htmlFor="note-content-input">
                                    Content:
                                </label>

                                <textarea id="note-content-input" onChange={e => this.updateContent(e.target.value)}/>

                            </div>

                            <div className="field">

                                <label htmlFor="note-folder-select">
                                    Folder:
                                </label>

                                <select id="note-folder-select" onChange={e => this.updateFolderId(e.target.value)}>

                                    <option value={null}>...</option>

                                    {context.folders.map(folder => 
                                        <option key={folder.id} value={folder.id}>
                                            {folder.name}
                                        </option>
                                    )}
                                </select>
                                
                                <ValidationError hasError={!this.state.folderIdValid} message={this.state.validationMessages.folderId}/>
                            </div>
                            
                            <div className="buttons">

                                <button type="submit" disabled={!this.state.validForm}>
                                    Add Note
                                </button>

                            </div>

                        </NotefulForm>   
                   </section>
               )}
           </notefulContext.Consumer>
        );
    }
}