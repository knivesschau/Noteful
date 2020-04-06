export const validateFolder = (name) => {
    let errorMsg = this.state.validFolderMessage;
    let hasError = false;

    if (this.context.folders.find((folder) => folder.name === name) === undefined) {
        errorMsg = "Please choose a valid folder.";
        hasError = true;
    }
    else {
        errorMsg = '';
        hasError = false;
    }
    this.setState({
        validFolderMessage: errorMsg,
        validFolder: !hasError
    });
}

export const validateNoteName = (name) => {
    let errorMsg = this.state.validNoteMessage;
    let hasError = false; 
    
    name = name.trim();

    if (name.length < 3) {
        errorMsg = "Please enter a note name that is at least 3 characters in length.";
        hasError = true;
    }
    else {
       errorMsg = '';
       hasError = false;
    }
    this.setState({
        validMessage: errorMsg,
        validNoteName: !hasError
    });
}

export const validateNoteContent = (content) => {
    let errorMsg = this.state.validContentMessage;
    let hasError = false;

    content = content.trim(); 

    if (content.length < 3) {
        errorMsg = "Please enter a note message that is at least 3 characters in length.";
        hasError = true;
    }
    else {
        errorMsg = '';
        hasError = false;
    }
    this.setState({
        validContentMessage: errorMsg,
        validContent: !hasError
    });
}
