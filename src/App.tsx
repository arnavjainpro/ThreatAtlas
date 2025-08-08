import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { supabase } from './lib/supabase';
import ApplicationSelector from './components/ApplicationSelector';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BaseVulnerabilitiesPage from './pages/BaseVulnerabilitiesPage';
import ActionableItemsPage from './pages/ActionableItemsPage';
import TotalVulnerabilityPage from './pages/TotalVulnerabilityPage';
import CodeQualityPage from './pages/CodeQualityPage';
import DependenciesPage from './pages/DependenciesPage';
import InfrastructurePage from './pages/InfrastructurePage';
import CompliancePage from './pages/CompliancePage';
import ThreatModelingPage from './pages/ThreatModelingPage';
import ReportsPage from './pages/ReportsPage';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import RequireOrg from './components/RequireOrg';
import './App.css'

function App() {
  // Test Supabase connection
  console.log('Supabase client:', supabase);
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Main application selector page - protected */}
          <Route path="/" element={
            <RequireAuth>
              <RequireOrg>
                <ApplicationSelector />
              </RequireOrg>
            </RequireAuth>
          } />
          
          {/* Application-specific dashboard routes - protected */}
          <Route path="/dashboard/:appId" element={
            <RequireAuth>
              <RequireOrg>
                <Layout />
              </RequireOrg>
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
            <Route path="base-vulnerabilities" element={<BaseVulnerabilitiesPage />} />
            <Route path="actionable-items" element={<ActionableItemsPage />} />
            <Route path="total-vulnerability" element={<TotalVulnerabilityPage />} />
            <Route path="code-quality" element={<CodeQualityPage />} />
            <Route path="dependencies" element={<DependenciesPage />} />
            <Route path="infrastructure" element={<InfrastructurePage />} />
            <Route path="compliance" element={<CompliancePage />} />
            <Route path="threat-modeling" element={<ThreatModelingPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
