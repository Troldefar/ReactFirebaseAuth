import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    const email = emailRef.current.value;
    
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (err) {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            Password reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form
            onSubmit={handleSubmit}
          >
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control required type="email" ref={emailRef} />
            </Form.Group>
            <Button 
              class="w-100" 
              type="submit"
              disabled={loading}
            >
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">
              Login
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