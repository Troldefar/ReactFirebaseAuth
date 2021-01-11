import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {

    const email = emailRef.current.value; 
    const password = passwordRef.current.value;
    
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      history.push('/');
    } catch (err) {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            Login
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
            <Button 
              class="w-100" 
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}