// src/components/YourComponent.tsx
import { useState, useEffect } from 'react';
import certnService, { CertnCase } from '../api/certn';

export default function YourComponent() {
  const [cases, setCases] = useState<CertnCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      setLoading(true);
      try {
        const response = await certnService.getCases();
        setCases(response.results);
      } catch (err) {
        setError('Failed to load cases');
        console.error('Error loading cases:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Cases</h2>
      {cases.length === 0 ? (
        <p>No cases found</p>
      ) : (
        <ul>
          {cases.map(case => (
            <li key={case.id}>
              {/* Render case details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}