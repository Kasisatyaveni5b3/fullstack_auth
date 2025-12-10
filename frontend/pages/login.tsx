import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';

const { Title } = Typography;

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.replace('/profile');
  }, []);

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post((process.env.NEXT_PUBLIC_API_URL || '') + '/api/auth/login', values);
      localStorage.setItem('token', res.data.token);
      message.success('Logged in');
      router.push('/profile');
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card style={{ width: 380 }}>
        <Title level={3}>Sign In</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-sm">Don't have an account? <a href="/register">Register</a></div>
      </Card>
    </div>
  );
}
