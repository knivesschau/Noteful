import React, {Component} from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import notefulContext from '../notefulContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddFolder.css';

export default class AddFolder extends Component {
   constructor(props) {
       super(props);
       this.state = {
           name: "",
           validName: false,
           validForm: false,
           validationMessages: {
               name: ''
           }
       };
   }

   static contextType = notefulContext;
   
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

    handleSubmit = e => {
        e.preventDefault();
        
        const folder = {
            folder_name: e.target['folder-name'].value
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
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then (folder => {
            this.context.addFolder(folder);
            this.props.history.push(`/folders/${folder.folderid}`)
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

                        <NotefulForm onSubmit={this.handleSubmit}>
                        
                            <div className="field">

                                <label htmlFor="folder-name-input">
                                    Name
                                </label>

                                <input type="text" id="folder-name" onChange={e => this.updateFolderName(e.target.value)}/>
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
