import React, {useState, useEffect} from 'react';
import { Card, Container } from 'react-bootstrap';
import sampleCategories from './sampleCategories';
import SingleCategory from './SingleCategory';
import axios from 'axios';
import './Categories.css';

//CREATE
import CatCreate from './CatCreate';
import {useAuth} from '../../contexts/AuthContext'


export default function Categories() {
  const [categories, setCategories] = useState(sampleCategories);

    //Step - Create
    const [showCreate, setShowCreate] = useState(false);
    const {currentUser} = useAuth();
  
  const getCategories = () => {
    axios.get('http://todoapi.abbey-outain.com/api/categories/').then(response => {
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
      <section className="categories">
        <Container>
          <Card className="m-2 text-center">
            <Card.Header>
              <h1>Categories</h1>
            </Card.Header>
          </Card>
        </Container>

      {currentUser.email === 'abbeyoutain@outlook.com' &&
        <div className="p-2 mb-3 text-center">
          {showCreate ?
            <>
            <button onClick={() => setShowCreate(false)} className="btn">Cancel</button>
            <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn">Create New Category</button>
          }
        </div>
      }

        <Container>
        <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                {/* EDIT */}
                {currentUser.email === 'abbeyoutain@outlook.com' &&
                <th>Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              {categories.map(x =>
                <SingleCategory
                key={x.CategoryId}
                category={x}
                //EDIT
                getCategories={getCategories} />
              )}
            </tbody>
        </table>
        </Container>
      </section>
  );
}
