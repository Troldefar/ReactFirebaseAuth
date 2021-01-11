import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {

    const email = emailRef.current.value; 
    const password = passwordRef.current.value;
    const passwordConf = passwordConfirmRef.current.value;
    
    e.preventDefault();

    if(password !== passwordConf) {
      return setError('Password do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');
    if(email !== currentUser.email) {
      promises.push(updateEmail(email))
    }

    if(password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        setError('Failed to update account!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            Update profile
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={handleSubmit}
          >
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control required type="email" ref={emailRef} defaultValue={ currentUser.email } />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep current" />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>
                Password confirmation
              </Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep current" />
            </Form.Group>
            <Button 
              class="w-100" 
              type="submit"
              disabled={loading}
            >
              Update user
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">
          Cancel
        </Link>
      </div>
    </>
  )
}