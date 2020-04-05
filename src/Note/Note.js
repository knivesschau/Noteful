import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import notefulContext from '../notefulContext';
import config from '../config';
import './Note.css';

export default class Note extends Component {
    static defaultProps = {
      onDeleteNote: () => {}
    };

    static contextType = notefulContext;

    handleClickDelete = e => {
      e.preventDefault();
      const noteId = this.props.id

      fetch(` ${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then (res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({error});
      });
    }

    render () {  
      const {name, id, modified} = this.props; 

      return (
        <div className='Note'>

          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>

          <button 
            className='Note__delete' 
            type='button'
            onClick={this.handleClickDelete}>

            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            Remove

          </button>

          <div className='Note__dates'>
            
            <div className='Note__dates-modified'>
              Modified
              {' '}
            
              <span className='Date'>
                {format(new Date(modified), 'dd MMM yyyy')}
              </span>
            
            </div>
          </div>
        </div>
      )
    }
  }