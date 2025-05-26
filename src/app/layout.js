import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Employee Directory',
  description: 'Manage and view your organization\'s employees',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 dark:bg-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
