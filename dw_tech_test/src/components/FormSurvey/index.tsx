import { useState } from 'react';

type FormSurveyProps = {
    onSubmit: (data: { notes: string }) => void;
};

const FormSurvey = ({ onSubmit }: FormSurveyProps) => {
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ notes });
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="notes">Notes: </label><br />
                <textarea
                    name="notes"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                    rows={5}
                    cols={50}
                /> <br />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormSurvey;
