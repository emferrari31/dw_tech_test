import { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import FormSurvey from "./components/FormSurvey";

// Define the Survey type
type Survey = {
    id: string;
    created_at: string;
    notes: string | null;
    date: string;
};

function App() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true); // For loading state

    // Fetch surveys on component mount
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
            setSurveys(surveyData); // Assuming setSurveys is used to set survey data state
            setLoading(false); // Set loading to false after fetching surveys
        };

        fetchSurveys();
    }, []); // Fetch surveys only once when component mounts

    // Handle form submission and send the data to the API
    const handleFormSubmit = async (data: { notes: string; date: string }) => {
        const url = 'https://mmyaxhazugbcfqmjryjz.supabase.co/rest/v1/survey';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'apikey': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notes: data.notes,
                date: data.date,
            }),
        });

        if (response.ok) {
            const newSurvey = {
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                notes: data.notes,
                date: data.date
            };

            setSurveys((prevSurveys) => [...prevSurveys, newSurvey]);
            console.log('Survey submitted successfully');
        } else {
            console.error('Failed to submit survey');
        }
    };

    return (
        <>
            <Header />
            <FormSurvey onSubmit={handleFormSubmit} />

            {loading ? (
                <p>Loading surveys...</p>
            ) : (
                <div className="surveysDisplay">
                    {surveys.length > 0 ? (
                        surveys.map((survey) => (
                            <div key={survey.id}>
                                <p><strong>Notes:</strong> {survey.notes || 'No notes available'}</p>
                                <p><strong>Created at:</strong> {survey.created_at}</p>
                                <p><strong>Date:</strong> {survey.date}</p> {/* Display the date */}
                            </div>
                        ))
                    ) : (
                        <p>No surveys found.</p>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
