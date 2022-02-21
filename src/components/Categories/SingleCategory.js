import React, {useState} from 'react'
//EDIT
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useAuth} from '../../contexts/AuthContext'
import CatEdit from "./CatEdit";

library.add(fas);

export default function SingleCategory(props) {
    //EDIT
    const {currentUser} = useAuth();
    const [showEdit, setShowEdit] = useState(false);

    //EDIT
  const deleteCategory = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.Name}?`)){
      axios.delete(`http://todoapi.abbey-outain.com/api/categories/${id}`).then(() => {
        props.getCategories();
      })
    }
  }

  return (
    <tr>
      <td>{props.category.Name}</td>
      <td>{props.category.Description}</td>
            {/* EDIT - currentUser and add buttons */}
            {currentUser.email === 'abbeyoutain@outlook.com' &&
        <td>
          <button className="btn m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>
          <button className="btn m-1 rounded" id="deleteLink" onClick={() => deleteCategory(props.category.CategoryId)}>
            <FontAwesomeIcon icon={['fas', 'trash-alt']} />
          </button>
          {/* EDIT */}
          {showEdit &&
            <CatEdit
              category={props.category}
              setShowEdit={setShowEdit}
              showEdit={showEdit}
              getCategories={props.getCategories} />
          }
        </td>
      }
    </tr>
  )
}
