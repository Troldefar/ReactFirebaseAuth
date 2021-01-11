import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {

    const email = emailRef.current.value; 
    const password = passwordRef.current.value;
    const passwordConf = passwordConfirmRef.current.value;
    
    e.preventDefault();

    if(password !== passwordConf) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      history.push('/');
    } catch (err) {
      setError('Failed to create account');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            Sign up
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={handleSubmit}
          >
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control required type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control required type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>
                Password confirmation
              </Form.Label>
              <Form.Control required type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button 
              class="w-100" 
              type="submit"
              disabled={loading}
            >
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  )
}