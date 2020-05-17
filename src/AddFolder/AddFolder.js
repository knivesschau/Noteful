import React, {Component} from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import notefulContext from '../notefulContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddFolder.css';

export default class AddFolder extends Component {
   static defaultProps = {
       history: {
           push: () => { }
       },
   }
   
   updateFolderName = (name) => {
       this.setState({name}, () => {this.validateName(name)})
   }

   validateName = (folderName) => {
    const errorInfo = {...this.state.validationMessages};
    let hasError = false;

    folderName = folderName.trim();
        if (folderName.length === 0) {
        errorInfo.name = 'Please enter a name for the folder.';
        hasError = true;
        } 
        else {
            if (folderName.length < 3) {
                errorInfo.name = 'Please enter a name that is at least 3 characters long.';
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
            this.validateForm);
    }

    validateForm = () => {
        this.setState({
            validForm: this.state.validName
        });
    }

    addNewFolder = (callback) => {
        const folder = {
            name: this.state.name
        };

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then (res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw err;
                })
            }
            return res.json();
        })
        .then (newFolder => {
            callback(newFolder);
        })
        .catch (err => alert(err));
    };
    

    render () {
        return (
            <notefulContext.Consumer>
                {(context) => (
                    <section className='AddFolder'>
                        <h2>
                            Create a New Folder:
                        </h2>

                        <NotefulForm onSubmit={(e) => {
                            e.preventDefault();
                            this.addNewFolder(context.addFolder);
                            this.props.history.push(`/folders/${folderId}`)}}>
                        
                            <div className="field">

                                <label htmlFor="folder-name-input">
                                    Name
                                </label>

                                <input type="text" id="folder-name-input" onChange={e => this.updateFolderName(e.target.value)}/>
                                <ValidationError hasError={!this.state.validName} message={this.state.validationMessages.name}/>

                            </div>

                            <div className="buttons">

                                <button type="submit" disabled={!this.state.validForm}>
                                    Add Folder 
                                </button>

                            </div>

                        </NotefulForm>
                    </section>
                )}
            </notefulContext.Consumer>
        );
    }
}