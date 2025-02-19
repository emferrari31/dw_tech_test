import { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import FormSurvey from "./components/FormSurvey";

type Survey = {
    id: string;
    created_at: string;
    notes: string | null;
};

const App = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

    useEffect(() => {
        const fetchSurveys = async () => {
            const url = 'https://mmyaxhazugbcfqmjryjz.supabase.co/rest/v1/survey';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'apikey': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            const surveyData = await response.json();
            setSurveys(surveyData);
            setLoading(false);
        };

        fetchSurveys();
    }, []);

    const handleEditClick = (survey: Survey) => {
        setEditingSurvey(survey);
    };

    const handleFormSubmit = async (data: { notes: string }) => {
        const url = 'https://mmyaxhazugbcfqmjryjz.supabase.co/rest/v1/survey';

        if (editingSurvey) {
            // Editing existing survey
            const response = await fetch(`${url}?id=eq.${editingSurvey.id}`, {
                method: 'PATCH',
                headers: {
                    'apikey': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notes: data.notes,
                }),
            });

            if (response.ok) {
                setSurveys((prevSurveys) =>
                    prevSurveys.map((survey) =>
                        survey.id === editingSurvey.id ? { ...survey, notes: data.notes } : survey
                    )
                );
            }
            setEditingSurvey(null);
        } else {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'apikey': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes: data.notes }),
            });

            if (response.ok) {
                const newSurvey = {
                    id: Date.now().toString(),
                    created_at: new Date().toISOString(),
                    notes: data.notes,
                };
                setSurveys((prevSurveys) => [...prevSurveys, newSurvey]);
            }
        }
    };

    return (
        <>
            <Header />
            <FormSurvey onSubmit={handleFormSubmit} editingSurvey={editingSurvey} />
            {loading ? (
                <p>Loading surveys...</p>
            ) : (
                <div className="surveysDisplay">
                    {surveys.length > 0 ? (
                        surveys.map((survey) => (
                            <div key={survey.id}>
                                <p><strong>Notes:</strong> <br />{survey.notes || 'No notes available'}</p>
                                <p><strong>Created at:</strong> {survey.created_at}</p>
                                <button onClick={() => handleEditClick(survey)}>Edit</button>
                            </div>
                        ))
                    ) : (
                        <p>No surveys found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default App;