import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import notefulContext from '../notefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import './Note.css';

export default class Note extends Component {
    static defaultProps = {
      onDeleteNote: () => {}
    };

    static contextType = notefulContext;

    handleClickDelete = e => {
      e.preventDefault();
      const id = this.props.id;

      fetch(`${config.API_ENDPOINT}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then (res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return null;
      })
      .then(() => {
        this.context.deleteNote(id);
        this.props.onDeleteNote(id);
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
            <Link to={`/notes/${id}`}>
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
                {new Date(modified).toDateString()}
              </span>
            
            </div>
          </div>
        </div>
      )
    }
  }

  Note.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string
  }