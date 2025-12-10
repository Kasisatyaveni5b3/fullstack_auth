import { Button, Card, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const { Title } = Typography;

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    (async () => {
      try {
        const res = await axios.get((process.env.NEXT_PUBLIC_API_URL || '') + '/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInitial(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put((process.env.NEXT_PUBLIC_API_URL || '') + '/api/auth/me', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Profile updated');
      setInitial(res.data);
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Update failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card style={{ width: 520 }}>
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>My Profile</Title>
          <Button danger onClick={logout}>Logout</Button>
        </div>
        <Form layout="vertical" onFinish={onFinish} initialValues={initial}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="New Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
