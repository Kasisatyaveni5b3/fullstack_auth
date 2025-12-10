import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Title } = Typography;

export default function Register() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await axios.post((process.env.NEXT_PUBLIC_API_URL || '') + '/api/auth/register', values);
      message.success('Registered. Please login.');
      router.push('/login');
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card style={{ width: 380 }}>
        <Title level={3}>Register</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-sm">Already have an account? <a href="/login">Login</a></div>
      </Card>
    </div>
  );
}
